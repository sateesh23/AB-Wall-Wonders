# 🚀 Vercel Deployment Guide for AB Wall Wonders

## ✅ Pre-Deployment Checklist

Your project is now production-ready! Here's what has been completed:

- ✅ Before/After toggle functionality fixed
- ✅ Unnecessary files removed
- ✅ Production optimizations applied
- ✅ Vercel configuration optimized
- ✅ Package.json streamlined

## 🎯 Step-by-Step Deployment

### 1. Push Your Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Production ready - AB Wall Wonders"

# Add your GitHub repository
git remote add origin https://github.com/yourusername/ab-wall-wonders.git

# Push to GitHub
git push -u origin main
```

### 2. Deploy to Vercel

**Option A: Using Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? N
# - Project name: ab-wall-wonders
# - Directory: ./
# - Override settings? N
```

**Option B: Using Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the settings

### 3. Configure Environment Variables

In your **Vercel Dashboard** → **Project Settings** → **Environment Variables**, add:

```env
VITE_SUPABASE_URL=https://gbtotyrhqbcxbvcyfygg.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdidG90eXJocWJjeGJ2Y3lmeWdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyMTA0OTEsImV4cCI6MjA3MDc4NjQ5MX0.mu6ImykU6ra7SmTeX79ANCnMM4-uCFjotCQD3AX1dDQ
```

**Important**: Set these for **Production**, **Preview**, and **Development** environments.

### 4. Setup Supabase Storage (If Not Done)

Run this SQL in your **Supabase SQL Editor**:

```sql
-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images', 
  true,
  5242880,
  '{"image/*"}'
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = '{"image/*"}';

-- Enable public access policies
CREATE POLICY "Enable public read access on project images" ON storage.objects
FOR SELECT USING (bucket_id = 'project-images');

CREATE POLICY "Enable public insert access on project images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Enable public update access on project images" ON storage.objects
FOR UPDATE USING (bucket_id = 'project-images');

CREATE POLICY "Enable public delete access on project images" ON storage.objects
FOR DELETE USING (bucket_id = 'project-images');
```

### 5. Redeploy After Environment Variables

After adding environment variables, trigger a new deployment:

```bash
# Using CLI
vercel --prod

# Or push a new commit to trigger auto-deployment
git add .
git commit -m "Add environment variables"
git push
```

## 🔧 Post-Deployment Setup

### 1. Test Your Live Website

Visit your Vercel URL (e.g., `https://ab-wall-wonders.vercel.app`) and test:

- ✅ Homepage loads correctly
- ✅ Projects page shows empty state (initially)
- ✅ Admin panel accessible at `/admin`
- ✅ Login works with password: `abwallwonders2025`

### 2. Add Your First Project

1. **Go to**: `https://your-domain.vercel.app/admin`
2. **Login** with password: `abwallwonders2025`
3. **Click**: "Projects" → "Add New Project"
4. **Upload**: Before and After images
5. **Fill details** and save
6. **Check**: Project appears on homepage immediately

### 3. Custom Domain (Optional)

In **Vercel Dashboard** → **Domains**:
1. Add your custom domain
2. Configure DNS records as shown
3. SSL certificate will be auto-generated

## 🚨 Common Issues & Solutions

### Issue: "Environment variables not working"
**Solution**: Make sure to redeploy after adding environment variables

### Issue: "Images not uploading"
**Solution**: Check Supabase storage policies are correctly set

### Issue: "Build fails with TypeScript errors"
**Solution**: Fix TypeScript errors and redeploy

### Issue: "404 on page refresh"
**Solution**: The `vercel.json` file handles this automatically

## 📱 Production URLs

After deployment, your URLs will be:

- **Website**: `https://your-project.vercel.app`
- **Admin Panel**: `https://your-project.vercel.app/admin`
- **Admin Password**: `abwallwonders2025`

## 🔒 Security Considerations

1. **Change admin password** in production
2. **Enable Supabase Row Level Security** with proper authentication
3. **Add rate limiting** for image uploads
4. **Monitor usage** in Vercel and Supabase dashboards

## 📊 Monitoring

- **Vercel Analytics**: Automatically enabled
- **Supabase Dashboard**: Monitor database usage
- **Error Tracking**: Check Vercel function logs

---

## 🎉 Deployment Complete!

Your AB Wall Wonders website is now live and production-ready with:

- ✅ **Working before/after toggles**
- ✅ **Admin CMS system**
- ✅ **Image upload functionality**
- ✅ **Production optimizations**
- ✅ **Automatic deployments**

**Next Steps:**
1. Add your first project through admin panel
2. Share the website with customers
3. Monitor performance and usage

🚀 **Your website is ready for customers!**
