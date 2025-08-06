# 🚀 AB Wall Wonders - Vercel Deployment Configuration

## EXACT Vercel Project Settings

### Project Configuration
- **Framework Preset**: `Vite`
- **Root Directory**: `./` (leave empty/default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist/spa`
- **Install Command**: `npm install`
- **Node.js Version**: `18.x`

### Environment Variables (CRITICAL - EXACT NAMES)
Add these in Vercel Dashboard → Settings → Environment Variables:

```
VITE_NOTION_TOKEN=your_notion_token_here
VITE_NOTION_DATABASE_ID=your_notion_database_id_here
VITE_NOTION_FORM_TOKEN=your_notion_form_token_here
VITE_NOTION_FORM_DATABASE_ID=your_notion_form_database_id_here
VITE_PUBLIC_BUILDER_KEY=your_builder_key_here
```

### Build & Output Settings
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist/spa`
- ✅ Install Command: `npm install`
- ✅ Development Command: `npm run dev`

### Function Configuration (Automatic)
- Runtime: Node.js 18.x
- Memory: 1024 MB
- Max Duration: 30 seconds
- Region: Auto (iad1 - Washington D.C.)

## Deployment Verification Checklist

### ✅ Pre-Deployment
- [ ] GitHub repository is public and accessible
- [ ] All environment variables added with EXACT names
- [ ] Build command set to `npm run build`
- [ ] Output directory set to `dist/spa`

### ✅ Post-Deployment
- [ ] Build logs show successful completion
- [ ] Website loads at your Vercel URL
- [ ] API health check works: `https://your-domain.vercel.app/api/health`
- [ ] Form submission works
- [ ] Projects load from Notion

## Common Issues & Solutions

### Issue 1: Build Fails
**Error**: `Command "npm run build" exited with 1`
**Solution**: Environment variables not set correctly

### Issue 2: API Functions Fail
**Error**: `FUNCTION_INVOCATION_FAILED`
**Solution**: Check environment variable names (must start with `VITE_`)

### Issue 3: 404 on API Routes
**Error**: `NOT_FOUND` for `/api/*`
**Solution**: Redeploy - vercel.json routing will fix this

### Issue 4: CORS Errors
**Error**: Cross-origin request blocked
**Solution**: Already fixed with CORS headers in all API functions

## Expected Build Output
```
✓ 2130 modules transformed.
✓ built in ~3s
dist/spa/index.html                   0.44 kB
dist/spa/assets/index-hoJCkEQq.css   88.81 kB
dist/spa/assets/index-BByf2shb.js   604.25 kB
```

## Test URLs After Deployment
- **Website**: `https://your-domain.vercel.app`
- **Health Check**: `https://your-domain.vercel.app/api/health`
- **Projects API**: `https://your-domain.vercel.app/api/notion/projects`
- **Form Submit**: `https://your-domain.vercel.app/api/submit-form`
