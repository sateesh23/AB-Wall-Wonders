# 🔐 Admin Page Deployment Guide

## Recent Changes Made

### 1. Updated Admin Password
- **Old Password**: `abwallwonders2024`
- **New Password**: `abwallwonders2025`
- **File Modified**: `client/components/ui/admin-auth.tsx`

### 2. Removed Demo Access Display
- Removed the blue box showing demo password
- Cleaner admin login interface
- **File Modified**: `client/components/ui/admin-auth.tsx`

### 3. Fixed Sanity Studio URLs for Production
- **Old**: `http://localhost:3333` (development only)
- **New**: `https://g5scqowd.sanity.studio/` (production ready)
- **Environment Variable**: `VITE_SANITY_STUDIO_URL` (optional)
- **File Modified**: `client/pages/Admin.tsx`

## Admin Page Access

### Local Development
1. Navigate to: `http://localhost:8080/admin`
2. Enter password: `abwallwonders2025`
3. Access granted to admin dashboard

### Production (Vercel)
1. Navigate to: `https://your-domain.vercel.app/admin`
2. Enter password: `abwallwonders2025`
3. Access granted to admin dashboard

## Sanity Studio Integration

### Current Setup
- **Project ID**: `g5scqowd`
- **Studio URL**: `https://g5scqowd.sanity.studio/`
- **Dataset**: `production`

### Admin Features
1. **Project Management**: Create, edit, delete projects
2. **Sanity Studio Access**: Direct links to CMS
3. **Statistics Dashboard**: Project counts and metrics
4. **Local Storage Fallback**: Works even without Sanity connection

## Environment Variables (Optional)

Add to Vercel Environment Variables if you want to customize:

```env
VITE_SANITY_STUDIO_URL=https://g5scqowd.sanity.studio/
VITE_SANITY_TOKEN=your_sanity_token_for_write_operations
```

## Security Notes

1. **Password Protection**: Simple password-based authentication
2. **Local Storage**: Auth state stored in browser localStorage
3. **Session Management**: Logout clears authentication
4. **Production Ready**: All localhost references removed

## Troubleshooting

### Admin Page Not Loading
- Check if `/admin` route is properly configured
- Verify React Router setup in `App.tsx`

### Sanity Studio Not Opening
- Verify the studio URL: `https://g5scqowd.sanity.studio/`
- Check if Sanity project is deployed
- Ensure you have access to the Sanity project

### Password Not Working
- Current password is: `abwallwonders2025`
- Clear browser localStorage if issues persist
- Check console for authentication errors

## Admin Functionality

### Overview Tab
- Project statistics and metrics
- Quick action buttons
- Service breakdown charts

### Projects Tab
- Create new projects
- Edit existing projects
- Delete projects
- Image upload support

### Settings Tab
- Sanity Studio access
- Website preview links
- Contact information display

## Next Steps

1. **Test Admin Access**: Verify login works in production
2. **Test Sanity Integration**: Ensure CMS links work correctly
3. **Backup Strategy**: Consider exporting project data regularly
4. **Enhanced Security**: Consider implementing proper authentication in future

---

**Admin Password**: `abwallwonders2025`  
**Sanity Studio**: `https://g5scqowd.sanity.studio/`  
**Project Status**: ✅ Production Ready
