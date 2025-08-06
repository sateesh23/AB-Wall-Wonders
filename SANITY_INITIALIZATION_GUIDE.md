# 🚀 Sanity CMS Initialization Guide

## Step 1: Create Sanity Account & Project

### Option A: Using Web Interface (Recommended)
1. Go to [sanity.io](https://sanity.io)
2. Sign up/login with Google, GitHub, or email
3. Click **"Create new project"**
4. Project name: **"AB Wall Wonders CMS"**
5. Keep dataset as **"production"**
6. Copy your **Project ID** (you'll need this)

### Option B: Using CLI (If you have Sanity account)
```bash
cd sanity-backend
npx sanity login
npx sanity init
```

## Step 2: Update Configuration Files

Once you have your **Project ID**, update these files:

### File 1: `sanity-backend/sanity.config.ts`
```typescript
export default defineConfig({
  name: 'ab-wall-wonders',
  title: 'AB Wall Wonders CMS',

  projectId: 'YOUR_PROJECT_ID_HERE', // ← Replace this
  dataset: 'production',

  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
```

### File 2: `client/lib/sanity.ts`
```typescript
export const client = createClient({
  projectId: 'YOUR_PROJECT_ID_HERE', // ← Replace this
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
})
```

## Step 3: Start Sanity Studio

```bash
cd sanity-backend
npm run dev
```

This will start the CMS admin at: **http://localhost:3333**

## Step 4: Add Your First Project

1. Open http://localhost:3333
2. Click **"Projects"** in the sidebar
3. Click **"Create"** button
4. Fill in the project details:
   - **Project Name**: e.g., "Modern Bedroom Wallpaper"
   - **Customer Name**: e.g., "Rajesh Kumar"
   - **Location**: e.g., "Vijayawada"
   - **Service Category**: Select from dropdown
   - **Description**: Project details
   - **Main Image**: Upload project photo
   - **Featured Project**: Check if you want it on homepage
   - **Completion Date**: When project was finished
5. Click **"Publish"**

## Step 5: View on Frontend

Your frontend at http://localhost:8080 will automatically show the real data instead of sample data!

## 🎯 Project Schema Fields

Your CMS includes these fields for each project:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Project Name | Text | ✅ | Name of the project |
| Customer Name | Text | ✅ | Client's name |
| Location | Text | ✅ | Project location |
| Service Category | Select | ✅ | Wallpapers/Blinds/Flooring |
| Subcategory | Text | ❌ | Specific service type |
| Description | Textarea | ✅ | Project details |
| Main Image | Image | ✅ | Primary project photo |
| Additional Images | Gallery | ❌ | More project photos |
| Featured Project | Boolean | ❌ | Show on homepage |
| Completion Date | Date | ✅ | When finished |
| Status | Select | ❌ | Completed/In Progress/Planning |

## 🔧 Troubleshooting

### "No projects showing on frontend"
- Make sure you've published projects in Sanity Studio
- Check that project ID is correctly updated in both config files

### "CMS won't start"
- Run `npm install` in sanity-backend directory
- Make sure you're in the sanity-backend directory when running `npm run dev`

### "Can't login to Sanity"
- Try using the web interface at sanity.io first
- Then use CLI: `npx sanity login`

## 🎉 Once Setup is Complete

- Your website will show real projects instead of sample data
- You can add unlimited projects through the beautiful CMS interface
- Changes appear instantly on your website
- Non-developers can easily manage content

## 📱 Next: Deploy Your CMS

Once everything is working locally:

```bash
cd sanity-backend
npm run deploy
```

This gives you a hosted CMS at: `https://your-project.sanity.studio`

---

**Need help?** The project is already set up to work with sample data, so your website is functional even before completing Sanity setup!
