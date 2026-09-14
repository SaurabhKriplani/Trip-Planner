# Vercel Deployment Setup Guide

This guide explains how to configure environment variables on Vercel for the Fravel AI Trip Planner application.

## Security Notice

⚠️ **Important**: The `.env` file has been removed from this GitHub repository for security reasons. However, if you cloned this repository before the security fix, please note that API keys may have been exposed in the git history. You should regenerate all API keys in your service accounts.

## Environment Variables Required

Add the following environment variables in your Vercel project settings:

### 1. **Google Generative AI API Key**
- **Variable Name**: `VITE_GOOGLE_GENERATIVE_AI_API_KEY`
- **Get from**: [Google AI Studio](https://aistudio.google.com/app/apikey)
- **Purpose**: Powers the AI trip planning and itinerary generation

### 2. **LocationIQ API Token**
- **Variable Name**: `VITE_LOCATION_IQ_TOKENS`
- **Get from**: [LocationIQ Dashboard](https://locationiq.com/)
- **Purpose**: Converts location names to coordinates for mapping

### 3. **Pexels API Key**
- **Variable Name**: `VITE_PEXELS_API_KEY`
- **Get from**: [Pexels API](https://www.pexels.com/api/)
- **Purpose**: Fetches high-quality images for destinations and hotels

### 4. **Clerk Publishable Key**
- **Variable Name**: `VITE_CLERK_PUBLISHABLE_KEY`
- **Get from**: [Clerk Dashboard](https://dashboard.clerk.com)
- **Purpose**: User authentication and account management

## Setup Steps

### Step 1: Get Your API Keys

Before adding environment variables to Vercel, gather all required API keys from their respective services:

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and copy your API key
2. Go to [LocationIQ Dashboard](https://locationiq.com/) → Account Settings → API Tokens
3. Go to [Pexels API](https://www.pexels.com/api/) and copy your API key
4. Go to [Clerk Dashboard](https://dashboard.clerk.com) → Development → API Keys → Copy Publishable Key

### Step 2: Add to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **Fravel_AI_TRIP_PLANNER** project
3. Click **Settings** → **Environment Variables**
4. Add each variable from the list above:
   - Click "Add New"
   - Enter the variable name and value
   - Select "Development", "Preview", and "Production" environments
   - Click "Save"

### Step 3: Redeploy

After adding all environment variables:

1. Go to the **Deployments** tab
2. Click the three dots on the latest deployment
3. Select "Redeploy"
4. Wait for the build to complete

Alternatively, push a new commit to the main branch to trigger an automatic redeploy:

```bash
git add .
git commit -m "Trigger deployment with environment variables"
git push origin main
```

## Verifying the Setup

Once deployed, verify that the application works correctly:

1. Visit your Vercel deployment URL
2. Test the dark/light theme toggle
3. Create a new trip to test the AI functionality
4. Verify hotel and destination images load properly
5. Test user authentication with Clerk

## Firebase Configuration

Firebase configuration is not stored as environment variables. Instead, it's embedded in the source code at `src/service/firebaseConfig.jsx`. This is acceptable because Firebase configuration values are intended to be public.

## For Local Development

If you're working locally:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in the values from your API key services

3. The `.env` file is git-ignored, so it won't be committed to the repository

## Troubleshooting

**Build fails with "VITE_CLERK_PUBLISHABLE_KEY is not defined"**
- Ensure the environment variable is added in Vercel Settings
- Make sure it's enabled for the "Production" environment
- Redeploy the application

**Images not loading**
- Verify the Pexels API key is correct and active
- Check Pexels API quota hasn't been exceeded

**Trip creation fails**
- Verify the Google Generative AI API key is active
- Check LocationIQ API token is valid
- Ensure your API keys have the necessary permissions

## API Key Rotation (Security Best Practice)

It's recommended to rotate your API keys periodically:

1. Generate new API keys from each service
2. Update them in Vercel Environment Variables
3. Redeploy the application
4. Delete the old API keys from the service

## Additional Resources

- [Vercel Environment Variables Documentation](https://vercel.com/docs/projects/environment-variables)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Clerk Documentation](https://clerk.com/docs)
- [Google Generative AI Documentation](https://ai.google.dev)
- [LocationIQ Documentation](https://locationiq.com/docs)
- [Pexels API Documentation](https://www.pexels.com/api-documentation/)
