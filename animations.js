// Animation utilities and canvas drawing functions

class CanvasAnimator {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.animationId = null;
        this.elements = [];
        this.time = 0;
    }

    clear() {
        this.ctx.fillStyle = '#f5f5f5';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBox(x, y, width, height, fillColor, strokeColor, label) {
        this.ctx.fillStyle = fillColor;
        this.ctx.fillRect(x, y, width, height);

        if (strokeColor) {
            this.ctx.strokeStyle = strokeColor;
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x, y, width, height);
        }

        if (label) {
            this.ctx.fillStyle = '#1e293b';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(label, x + width / 2, y + height / 2);
        }
    }

    drawCircle(x, y, radius, fillColor, strokeColor, label) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = fillColor;
        this.ctx.fill();

        if (strokeColor) {
            this.ctx.strokeStyle = strokeColor;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }

        if (label) {
            this.ctx.fillStyle = '#1e293b';
            this.ctx.font = 'bold 12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(label, x, y);
        }
    }

    drawArrow(fromX, fromY, toX, toY, color, label) {
        const headlen = 15;
        const angle = Math.atan2(toY - fromY, toX - fromX);

        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = 2;

        // Draw line
        this.ctx.beginPath();
        this.ctx.moveTo(fromX, fromY);
        this.ctx.lineTo(toX, toY);
        this.ctx.stroke();

        // Draw arrowhead
        this.ctx.beginPath();
        this.ctx.moveTo(toX, toY);
        this.ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
        this.ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
        this.ctx.closePath();
        this.ctx.fill();

        if (label) {
            const midX = (fromX + toX) / 2;
            const midY = (fromY + toY) / 2;
            this.ctx.fillStyle = '#1e293b';
            this.ctx.font = 'bold 12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(label, midX, midY - 10);
        }
    }

    drawText(x, y, text, fontSize = 14, color = '#1e293b', align = 'left') {
        this.ctx.fillStyle = color;
        this.ctx.font = `${fontSize}px Arial`;
        this.ctx.textAlign = align;
        this.ctx.textBaseline = 'top';
        this.ctx.fillText(text, x, y);
    }

    drawGrid(spacing = 50, color = '#e2e8f0') {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 0.5;

        for (let x = 0; x < this.canvas.width; x += spacing) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        for (let y = 0; y < this.canvas.height; y += spacing) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    animateElement(element, duration, updateFn) {
        return new Promise((resolve) => {
            const startTime = Date.now();
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                updateFn(progress);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };
            animate();
        });
    }
}

// SLM Animator
class SLMAnimator extends CanvasAnimator {
    constructor() {
        super('slm-canvas');
        this.steps = [
            { title: 'Input Tokenization', description: 'Text is split into tokens' },
            { title: 'Embedding', description: 'Tokens converted to vectors' },
            { title: 'Attention', description: 'Relationships learned' },
            { title: 'Feed Forward', description: 'Data processed through layers' },
            { title: 'Output', description: 'Predictions generated' }
        ];
    }

    async drawStep(stepIndex, progress) {
        this.clear();
        this.drawGrid();

        const step = this.steps[stepIndex];
        const centerX = this.canvas.width / 2;
        const baseY = 80;

        // Draw title and description
        this.drawText(centerX, 20, step.title, 18, '#6366f1', 'center');
        this.drawText(centerX, 45, step.description, 12, '#64748b', 'center');

        // Draw process visualization
        this.drawProcessVisualization(stepIndex, progress);

        // Draw progress indicator
        this.drawProgressBar(stepIndex + 1, this.steps.length);
    }

    drawProcessVisualization(stepIndex, progress) {
        const startY = 150;
        const boxWidth = 120;
        const boxHeight = 80;
        const spacing = 150;
        const centerX = this.canvas.width / 2;

        // Draw all boxes
        for (let i = 0; i < this.steps.length; i++) {
            const x = centerX - (this.steps.length * spacing) / 2 + i * spacing;
            const alpha = i <= stepIndex ? 1 : 0.3;

            // Draw connecting arrow
            if (i > 0) {
                const prevX = centerX - (this.steps.length * spacing) / 2 + (i - 1) * spacing + boxWidth / 2;
                const currentX = x - boxWidth / 2;
                
                this.ctx.globalAlpha = alpha;
                this.drawArrow(prevX, startY + boxHeight / 2, currentX, startY + boxHeight / 2, '#6366f1');
                this.ctx.globalAlpha = 1;
            }

            // Draw box
            const fillColor = i === stepIndex ? 
                'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)' : 
                (i < stepIndex ? '#e0e7ff' : '#f1f5f9');

            const actualColor = i === stepIndex ? '#6366f1' : (i < stepIndex ? '#818cf8' : '#cbd5e1');

            this.ctx.globalAlpha = alpha;
            this.drawBox(x - boxWidth / 2, startY, boxWidth, boxHeight, actualColor, '#1e293b', `Step ${i + 1}`);
            this.ctx.globalAlpha = 1;

            // Animate current step
            if (i === stepIndex) {
                const scale = 1 + Math.sin(progress * Math.PI) * 0.1;
                this.ctx.save();
                this.ctx.translate(x, startY + boxHeight / 2);
                this.ctx.scale(scale, scale);
                this.drawBox(-boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight, actualColor, '#fff', `Step ${i + 1}`);
                this.ctx.restore();
            }
        }

        // Draw data flow visualization
        this.drawDataFlow(stepIndex, progress, centerX, startY);
    }

