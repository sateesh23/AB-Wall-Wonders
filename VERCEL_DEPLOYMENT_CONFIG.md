# 🚀 AB Wall Wonders - Vercel Deployment Configuration

## EXACT Vercel Project Settings

### Project Configuration

- **Framework Preset**: `Vite`
- **Root Directory**: `./` (leave empty/default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node.js Version**: `18.x`

### Environment Variables (CRITICAL - EXACT NAMES)

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
# Sanity.io CMS Configuration
VITE_SANITY_PROJECT_ID=g5scqowd
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2023-01-01
VITE_SANITY_STUDIO_URL=https://g5scqowd.sanity.studio/

# Optional: For write operations to Sanity
VITE_SANITY_TOKEN=your_sanity_write_token_here
```

### Build & Output Settings

- ✅ **Build Command**: `npm run build`
- ✅ **Output Directory**: `dist`
- ✅ **Install Command**: `npm install`
- ✅ **Development Command**: `npm run dev`

### Function Configuration (Automatic)

- **Runtime**: Node.js 18.x
- **Memory**: 1024 MB
- **Max Duration**: 30 seconds
- **Region**: Auto (iad1 - Washington D.C.)

## Deployment Verification Checklist

### ✅ Pre-Deployment

- [ ] GitHub repository is properly connected
- [ ] All environment variables added with EXACT names
- [ ] Build command set to `npm run build`
- [ ] Output directory set to `dist`
- [ ] Sanity.io project configured

### ✅ Post-Deployment

- [ ] Build logs show successful completion
- [ ] Website loads at your Vercel URL
- [ ] Admin page accessible: `https://your-domain.vercel.app/admin`
- [ ] Sanity Studio accessible: `https://g5scqowd.sanity.studio/`
- [ ] Projects load from Sanity.io CMS
- [ ] Image optimization working via Sanity CDN

## Common Issues & Solutions

### Issue 1: Build Fails

**Error**: `Command "npm run build" exited with 1`
**Solution**:

1. Check environment variables are set correctly
2. Ensure Sanity project ID is valid
3. Verify all dependencies are installed

### Issue 2: Admin Page 404

**Error**: `404 - Not Found` on `/admin` route
**Solution**:

1. Check React Router configuration in `App.tsx`
2. Verify admin route is properly defined
3. Ensure build includes all pages

### Issue 3: Sanity Studio Not Loading

**Error**: Can't access Sanity Studio
**Solution**:

1. Verify Sanity project is deployed: `npm run deploy` in `sanity-backend/`
2. Check project ID matches in configuration
3. Ensure you have access to the Sanity project

### Issue 4: Images Not Loading

**Error**: Project images showing placeholder
**Solution**:

1. Check Sanity CDN configuration
2. Verify image upload functionality in admin
3. Ensure CORS settings allow image requests

### Issue 5: Admin Authentication Failed

**Error**: Password not working on production
**Solution**:

1. Clear browser localStorage
2. Check password is exactly: `abwallwonders2025`
3. Verify admin auth component is built correctly

## Expected Build Output

```
✓ 2385 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                                   0.50 kB │ gzip:   0.32 kB
dist/assets/index-[hash].css                      92.89 kB │ gzip:  15.10 kB
dist/assets/index-[hash].js                   1,067.53 kB │ gzip: 288.42 kB
✓ built in ~10s
```

## Test URLs After Deployment

- **Website**: `https://ab-wall-wonders.vercel.app`
- **Admin Portal**: `https://ab-wall-wonders.vercel.app/admin`
- **Services**:
  - `https://ab-wall-wonders.vercel.app/services/wallpapers`
  - `https://ab-wall-wonders.vercel.app/services/blinds`
  - `https://ab-wall-wonders.vercel.app/services/flooring`
- **Projects**: `https://ab-wall-wonders.vercel.app/projects`
- **Sanity Studio**: `https://g5scqowd.sanity.studio/`

## Performance Optimization

### **Automatic Optimizations**

- ✅ **Code Splitting**: Automatic route-based chunks
- ✅ **Image Optimization**: Sanity CDN handles compression
- ✅ **CSS Optimization**: Tailwind purging removes unused styles
- ✅ **Bundle Analysis**: Vite optimizes dependencies

### **CDN & Caching**

- ✅ **Global CDN**: Vercel Edge Network
- ✅ **Asset Caching**: Automatic browser caching headers
- ✅ **Image CDN**: Sanity.io optimized image delivery
- ✅ **Static Assets**: Cached at edge locations

## Monitoring & Analytics

### **Vercel Analytics**

- **Page Views**: Track visitor engagement
- **Performance Metrics**: Core Web Vitals monitoring
- **Error Tracking**: Runtime error detection
- **Deployment History**: Track all deployments

### **Business Metrics**

- **Admin Usage**: Track content management activity
- **Contact Forms**: Monitor lead generation
- **Service Pages**: Track service interest
- **Mobile Traffic**: Monitor mobile usage

## Security Configuration

### **HTTPS/SSL**

- ✅ **Automatic SSL**: Vercel provides free SSL certificates
- ✅ **Force HTTPS**: All traffic redirected to secure connections
- ✅ **Security Headers**: HSTS, CSP, and other security headers

### **Admin Security**

- ✅ **Password Protection**: `abwallwonders2025`
- ✅ **Session Management**: Browser localStorage
- ✅ **Sanity Auth**: Separate CMS authentication
- ✅ **CORS Protection**: Configured for security

## Support & Maintenance

### **Automatic Updates**

- **GitHub Integration**: Automatic deployments on push
- **Dependency Updates**: Regular security updates
- **Performance Monitoring**: Automatic optimization suggestions

### **Manual Maintenance**

- **Content Updates**: Via admin dashboard or Sanity Studio
- **Image Management**: Through Sanity.io CMS
- **Analytics Review**: Monthly performance reports

---

## Quick Deployment Steps

1. **Connect Repository**: Link GitHub repo to Vercel
2. **Set Environment Variables**: Add Sanity.io configuration
3. **Configure Build Settings**: Vite framework, `dist` output
4. **Deploy**: Click deploy and monitor build logs
5. **Test**: Verify all functionality works in production
6. **Go Live**: Update DNS if using custom domain

**📊 Expected Results**: Fast, secure, and professional website for AB Wall Wonders with full admin capabilities.

---

**🏡 AB Wall Wonders - Production Ready Deployment Configuration**
