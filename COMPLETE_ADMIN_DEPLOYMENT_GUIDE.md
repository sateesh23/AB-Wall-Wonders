# 🚀 Complete Admin & Sanity Deployment Guide

## 📋 Overview

This guide covers the complete deployment process for the AB Wall Wonders admin panel and Sanity CMS integration. Follow these steps in order for a complete working admin system.

---

## 🏗️ Architecture Overview

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│    Admin Panel      │    │   Sanity Studio     │    │      Website        │
│   your-domain.com   │◄──►│  hosted by Sanity   │◄──►│   your-domain.com   │
│      /admin         │    │  g5scqowd.sanity    │    │    (all pages)      │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
```

---

## ⚙️ Step 1: Deploy Main Website

### Deploy to Vercel/Netlify

1. **Push your code to GitHub**
2. **Connect to Vercel or Netlify**
3. **Build settings:**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node.js version: 18.x or higher

### Environment Variables (Optional)

Add these in your hosting platform's environment variables:

```env
# Optional: Customize Sanity Studio URL
VITE_SANITY_STUDIO_URL=https://g5scqowd.sanity.studio/

# Optional: Add write token for better Sanity integration
VITE_SANITY_TOKEN=your_sanity_write_token
```

---

## 🎨 Step 2: Deploy Sanity Studio Separately

### Option A: Deploy to Sanity's Hosting (Recommended)

1. **Login to Sanity**

   ```bash
   cd sanity-backend
   npx sanity login
   ```

2. **Deploy Studio**

   ```bash
   npx sanity deploy
   ```

3. **Access Studio**
   - URL: `https://ab-wall-wonders.sanity.studio/`
   - Login with your Sanity account

### Option B: Self-Host Sanity Studio

1. **Build Studio**

   ```bash
   cd sanity-backend
   npm run build
   ```

2. **Deploy built files**
   - Upload `dist` folder to your hosting provider
   - Configure as separate subdomain (e.g., `admin.your-domain.com`)

---

## 🔐 Step 3: Admin Panel Access

### Admin Login Details

- **URL**: `https://your-domain.com/admin`
- **Password**: `abwallwonders2025`
- **Features**:
  - Project management (Create, Edit, Delete)
  - Image upload
  - Analytics dashboard
  - Direct links to Sanity Studio

### Admin Panel Features

1. **Overview Tab**

   - Project statistics
   - Service breakdown
   - Quick actions

2. **Projects Tab**

   - Add new projects
   - Edit existing projects
   - Upload project images
   - Delete projects

3. **Settings Tab**
   - Sanity Studio access
   - Contact information
   - Website preview

---

## 📊 Step 4: Configure Sanity CMS

### Access Sanity Studio

1. **Open Studio**: `https://g5scqowd.sanity.studio/`
2. **Login** with your Sanity account
3. **Grant access** to team members if needed

### Add First Project

1. **Click "Projects"** in sidebar
2. **Click "Create"** button
3. **Fill required fields**:
   - Project Name: "Modern Bedroom Wallpaper"
   - Customer Name: "Rajesh Kumar"
   - Location: "Vijayawada, Benz Circle"
   - Service Category: "Wallpapers"
   - Subcategory: "3D Wallpaper"
   - Description: "Beautiful 3D wallpaper installation..."
   - Upload main image
   - Check "Featured" for homepage display
   - Set completion date
   - Set status: "Completed"
4. **Click "Publish"**

### Verify Integration

1. **Check website**: New project should appear on homepage (if featured)
2. **Check projects page**: All projects should be listed
3. **Check admin panel**: Statistics should update

---

## 🔄 Step 5: Content Management Workflow

### For Non-Technical Users

**Option 1: Use Admin Panel** (Recommended for simple operations)

1. Go to `your-domain.com/admin`
2. Enter password: `abwallwonders2025`
3. Use "Projects" tab to manage content

**Option 2: Use Sanity Studio** (Advanced features)

1. Go to `https://g5scqowd.sanity.studio/`
2. Login with Sanity account
3. Full CMS capabilities

### For Developers

- **Admin Panel**: Perfect for quick project management
- **Sanity Studio**: Full content management with advanced features
- **Direct API**: Use Sanity client for custom integrations

---

## 🛠️ Step 6: Troubleshooting

