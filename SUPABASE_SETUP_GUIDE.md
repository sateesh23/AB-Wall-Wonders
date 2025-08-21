# Supabase Setup Guide for AB Wall Wonders

This guide will help you set up Supabase for your AB Wall Wonders admin portal in production.

## 🚀 Quick Setup Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization (if needed)
4. Click "New Project"
5. Fill in project details:
   - Name: `ab-wall-wonders`
   - Database Password: (create a strong password)
   - Region: Choose closest to your users

### 2. Get Your Credentials

Once your project is created:

1. Go to Project Settings → API
2. Copy these values:
   - **Project URL** (starts with `https://`)
   - **Anon key** (public key, safe to use in frontend)

### 3. Set Environment Variables

#### For Builder.io Development:

Use the DevServerControl tool to set:

```bash
VITE_SUPABASE_URL=your-project-url-here
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

#### For Production Deployment:

Add these to your hosting platform's environment variables:

- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables
- **Other platforms**: Check their documentation

### 4. Create Database Schema

1. Go to Supabase Dashboard → SQL Editor
2. Copy and run the contents of `database-setup.sql`
3. This creates the `projects` table with proper structure

### 5. Configure Authentication (Optional)

If you want to secure the admin panel:

1. Go to Authentication → Settings
2. Configure your preferred auth method
3. Update the admin authentication logic

## 🔧 Environment Variables Explained

```env
# Your Supabase project URL
VITE_SUPABASE_URL=https://your-project-id.supabase.co

# Public anon key (safe for frontend)
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🛠️ Troubleshooting

### Admin Shows "Checking..." or "Not Configured"

1. Verify environment variables are set correctly
2. Check browser console for errors
3. Ensure Supabase project is active
4. Verify the database schema is created

### Connection Errors

1. Check if your Supabase project is paused (free tier)
2. Verify the URL format is correct
3. Ensure the anon key is the public key, not the service key

### RLS (Row Level Security) Issues

1. Make sure policies are created (done automatically with setup script)
2. For admin access, you might need to disable RLS temporarily:
   ```sql
   ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
   ```

## 📋 Database Schema

The setup creates a `projects` table with:

- `id`: Auto-incrementing primary key
- `title`: Project title
- `customer_name`: Customer name
- `location`: Project location
- `service`: wallpapers | flooring | blinds
- `subcategory`: Service subcategory
- `description`: Project description
- `image_url`: Main project image
- `image_urls`: Array of additional images
- `is_featured`: Featured project flag
- `completed_date`: Project completion date
- `status`: completed | in-progress | planned
- `created_at`: Auto-generated creation timestamp
- `updated_at`: Auto-updated modification timestamp

## 🚀 Production Deployment Checklist

- [ ] Supabase project created
- [ ] Environment variables set in hosting platform
- [ ] Database schema deployed
- [ ] Test connection from production URL
- [ ] Admin portal accessible and functional
- [ ] Projects can be created/edited/deleted
- [ ] Images display correctly
- [ ] RLS policies working (if using authentication)

## 📞 Support

If you encounter issues:

1. Check the browser console for errors
2. Verify environment variables in hosting platform
3. Test the connection using the admin debug panel
4. Ensure Supabase project is not paused

## 🔐 Security Best Practices

1. **Never commit .env files** to version control
2. **Use environment variables** for all sensitive data
3. **Enable RLS** for production (included in setup)
4. **Regularly rotate keys** if compromised
5. **Monitor usage** in Supabase dashboard

## 📈 Next Steps

After setup:

1. Add your real project data
2. Configure custom authentication (if needed)
3. Set up automated backups
4. Monitor usage and performance
5. Consider upgrading to Pro plan for production use
