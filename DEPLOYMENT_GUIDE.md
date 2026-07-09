# Deployment Guide - SLM & RAG Learning Platform

## Quick Start Steps

### Step 1: Prepare for GitHub

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name: `slm-rag-learning-platform`
   - Description: `Interactive web application for learning SLM and RAG models`
   - Choose "Public" for visibility
   - Click "Create repository"

### Step 2: Push to GitHub

From the project directory, run these commands:

```bash
# Initialize git repository
git init

# Configure git
git config user.email "your-email@example.com"
git config user.name "Your Name"

# Stage all files
git add .

# Create initial commit
git commit -m "Initial commit: Add SLM & RAG learning platform"

# Add remote repository
git remote add origin https://github.com/yourusername/slm-rag-learning-platform.git

# Rename branch to main if needed
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Deploy to Vercel

**Method 1: Using Vercel Dashboard (Recommended)**

1. Visit https://vercel.com
2. Sign up with GitHub account
3. Click "New Project"
4. Select your GitHub repository
5. Keep default settings (Vercel detects static site)
6. Click "Deploy"
7. Wait for deployment to complete
8. You'll get a URL like: `your-project-name.vercel.app`

**Method 2: Using Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
vercel

# Follow the prompts and select your project
```

### Step 4: Verify Deployment

After deployment:
1. Visit your Vercel URL
2. Test all interactive features:
   - Click through navigation tabs (SLM, RAG, Comparison)
   - Test Play/Pause buttons
   - Use keyboard shortcuts (Space, Arrow keys, R)
   - Check animation smoothness
   - Test on mobile using Chrome DevTools (F12 → Device Toolbar)

## Alternative Deployment Options

### Deploy to GitHub Pages

1. In your GitHub repository, go to Settings → Pages
2. Select "Deploy from a branch"
3. Choose "main" branch and "/" (root) folder
4. Click "Save"
5. Your site will be available at: `username.github.io/slm-rag-learning-platform`

**Note**: GitHub Pages takes ~2 minutes to deploy.

### Deploy to Netlify

1. Visit https://netlify.com
2. Click "Add new site"
3. Choose "Import an existing project"
4. Connect your GitHub repository
5. Configure build settings (none needed for static site)
6. Click "Deploy site"

Your site will be live at a Netlify subdomain.

### Deploy to Cloudflare Pages

1. Visit https://pages.cloudflare.com
2. Click "Create a project"
3. Connect to your GitHub repository
4. Select the repository and branch
5. Build command: Leave empty
6. Build output directory: Leave empty
7. Click "Save and deploy"

## Configuration for Different Platforms

### Vercel Configuration (Already Included)

The `vercel.json` file includes:
- Clean URLs
- Cache headers for optimal performance
- Security headers
- Proper redirects

### GitHub Pages Configuration

Create a `.github/workflows/deploy.yml` file for automated deployment:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## Custom Domain Setup

### For Vercel

1. In Vercel project settings → Domains
2. Click "Add Custom Domain"
3. Enter your domain
4. Follow DNS configuration instructions
5. Update your domain registrar's DNS settings

### For GitHub Pages

1. In repository Settings → Pages
2. Under "Custom domain", enter your domain
3. Update your domain registrar to point to GitHub:
   - Add A records pointing to GitHub's IP addresses
   - Or add CNAME record pointing to `username.github.io`

### For Netlify

1. In Netlify site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain
4. Follow DNS configuration instructions

## Monitoring & Analytics

### Google Analytics Setup

1. Create Google Analytics account
2. Add this code before closing `</head>` tag in `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Replace `GA_MEASUREMENT_ID` with your actual ID.

### Vercel Analytics

Automatically included with Vercel! View in:
- Vercel Dashboard → Analytics tab
- Shows page views, response times, web vitals

## Troubleshooting Deployment

### Canvas Not Rendering

If animations don't appear:
1. Check browser console for errors (F12)
2. Ensure canvas elements are in HTML
3. Verify CSS and JS files are loaded
4. Clear browser cache (Ctrl+Shift+Delete)

### Styles Not Applied

1. Check CSS file is loaded (Network tab in DevTools)
2. Verify file paths are correct (relative paths)
3. Hard refresh browser (Ctrl+F5)
4. Check for CSS syntax errors

### Navigation Not Working

1. Ensure JavaScript files are loaded
2. Check for JavaScript errors in console
3. Verify module IDs match in HTML and JS
4. Test in different browser

### Mobile Issues

1. Test in Chrome DevTools mobile emulation (F12)
2. Check touch event listeners
3. Verify responsive CSS media queries
4. Test actual mobile device

## Performance Optimization

The platform is already optimized:
- ✅ No external dependencies (lightweight)
- ✅ Efficient Canvas rendering
- ✅ CSS animations (GPU-accelerated)
- ✅ Minimal file sizes
- ✅ Caching headers configured

**File sizes:**
- index.html: ~20KB
- styles.css: ~15KB
- animations.js: ~20KB
- app.js: ~12KB
- **Total: ~67KB** (all gzipped)

## Continuous Deployment

### Automatic Updates

Once pushed to GitHub:
- Vercel automatically deploys on every push
- GitHub Pages updates within 2 minutes
- Netlify redeploys on changes

### Manual Rollback

If something breaks:

1. **Vercel**: Dashboard → Deployments → Select previous → "Promote to Production"
2. **GitHub Pages**: Previous deployments are kept, revert Git commit
3. **Netlify**: Site settings → Deploys → Select previous deploy

## Security Checklist

- ✅ No sensitive data in code
- ✅ HTTPS enabled (automatic with Vercel/Netlify/GitHub Pages)
- ✅ Security headers configured
- ✅ No external API calls without HTTPS
- ✅ Content Security Policy headers (if needed)

## Testing Before Deploy

Before pushing to production:

```bash
# Test locally
python -m http.server 8000

# Visit http://localhost:8000
# Test all features:
# - Navigation
# - Animation playback
# - All controls
# - Keyboard shortcuts
# - Mobile responsiveness
# - Console for errors
```

## Support & Issues

If deployment fails:

1. Check deployment logs (view in Vercel/Netlify dashboard)
2. Verify all files are committed to Git
3. Check branch is "main"
4. Ensure repository is public (for free hosting)
5. Clear browser cache
6. Try different browser
7. Check GitHub repository status

## Next Steps

1. ✅ Deploy successfully
2. 📊 Add Google Analytics
3. 🎯 Promote on social media
4. 📝 Document in university systems
5. 👥 Gather student feedback
6. 🚀 Iterate and improve based on usage

## Useful Links

- **GitHub**: https://github.com
- **Vercel**: https://vercel.com
- **Netlify**: https://netlify.com
- **GitHub Pages**: https://pages.github.com
- **Cloudflare Pages**: https://pages.cloudflare.com

---

**Happy deploying! 🚀**

For issues or questions, create a GitHub issue in your repository.