### Admin Panel Issues

**Problem**: Admin page shows 404

- **Solution**: Clear browser cache, check routing configuration

**Problem**: Can't login to admin

- **Solution**:
  - Current password: `abwallwonders2025`
  - Clear localStorage: `localStorage.clear()`
  - Check browser console for errors

**Problem**: Projects not showing

- **Solution**:
  - Check Sanity connection in admin panel
  - Add projects via Sanity Studio first
  - Verify project schema matches

### Sanity Studio Issues

**Problem**: Can't access Sanity Studio

- **Solution**:
  - Verify URL: `https://g5scqowd.sanity.studio/`
  - Ensure you have Sanity account access
  - Check if studio is deployed

**Problem**: Can't create projects

- **Solution**:
  - Verify you have write permissions
  - Check required fields are filled
  - Ensure images are properly uploaded

**Problem**: Changes not appearing on website

- **Solution**:
  - Wait 1-2 minutes for CDN update
  - Hard refresh browser (Ctrl+F5)
  - Check if project is published in Sanity

---

## 🔒 Step 7: Security & Permissions

### Admin Panel Security

- **Simple password protection** (current implementation)
- **Upgrade recommendations**:
  - Implement proper OAuth
  - Add role-based permissions
  - Enable 2FA for production

### Sanity Permissions

1. **Project Settings** in Sanity Studio
2. **Manage members** - add team members
3. **API tokens** - manage read/write access
4. **CORS origins** - configure allowed domains

---

## 📈 Step 8: Monitoring & Maintenance

### Regular Tasks

1. **Backup Content**

   - Export project data from Sanity
   - Store images separately
   - Document admin credentials

2. **Update Dependencies**

   ```bash
   npm update
   cd sanity-backend && npm update
   ```

3. **Monitor Performance**
   - Check website loading speed
   - Monitor Sanity API usage
   - Review admin panel analytics

### Analytics

- **Admin Panel**: Built-in project statistics
- **Website**: Add Google Analytics if needed
- **Sanity**: Monitor API usage in Sanity dashboard

---

## 🎯 Step 9: Testing Checklist

### Complete Workflow Test

- [ ] **Website loads** at production URL
- [ ] **Admin panel accessible** at `/admin`
- [ ] **Login works** with password `abwallwonders2025`
- [ ] **Sanity Studio opens** at hosted URL
- [ ] **Can create project** in admin panel
- [ ] **Project appears** on website immediately
- [ ] **Can edit project** through admin
- [ ] **Can delete project** safely
- [ ] **Image upload works** in both interfaces
- [ ] **Featured projects** display on homepage
- [ ] **Statistics update** in admin dashboard
- [ ] **Mobile responsive** on all devices

---

## 🚀 Final Production URLs

### Live URLs

- **Website**: `https://your-domain.com`
- **Admin Panel**: `https://your-domain.com/admin`
- **Sanity Studio**: `https://g5scqowd.sanity.studio/`

### Credentials

- **Admin Password**: `abwallwonders2025`
- **Sanity Login**: Your Sanity account credentials

---

## 📞 Support Information

### For Technical Issues

- Check browser console for errors
- Review deployment logs
- Test on different devices/browsers

### For Content Management

- Use admin panel for simple tasks
- Use Sanity Studio for advanced features
- Regular backups recommended

---

## ✅ Success Indicators

You'll know everything is working when:

1. ✅ **Admin panel loads** and authentication works
2. ✅ **Sanity Studio opens** and you can login
3. ✅ **Projects created** in either interface appear on website
4. ✅ **Images upload** and display correctly
5. ✅ **Statistics update** in real-time
6. ✅ **Mobile experience** works smoothly

**Total setup time: 30-60 minutes**
**Result: Fully functional admin system with CMS** 🔥

---

## 🔮 Future Enhancements

### Authentication Improvements

- Implement OAuth (Google, GitHub)
- Add role-based permissions
- Enable 2FA for admin access

### Feature Additions

- Bulk project import/export
- Advanced analytics dashboard
- Email notifications for new projects
- API webhooks for integrations

### Performance Optimizations

- Image compression pipeline
- CDN optimization
- Caching strategies
- SEO enhancements

---

**🎉 Your admin system is now production-ready!**
