// Main application controller

class AnimationController {
    constructor(animatorClass, canvasId, stepElementId, descriptionElementId) {
        this.animator = new animatorClass();
        this.currentStep = 0;
        this.isPlaying = false;
        this.speed = 1;
        this.stepDuration = 2000;
        this.animationProgress = 0;
        this.animationTimeout = null;
        this.animationFrame = null;
        
        this.stepElement = document.getElementById(stepElementId);
        this.descriptionElement = document.getElementById(descriptionElementId);
    }

    async play() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        const totalSteps = this.animator.steps.length;

        while (this.isPlaying && this.currentStep < totalSteps) {
            await this.animateStep();
            
            if (this.isPlaying && this.currentStep < totalSteps - 1) {
                await this.sleep(500 / this.speed);
                this.currentStep++;
                this.updateUI();
            } else if (this.isPlaying) {
                this.currentStep = totalSteps - 1;
                this.updateUI();
                break;
            }
        }

        this.isPlaying = false;
    }

    async animateStep() {
        return new Promise((resolve) => {
            const duration = this.stepDuration / this.speed;
            const startTime = Date.now();
            const step = this.animator.steps[this.currentStep];

            const animate = async () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                await this.animator.drawStep(this.currentStep, progress);

                if (progress < 1 && this.isPlaying) {
                    this.animationFrame = requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };

            animate();
        });
    }

    pause() {
        this.isPlaying = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    reset() {
        this.pause();
        this.currentStep = 0;
        this.animationProgress = 0;
        this.updateUI();
        this.animator.drawStep(0, 0);
    }

    nextStep() {
        this.pause();
        if (this.currentStep < this.animator.steps.length - 1) {
            this.currentStep++;
            this.updateUI();
            this.animator.drawStep(this.currentStep, 1);
        }
    }

    prevStep() {
        this.pause();
        if (this.currentStep > 0) {
            this.currentStep--;
            this.updateUI();
            this.animator.drawStep(this.currentStep, 1);
        }
    }

    setSpeed(speed) {
        this.speed = parseFloat(speed);
        document.getElementById(this.stepElement.id.replace('-step', '-speed-value')).textContent = `${this.speed}x`;
    }

    updateUI() {
        const step = this.animator.steps[this.currentStep];
        this.stepElement.textContent = this.currentStep + 1;
        this.descriptionElement.textContent = step.description;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize controllers
let slmController;
let ragController;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize SLM Controller
    slmController = new AnimationController(SLMAnimator, 'slm-canvas', 'slm-step', 'slm-description');
    slmController.animator.drawStep(0, 0);
    slmController.updateUI();

    // Initialize RAG Controller
    ragController = new AnimationController(RAGAnimator, 'rag-canvas', 'rag-step', 'rag-description');
    ragController.animator.drawStep(0, 0);
    ragController.updateUI();

    // Handle window resize
    window.addEventListener('resize', () => {
        if (slmController) slmController.animator.drawStep(slmController.currentStep, 1);
        if (ragController) ragController.animator.drawStep(ragController.currentStep, 1);
    });
});

// Module switching functionality
function switchModule(moduleName) {
    // Hide all modules
    const modules = document.querySelectorAll('.module');
    modules.forEach(module => module.classList.remove('active'));

    // Show selected module
    const targetModule = document.getElementById(`${moduleName}-module`);
    if (targetModule) {
        targetModule.classList.add('active');

        // Redraw canvas for the active module
        setTimeout(() => {
            if (moduleName === 'slm' && slmController) {
                slmController.animator.drawStep(slmController.currentStep, 1);
            } else if (moduleName === 'rag' && ragController) {
                ragController.animator.drawStep(ragController.currentStep, 1);
            }
        }, 50);
    }

    // Update nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.style.opacity = '0.7');
    event.target.style.opacity = '1';

    return false;
}

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        const activeModule = document.querySelector('.module.active').id;
        const controller = activeModule.includes('slm') ? slmController : 
                          activeModule.includes('rag') ? ragController : null;
        
        if (controller) {
            if (controller.isPlaying) {
                controller.pause();
            } else {
                controller.play();
            }
        }
    }
    
    if (event.code === 'ArrowRight') {
        event.preventDefault();
        const activeModule = document.querySelector('.module.active').id;
        const controller = activeModule.includes('slm') ? slmController : 
                          activeModule.includes('rag') ? ragController : null;
        if (controller) controller.nextStep();
    }
    
    if (event.code === 'ArrowLeft') {
        event.preventDefault();
        const activeModule = document.querySelector('.module.active').id;
        const controller = activeModule.includes('slm') ? slmController : 
                          activeModule.includes('rag') ? ragController : null;
        if (controller) controller.prevStep();
    }
    
    if (event.code === 'KeyR') {
        event.preventDefault();
        const activeModule = document.querySelector('.module.active').id;
        const controller = activeModule.includes('slm') ? slmController : 
                          activeModule.includes('rag') ? ragController : null;
        if (controller) controller.reset();
    }
});

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const activeModule = document.querySelector('.module.active').id;
    const controller = activeModule.includes('slm') ? slmController : 
                      activeModule.includes('rag') ? ragController : null;
    
    if (!controller) return;

    if (touchEndX < touchStartX - 50) {
        // Swiped left - next step
        controller.nextStep();
    }
    
    if (touchEndX > touchStartX + 50) {
        // Swiped right - previous step
        controller.prevStep();
    }
}

// Auto-hide nav on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

navbar.style.transition = 'transform 0.3s ease';

// Add help information
function showKeyboardShortcuts() {
    const shortcuts = `
    Keyboard Shortcuts:
    
    SPACEBAR - Play/Pause
    RIGHT ARROW - Next Step
    LEFT ARROW - Previous Step
    R - Reset
    
    Swipe (Mobile):
    LEFT - Next Step
    RIGHT - Previous Step
    `;
    
    alert(shortcuts);
}

// Console helper for advanced users
window.getControllers = () => ({
    slm: slmController,
    rag: ragController
});

window.playAnimation = (controller) => {
    if (controller === 'slm') slmController.play();
    if (controller === 'rag') ragController.play();
};

window.pauseAnimation = (controller) => {
    if (controller === 'slm') slmController.pause();
    if (controller === 'rag') ragController.pause();
};

// Log initialization
console.log('%cAI Learning Platform Loaded', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cType getControllers() to access SLM and RAG controllers', 'font-size: 12px; color: #64748b;');
console.log('%cType playAnimation("slm") or playAnimation("rag") to start', 'font-size: 12px; color: #64748b;');
