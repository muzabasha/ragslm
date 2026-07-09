# Quick Start Guide - 5 Minutes to Learning!

## For Students (Just Want to Learn)

### Step 1: Open in Browser (30 seconds)
```
1. Unzip the downloaded folder
2. Double-click "index.html"
3. Your browser opens automatically
4. Start learning! 🎓
```

**Note**: If it looks broken, scroll down to "Using Local Server" section.

### Step 2: Learn SLM
```
1. Click "SLM" tab at the top
2. Click blue "▶ Play" button
3. Watch the animation
4. Read the description below the buttons
```

### Step 3: Learn RAG
```
1. Click "RAG" tab at the top
2. Click blue "▶ Play" button
3. Watch how retrieval and generation work
4. Notice how context is combined with queries
```

### Step 4: Compare Models
```
1. Click "Comparison" tab
2. Scroll to see side-by-side comparison
3. Review the detailed table at bottom
4. Notice key differences
```

### Step 5: Master the Controls

| Button | What it does |
|--------|-------------|
| ▶ Play | Start animation |
| ⏸ Pause | Pause animation |
| ↻ Reset | Start over from beginning |
| ⏭ Next Step | Go to next step |
| ⏮ Previous Step | Go back one step |

### Keyboard Shortcuts
```
Space  → Play/Pause
→      → Next Step
←      → Previous Step  
R      → Reset
```

### Mobile: Swipe Gestures
```
← Swipe Left  → Next Step
→ Swipe Right → Previous Step
```

## For Teachers/Developers (Want to Deploy)

### Quick Deploy to Vercel (3 minutes)

#### On Your Computer:

1. **Get Git** (if you don't have it):
   - Visit: https://git-scm.com
   - Click "Download"
   - Install with default options

2. **Open Terminal/Command Prompt**:
   - Windows: Press `Win + R`, type `cmd`, press Enter
   - Mac: Press `Cmd + Space`, type `terminal`, press Enter
   - Linux: Open Terminal application

3. **Navigate to project folder**:
   ```bash
   cd "path/to/your/project/ragslm"
   ```

4. **Initialize Git**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

#### On GitHub:

5. **Create GitHub Account** (if needed):
   - Visit: https://github.com
   - Click "Sign up"
   - Complete registration

6. **Create New Repository**:
   - Click "+" icon → "New repository"
   - Name: `slm-rag-learning-platform`
   - Keep "Public" selected
   - Click "Create repository"

7. **Push to GitHub**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/slm-rag-learning-platform.git
   git push -u origin main
   ```

#### On Vercel:

8. **Deploy to Vercel**:
   - Visit: https://vercel.com
   - Click "Sign up"
   - Choose "Continue with GitHub"
   - Authorize Vercel
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Import"
   - Wait ~1 minute for deployment
   - **Done!** You get a live URL! 🎉

### Your Live URL
Your site is now live at:
```
https://YOUR-PROJECT-NAME.vercel.app
```

Share this URL with your students!

## For Developers (Want to Customize)

### Setup Development Environment

1. **Open in VS Code**:
   ```bash
   code /path/to/ragslm
   ```

2. **Install Live Server Extension**:
   - Click Extensions icon (or `Ctrl+Shift+X`)
   - Search "Live Server"
   - Click Install
   - Restart VS Code

3. **Start Development Server**:
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Browser opens automatically
   - Your changes refresh automatically!

### File Guide for Customization

| File | What to Edit | Example |
|------|------------|---------|
| `index.html` | Page content, structure | Add new sections |
| `styles.css` | Colors, fonts, layout | Change primary color |
| `animations.js` | Animation logic | Add new visualization |
| `app.js` | Controls and interaction | Add keyboard shortcuts |

### Common Customizations

**Change Primary Color**:
1. Open `styles.css`
2. Find `--primary-color: #6366f1`
3. Replace with your color (e.g., `#FF5733`)
4. Save and see changes instantly!

**Add Your Own Step**:
1. Open `animations.js`
2. Find `this.steps = [`
3. Add new step:
```javascript
{ 
    title: 'Your Title', 
    description: 'Your description' 
}
```

**Change Animation Speed**:
1. Open `app.js`
2. Find `this.stepDuration = 2000`
3. Reduce number for faster (e.g., 1000)
4. Increase number for slower (e.g., 4000)

## Troubleshooting

### Problem: Blank white page

**Solution**:
1. Press `F12` to open Developer Tools
2. Click "Console" tab
3. Look for red error messages
4. Try using local server instead:
   ```bash
   python -m http.server 8000
   ```
5. Visit `http://localhost:8000`

### Problem: Animations not working

**Solution**:
1. Try different browser (Chrome recommended)
2. Press `Ctrl+F5` to hard refresh
3. Check that all 4 files are in same folder:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `animations.js`

### Problem: Deployment fails

**Solution**:
1. Make sure you pushed to GitHub first:
   ```bash
   git push origin main
   ```
2. Check repository is PUBLIC on GitHub
3. Wait 2-3 minutes and refresh Vercel
4. Check deployment logs on Vercel dashboard

## Next Steps

### For Students:
- ✅ Open and explore the platform
- 📚 Learn both SLM and RAG models
- 🎯 Try all the controls and shortcuts
- 💭 Think about when to use each model

### For Teachers:
- ✅ Deploy to Vercel
- 📤 Share link with students
- 📊 Share demonstration in class
- 🧪 Customize for your curriculum

### For Developers:
- ✅ Clone the repository
- 🔧 Set up development environment
- 🎨 Customize the platform
- 🚀 Deploy and iterate

## Useful Resources

### Learning More
- **What is SLM?** - Read step descriptions in app
- **What is RAG?** - See RAG module for full pipeline
- **Why compare?** - Comparison tab explains differences

### Technical Help
- **GitHub Issues**: https://github.com/YOUR_USERNAME/slm-rag-learning-platform/issues
- **VS Code Help**: https://code.visualstudio.com/docs
- **Git Tutorial**: https://git-scm.com/book
- **Vercel Docs**: https://vercel.com/docs

## File Sizes
- Total size: ~67KB (all files combined)
- Fast to download
- Works on slow connections

## Browser Support
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## Need More Help?

1. **Stuck opening locally?** → See INSTALLATION.md
2. **Stuck deploying?** → See DEPLOYMENT_GUIDE.md
3. **Want to customize?** → See README.md
4. **Report bugs?** → Create GitHub issue

---

## TL;DR (Too Long, Didn't Read)

**To Learn:**
1. Open `index.html`
2. Click SLM → Play
3. Click RAG → Play
4. Click Comparison
5. Done learning!

**To Deploy:**
1. Make GitHub account
2. Push code to GitHub
3. Connect to Vercel
4. Share live link

**Happy Learning! 🎓🚀**
