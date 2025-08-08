# Environment Variables Setup Guide

## Required Environment Variables

The application requires the following environment variables to function properly:

### Sanity CMS Configuration

```bash
# Project Configuration
VITE_SANITY_PROJECT_ID=g5scqowd              # Your Sanity project ID
VITE_SANITY_DATASET=production                # Dataset name (usually 'production')
VITE_SANITY_API_VERSION=2023-05-03          # API version for consistency

# Authentication
VITE_SANITY_TOKEN=your-read-write-token-here  # Read/write token from Sanity

# Studio URL
VITE_SANITY_STUDIO_URL=https://your-project.sanity.studio/
```

## Getting Your Sanity Token

1. Go to [Sanity Management Console](https://www.sanity.io/manage)
2. Select your project (`g5scqowd`)
3. Go to **API** → **Tokens**
4. Create a new token with **Read+Write** permissions
5. Copy the token and use it as `VITE_SANITY_TOKEN`

## Local Development Setup

1. Create `.env.local` file in the project root:

```bash
VITE_SANITY_PROJECT_ID=g5scqowd
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2023-05-03
VITE_SANITY_TOKEN=skPOnO6AN2F3J6kHPE4UVjLxQsct4GL6uSd3fSkTA4Tz3817r77xqss49A05skqrL9MYxsGffgjhyPHbOQwxryv8ugJqNs5hGdcRV2A5HAbJgHj0eQYlZ6BcvQwg2wCaG87JLNuyCoA3ulL5OPcD6nHRx4lzkxo3nxQURDUH0JrT8tvoG4Uy
VITE_SANITY_STUDIO_URL=https://ab-wall-wonders.sanity.studio/
```

2. Restart your development server after adding the token

## Production Deployment

### Vercel Deployment

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each environment variable:

```
VITE_SANITY_PROJECT_ID=g5scqowd
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2023-05-03
VITE_SANITY_TOKEN=skPOnO6AN2F3J6kHPE4UVjLxQsct4GL6uSd3fSkTA4Tz3817r77xqss49A05skqrL9MYxsGffgjhyPHbOQwxryv8ugJqNs5hGdcRV2A5HAbJgHj0eQYlZ6BcvQwg2wCaG87JLNuyCoA3ulL5OPcD6nHRx4lzkxo3nxQURDUH0JrT8tvoG4Uy
VITE_SANITY_STUDIO_URL=https://ab-wall-wonders.sanity.studio/
```

4. Redeploy your application

### Other Hosting Platforms

For other platforms (Netlify, Railway, etc.), add the same environment variables through their respective dashboards.

## Troubleshooting

### Common Issues

1. **"Sanity token missing"** - Make sure `VITE_SANITY_TOKEN` is set correctly
2. **"Unauthorized"** - Token might be expired or have insufficient permissions
3. **Projects not showing** - Check all environment variables are set in production
4. **"Network unavailable"** - Check if the Sanity service is accessible

### Testing Connection

The admin panel includes a Sanity Status indicator that shows:

- ✅ Connected (green) - Everything working
- ⚠️ Issues (yellow) - Using fallback storage
- ❌ Error (red) - Configuration problem

### Debug Mode

Check browser console for detailed logs about:

- Sanity connection status
- Project fetching attempts
- Error messages and fallback behavior

## Security Notes

- **Never commit tokens to git** - Use `.env.local` for local development
- **Use environment variables** for production deployments
- **Regenerate tokens** if they become compromised
- **Use read-only tokens** where write access isn't needed
