# Installation & Setup Guide

## System Requirements

- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Text editor (VS Code, Sublime, etc.)
- Git (for version control)
- Optional: Node.js (for local server)

## Installation Methods

### Method 1: Direct Browser Opening (Simplest)

1. Download all files from the repository
2. Extract to a folder
3. Double-click `index.html` to open in browser
4. Done! Application is ready to use

**Note**: Some features may not work when opening directly as `file://` due to browser security. Use Method 2 for best experience.

### Method 2: Local Web Server (Recommended)

#### Using Python (All Operating Systems)

1. Open terminal/command prompt
2. Navigate to project folder:
   ```bash
   cd path/to/slm-rag-learning-platform
   ```

3. Start server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Or Python 2
   python -m SimpleHTTPServer 8000
   ```

4. Open browser to: `http://localhost:8000`

#### Using Node.js HTTP Server

1. Install globally:
   ```bash
   npm install -g http-server
   ```

2. Navigate to project and start:
   ```bash
   http-server
   ```

3. Open browser to displayed URL (usually `http://localhost:8080`)

#### Using Node.js Live Server

1. Install globally:
   ```bash
   npm install -g live-server
   ```

2. Navigate to project and start:
   ```bash
   live-server
   ```

3. Browser automatically opens with auto-refresh on file changes

#### Using VS Code Live Server Extension

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Browser opens automatically

### Method 3: Docker (Advanced)

Create `Dockerfile`:

```dockerfile
FROM nginx:latest
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:

```bash
docker build -t slm-rag-platform .
docker run -p 8000:80 slm-rag-platform
```

Visit: `http://localhost:8000`

## Development Setup

### For Code Modifications

1. Clone repository:
   ```bash
   git clone https://github.com/yourusername/slm-rag-learning-platform.git
   cd slm-rag-learning-platform
   ```

2. Open in code editor:
   ```bash
   # VS Code
   code .
   
   # Or your preferred editor
   ```

3. Set up local server (Method 2)

4. Edit files and refresh browser to see changes

### Editor Recommendations

- **VS Code**: Free, lightweight, excellent for web development
- **Sublime Text**: Fast, customizable
- **WebStorm**: Full-featured IDE for web development
- **Vim/Neovim**: For terminal enthusiasts

### Useful VS Code Extensions

- Live Server
- Prettier (code formatter)
- ESLint (JavaScript linter)
- CSS Intellisense
- Thunder Client (API testing)

## Configuration

### Modify Animation Speed Range

In `app.js`, find the speed control input:

```html
<input type="range" id="slm-speed" min="0.5" max="3" step="0.5" value="1">
```

- `min`: Minimum speed (lower = slower)
- `max`: Maximum speed (higher = faster)
- `step`: Speed increment
- `value`: Default speed

### Customize Colors

In `styles.css`, edit CSS variables:

```css
:root {
    --primary-color: #6366f1;      /* Change to your color */
    --secondary-color: #ec4899;
    --accent-color: #f59e0b;
    /* ... more colors ... */
}
```

### Modify Step Durations

In `app.js`, change animation duration:

```javascript
this.stepDuration = 2000; // milliseconds per step
```

Lower value = faster animation

### Customize Explanations

Edit step descriptions in `animations.js`:

```javascript
this.steps = [
    { 
        title: 'Input Processing', 
        description: 'The input data is tokenized into sequential units'
    },
    // ... more steps ...
];
```

## File Structure

```
slm-rag-learning-platform/
├── index.html              # Main HTML file
├── styles.css             # Styling
├── app.js                 # Main application logic
├── animations.js          # Canvas animations
├── package.json           # Project metadata
├── vercel.json           # Vercel deployment config
├── .gitignore            # Git ignore rules
├── README.md             # Project documentation
├── INSTALLATION.md       # This file
├── DEPLOYMENT_GUIDE.md   # Deployment instructions
└── .vscode/              # VS Code settings (optional)
```

## Troubleshooting Installation

### "Module not found" Error

**Cause**: File paths are incorrect
**Solution**: 
- Check all file names match exactly (case-sensitive on Linux/Mac)
- Use relative paths: `./styles.css` not `/styles.css`
- Ensure files are in same directory

### Blank Page After Opening

**Cause**: JavaScript errors or incorrect paths
**Solution**:
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab - are CSS/JS files loading?
4. Use local server instead of file:// protocol

### Animations Not Showing

**Cause**: Canvas rendering issue
**Solution**:
1. Check browser supports Canvas API
2. Try different browser
3. Ensure GPU acceleration is enabled
4. Check Console for JavaScript errors

### Keyboard Shortcuts Not Working

**Cause**: JavaScript not loaded
**Solution**:
1. Verify app.js is loading (Network tab)
2. Check no JavaScript errors (Console tab)
3. Try refreshing page (Ctrl+F5)
4. Restart local server

### CORS Errors

**Cause**: Opening as file:// instead of http://
**Solution**: Use local web server (Method 2)

## Performance Tips

### Optimize for Slow Networks

1. Reduce animation speed with slider
2. Use lower quality resolution if needed
3. Cache is automatically managed

### Optimize for Mobile

1. Use Chrome DevTools mobile emulation
2. Test on actual mobile device
3. Check touch responsiveness
4. Ensure landscape and portrait modes work

## Updating the Application

### Pull Latest Changes

```bash
git pull origin main
```

### Update Deployment

After making changes:

```bash
git add .
git commit -m "Description of changes"
git push origin main
```

Vercel automatically redeploys!

## Backup & Recovery

### Backup Your Work

```bash
# Create backup
git clone --mirror your-repo-url backup-name.git

# Or simple copy
cp -r slm-rag-learning-platform slm-rag-learning-platform.backup
```

### Revert Changes

```bash
# See history
git log

# Revert to previous commit
git revert HEAD

# Or reset to specific commit
git reset --hard commit-hash
```

## Next Steps

1. ✅ Install and run locally
2. 📖 Read the README.md
3. 🎨 Explore the code
4. 🔧 Customize for your needs
5. 🚀 Deploy to web
6. 📊 Share with students

## Getting Help

### Check Documentation

- `README.md` - Main documentation
- `DEPLOYMENT_GUIDE.md` - Deployment help
- Code comments in `.js` files
- Inline documentation

### Online Resources

- **MDN Web Docs**: https://developer.mozilla.org
- **Stack Overflow**: https://stackoverflow.com
- **JavaScript.info**: https://javascript.info
- **CSS-Tricks**: https://css-tricks.com

### Report Issues

1. Check existing issues on GitHub
2. Create new issue with:
   - Description of problem
   - Steps to reproduce
   - Browser/OS information
   - Screenshots if helpful
   - Error messages from console

## FAQ

**Q: Do I need Node.js to run this?**
A: No, it's optional. Only needed for local web server. Python is usually pre-installed on Mac/Linux.

**Q: Can I run this offline?**
A: Yes, but must use local server (not file:// protocol).

**Q: Which browsers are supported?**
A: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+. Mobile browsers supported too.

**Q: Can I modify and redistribute?**
A: Yes! Licensed under MIT. Just credit original author.

**Q: How do I add more animations?**
A: Edit `animations.js` and add methods to `SLMAnimator` or `RAGAnimator` classes.

**Q: Is it mobile-friendly?**
A: Yes! Fully responsive with touch gesture support.

---

**Ready to get started? Good luck! 🚀**

For more help, see other `.md` files or create a GitHub issue.