    drawDataFlow(stepIndex, progress, centerX, baseY) {
        const dataY = baseY + 180;
        const dataBoxWidth = 100;
        const dataBoxHeight = 60;

        this.drawText(centerX, dataY - 40, 'Data Representation:', 12, '#1e293b', 'center');

        // Draw input tokens
        const tokenX = centerX - 200;
        this.drawText(tokenX - 30, dataY, 'Tokens:', 11, '#1e293b', 'center');
        for (let i = 0; i < 3; i++) {
            const x = tokenX + i * 70;
            const hue = (i * 120 + stepIndex * 60) % 360;
            this.drawCircle(x, dataY + 40, 15, `hsl(${hue}, 80%, 60%)`, '#1e293b', `T${i + 1}`);
        }

        // Draw transformation based on step
        const transformX = centerX + 50;
        this.drawText(transformX, dataY, stepIndex > 0 ? 'Vectors:' : 'Tokens:', 11, '#1e293b', 'center');
        
        if (stepIndex > 0) {
            for (let i = 0; i < 3; i++) {
                const x = transformX + i * 70;
                const y = dataY + 40 + Math.sin(progress * Math.PI + i) * 20;
                this.drawCircle(x, y, 15, '#6366f1', '#1e293b', `V${i + 1}`);
            }
        } else {
            for (let i = 0; i < 3; i++) {
                const x = transformX + i * 70;
                this.drawCircle(x, dataY + 40, 12, '#f59e0b', '#1e293b');
            }
        }
    }

    drawProgressBar(current, total) {
        const barWidth = 300;
        const barHeight = 20;
        const x = (this.canvas.width - barWidth) / 2;
        const y = this.canvas.height - 50;

        // Background
        this.ctx.fillStyle = '#e2e8f0';
        this.ctx.fillRect(x, y, barWidth, barHeight);

        // Progress
        const progressWidth = (current / total) * barWidth;
        const gradient = this.ctx.createLinearGradient(x, y, x + progressWidth, y);
        gradient.addColorStop(0, '#6366f1');
        gradient.addColorStop(1, '#ec4899');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(x, y, progressWidth, barHeight);

        // Border
        this.ctx.strokeStyle = '#1e293b';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x, y, barWidth, barHeight);

        // Text
        this.drawText(this.canvas.width / 2, y + barHeight + 10, `${current} / ${total}`, 12, '#1e293b', 'center');
    }
}

// RAG Animator
class RAGAnimator extends CanvasAnimator {
    constructor() {
        super('rag-canvas');
        this.steps = [
            { title: 'Query Input', description: 'User enters a question' },
            { title: 'Retrieval', description: 'Search knowledge base' },
            { title: 'Ranking', description: 'Rank by relevance' },
            { title: 'Augmentation', description: 'Combine with context' },
            { title: 'Generation', description: 'Generate response' },
            { title: 'Citation', description: 'Add source references' }
        ];
    }

    async drawStep(stepIndex, progress) {
        this.clear();
        this.drawGrid();

        const step = this.steps[stepIndex];
        const centerX = this.canvas.width / 2;

        // Draw title and description
        this.drawText(centerX, 20, step.title, 18, '#6366f1', 'center');
        this.drawText(centerX, 45, step.description, 12, '#64748b', 'center');

        // Draw RAG pipeline
        this.drawRAGPipeline(stepIndex, progress);

        // Draw progress indicator
        this.drawProgressBar(stepIndex + 1, this.steps.length);
    }

