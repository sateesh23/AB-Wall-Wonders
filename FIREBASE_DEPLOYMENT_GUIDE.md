# Firebase Deployment Configuration Guide

## Issue: Showing Static/Fake Data After Deployment

When deploying the project, you're seeing static project data instead of the projects uploaded through the admin panel. This happens because Firebase environment variables are not configured in the production environment.

## Required Environment Variables for Production

To show admin-uploaded projects after deployment, you need to configure these Firebase environment variables in your hosting platform:

```bash
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
```

## Vercel Deployment Setup

### Step 1: Get Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to Project Settings (gear icon)
4. Scroll down to "Your apps" section
5. Copy the config values from your web app

### Step 2: Configure Vercel Environment Variables
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each Firebase environment variable:

```
Variable Name: VITE_FIREBASE_API_KEY
Value: your-actual-api-key-from-firebase

Variable Name: VITE_FIREBASE_AUTH_DOMAIN
Value: your-project-id.firebaseapp.com

Variable Name: VITE_FIREBASE_PROJECT_ID
Value: your-actual-project-id

Variable Name: VITE_FIREBASE_STORAGE_BUCKET
Value: your-project-id.appspot.com

Variable Name: VITE_FIREBASE_MESSAGING_SENDER_ID
Value: your-actual-messaging-sender-id

Variable Name: VITE_FIREBASE_APP_ID
Value: your-actual-app-id
```

### Step 3: Remove Old Sanity Configuration
Update your `vercel.json` file to remove the old Sanity environment variables and add Firebase variables:

```json
{
  "routes": [
    {
      "src": "/admin",
      "dest": "/index.html"
    },
    {
      "src": "/admin/(.*)",
      "dest": "/index.html"
    },
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1"
    },
    {
      "src": "/(.*\\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp|json|txt|xml))",
      "dest": "/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "framework": "vite",
  "outputDirectory": "dist"
}
```

### Step 4: Redeploy
1. Push your code changes to GitHub
2. Vercel will automatically redeploy
3. Or manually trigger a redeploy from Vercel dashboard

## GitHub Deployment with Other Platforms

### Netlify
1. Go to your Netlify site dashboard
2. Go to **Site Settings** → **Environment Variables**
3. Add all the Firebase environment variables listed above

### Railway
1. Go to your Railway project
2. Go to **Variables** tab
3. Add all the Firebase environment variables

### Heroku
1. Go to your Heroku app dashboard
2. Go to **Settings** → **Config Vars**
3. Add all the Firebase environment variables

## Verification

After deployment with proper environment variables:

1. **Admin Panel**: Go to `/admin` and verify you can see uploaded projects
2. **Homepage**: Check that recent projects show admin-uploaded content
3. **Projects Page**: Verify all projects are from Firebase, not static data
4. **Console Logs**: Check browser console for Firebase connection status

## Troubleshooting

### Common Issues

1. **Still showing static data**
   - Verify all environment variables are set correctly
   - Check for typos in variable names (they're case-sensitive)
   - Ensure you redeployed after adding variables

2. **Firebase connection errors**
   - Verify Firebase project is active
   - Check Firestore security rules allow read access
   - Ensure the API key has proper permissions

3. **Images not loading**
   - Check that image URLs uploaded through admin are valid
   - Verify Firebase Storage rules if using Firebase Storage

### Debug Commands

To check if Firebase is properly configured, you can add this to your browser console on the deployed site:

```javascript
// Check if Firebase environment variables are loaded
console.log('Firebase Config:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'Set' : 'Missing',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'Set' : 'Missing',
  // ... other variables
});
```

## Local Development

For local development, create a `.env` file in your project root:

```bash
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
```

**Important**: Never commit the `.env` file to Git for security reasons.