    drawRAGPipeline(stepIndex, progress) {
        const pipelineY = 100;
        const boxWidth = 100;
        const boxHeight = 70;
        const spacing = 130;
        const centerX = this.canvas.width / 2;

        // Pipeline components
        const components = ['Query', 'Search', 'Rank', 'Combine', 'Generate', 'Output'];

        for (let i = 0; i < components.length; i++) {
            const x = centerX - (components.length * spacing) / 2 + i * spacing;
            const alpha = i <= stepIndex ? 1 : 0.3;

            // Draw connecting arrow
            if (i > 0) {
                const prevX = centerX - (components.length * spacing) / 2 + (i - 1) * spacing + boxWidth / 2;
                const currentX = x - boxWidth / 2;

                this.ctx.globalAlpha = alpha;
                this.drawArrow(prevX, pipelineY + boxHeight / 2, currentX, pipelineY + boxHeight / 2, '#ec4899');
                this.ctx.globalAlpha = 1;
            }

            // Draw box
            const boxColor = i === stepIndex ? '#ec4899' : (i < stepIndex ? '#f472b6' : '#e5e7eb');
            this.ctx.globalAlpha = alpha;
            this.drawBox(x - boxWidth / 2, pipelineY, boxWidth, boxHeight, boxColor, '#1e293b', components[i]);
            this.ctx.globalAlpha = 1;

            // Highlight current step
            if (i === stepIndex) {
                const scale = 1 + Math.sin(progress * Math.PI) * 0.15;
                this.ctx.save();
                this.ctx.translate(x, pipelineY + boxHeight / 2);
                this.ctx.scale(scale, scale);
                this.drawBox(-boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight, boxColor, '#fff', components[i]);
                this.ctx.restore();
            }
        }

        // Draw detailed visualization for current step
        this.drawDetailedStep(stepIndex, progress, centerX);
    }

    drawDetailedStep(stepIndex, progress, centerX) {
        const detailY = 250;

        switch (stepIndex) {
            case 0: // Query Input
                this.drawQueryInputStep(progress, centerX, detailY);
                break;
            case 1: // Retrieval
                this.drawRetrievalStep(progress, centerX, detailY);
                break;
            case 2: // Ranking
                this.drawRankingStep(progress, centerX, detailY);
                break;
            case 3: // Augmentation
                this.drawAugmentationStep(progress, centerX, detailY);
                break;
            case 4: // Generation
                this.drawGenerationStep(progress, centerX, detailY);
                break;
            case 5: // Citation
                this.drawCitationStep(progress, centerX, detailY);
                break;
        }
    }

    drawQueryInputStep(progress, centerX, baseY) {
        this.drawText(centerX, baseY, 'Input Query:', 12, '#1e293b', 'center');
        const queryBox = 'What is machine learning?';
        const boxWidth = 250;
        const boxHeight = 50;
        this.drawBox(centerX - boxWidth / 2, baseY + 20, boxWidth, boxHeight, '#e0f2fe', '#0284c7', queryBox);
        
        // Animated particles
        for (let i = 0; i < 3; i++) {
            const x = centerX - 100 + Math.sin(progress * Math.PI + i * Math.PI / 3) * 80;
            const y = baseY + 80 + Math.cos(progress * Math.PI + i * Math.PI / 3) * 30;
            this.drawCircle(x, y, 5, '#06b6d4', '#1e293b');
        }
    }

    drawRetrievalStep(progress, centerX, baseY) {
        this.drawText(centerX, baseY, 'Knowledge Base Search:', 12, '#1e293b', 'center');

        // Draw knowledge base
        const kbWidth = 200;
        const kbHeight = 120;
        this.drawBox(centerX - 250, baseY + 20, kbWidth, kbHeight, '#f0f9ff', '#0ea5e9', 'KB');

        // Draw search query animation
        const queryX = centerX - 250 + kbWidth / 2;
        const queryY = baseY + 20 + kbHeight / 2;
        const searchRadius = 40 + progress * 40;

        this.ctx.strokeStyle = '#ec4899';
        this.ctx.lineWidth = 2;
        this.ctx.globalAlpha = 1 - progress;
        this.ctx.beginPath();
        this.ctx.arc(queryX, queryY, searchRadius, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.globalAlpha = 1;

        // Draw retrieved documents
        const docX = centerX + 80;
        this.drawText(docX, baseY - 10, 'Retrieved Docs:', 11, '#1e293b', 'center');
        
        for (let i = 0; i < 3; i++) {
            const y = baseY + 30 + i * 50;
            const opacity = Math.max(0, progress - i * 0.2);
            this.ctx.globalAlpha = Math.min(1, opacity * 2);
            this.drawBox(docX - 60, y, 120, 35, '#fef08a', '#ca8a04', `Doc ${i + 1}`);
            this.ctx.globalAlpha = 1;
        }
    }

    drawRankingStep(progress, centerX, baseY) {
        this.drawText(centerX, baseY, 'Relevance Scoring:', 12, '#1e293b', 'center');

        // Draw documents with scores
        for (let i = 0; i < 3; i++) {
            const y = baseY + 30 + i * 50;
            const score = Math.max(30, 90 - i * 25 - (1 - progress) * 40);
            
            // Document box
            this.drawBox(centerX - 120, y, 80, 35, '#fef3c7', '#d97706', `Doc ${i + 1}`);
            
            // Score bar
            const barX = centerX - 30;
            const barWidth = 100;
            this.ctx.fillStyle = '#e5e7eb';
            this.ctx.fillRect(barX, y + 5, barWidth, 25);
            
            const fillWidth = (score / 100) * barWidth;
            const gradient = this.ctx.createLinearGradient(barX, y, barX + fillWidth, y);
            gradient.addColorStop(0, '#10b981');
            gradient.addColorStop(1, '#059669');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(barX, y + 5, fillWidth, 25);
            
            this.drawText(barX + barWidth / 2, y + 17, `${Math.round(score)}%`, 10, '#1e293b', 'center');
        }
    }

    drawAugmentationStep(progress, centerX, baseY) {
        this.drawText(centerX, baseY, 'Create Augmented Prompt:', 12, '#1e293b', 'center');

        // Original query
        this.drawText(centerX - 150, baseY + 30, 'Query:', 10, '#1e293b', 'left');
        this.drawBox(centerX - 150, baseY + 45, 130, 30, '#e0e7ff', '#6366f1', 'What is ML?');

        // Plus sign
        this.drawText(centerX - 40, baseY + 60, '+', 20, '#6366f1', 'center');

        // Retrieved context
        this.drawText(centerX + 20, baseY + 30, 'Context:', 10, '#1e293b', 'left');
        this.drawBox(centerX + 20, baseY + 45, 130, 30, '#fef3c7', '#d97706', 'Top docs');

        // Arrow
        this.drawArrow(centerX, baseY + 100, centerX, baseY + 130, '#ec4899', '→');

        // Combined prompt
        this.drawText(centerX, baseY + 150, 'Augmented Context Ready', 11, '#10b981', 'center');
    }

    drawGenerationStep(progress, centerX, baseY) {
        this.drawText(centerX, baseY, 'Generate Response:', 12, '#1e293b', 'center');

        const generatorX = centerX - 100;
        const generatorY = baseY + 30;
        
        // Generator box
        this.drawBox(generatorX, generatorY, 200, 60, '#e0f2fe', '#0284c7', 'LLM Generator');

        // Output being generated
        const outputY = generatorY + 100;
        const charsGenerated = Math.floor(progress * 30);
        const outputText = 'ML is a subset of AI...'.substring(0, charsGenerated);
        
        this.drawText(centerX, outputY, 'Output:', 11, '#1e293b', 'center');
        this.drawText(centerX, outputY + 25, outputText, 10, '#10b981', 'center');

        // Blinking cursor
        if (Math.sin(progress * Math.PI * 4) > 0 && charsGenerated < 30) {
            this.drawText(centerX + 150, outputY + 25, '|', 10, '#10b981', 'center');
        }
    }

    drawCitationStep(progress, centerX, baseY) {
        this.drawText(centerX, baseY, 'Final Response with Citations:', 12, '#1e293b', 'center');

        const responseText = 'ML is a subset of AI that focuses on learning from data.';
        const citationY = baseY + 50;

        // Response box
        this.drawBox(centerX - 180, citationY, 360, 60, '#f0fdf4', '#15803d', responseText);

        // Citations
        this.drawText(centerX, citationY + 90, 'Sources:', 11, '#1e293b', 'center');

        const citations = ['[1] Wikipedia', '[2] Research Paper', '[3] Documentation'];
        for (let i = 0; i < citations.length; i++) {
            const opacity = Math.max(0, progress - i * 0.2);
            this.ctx.globalAlpha = Math.min(1, opacity * 2);
            this.drawBox(centerX - 180 + i * 130, citationY + 120, 100, 30, '#fce7f3', '#ec4899', citations[i]);
            this.ctx.globalAlpha = 1;
        }
    }

    drawProgressBar(current, total) {
        const barWidth = 300;
        const barHeight = 20;
        const x = (this.canvas.width - barWidth) / 2;
        const y = this.canvas.height - 50;

        // Background
        this.ctx.fillStyle = '#e2e8f0';
        this.ctx.fillRect(x, y, barWidth, barHeight);

        // Progress
        const progressWidth = (current / total) * barWidth;
        const gradient = this.ctx.createLinearGradient(x, y, x + progressWidth, y);
        gradient.addColorStop(0, '#ec4899');
        gradient.addColorStop(1, '#f59e0b');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(x, y, progressWidth, barHeight);

        // Border
        this.ctx.strokeStyle = '#1e293b';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x, y, barWidth, barHeight);

        // Text
        this.drawText(this.canvas.width / 2, y + barHeight + 10, `${current} / ${total}`, 12, '#1e293b', 'center');
    }
}
