# How to Push to GitHub with New Account

## Step 1: Update Git Email (if not done)
```bash
git config --global user.email "your-email@example.com"
```
Replace with the email associated with your GitHub account `adityawithai25`

## Step 2: Create Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `trippyway-host-push`
4. Select expiration (30 days, 60 days, 90 days, or no expiration)
5. **Check the `repo` scope** (this gives full repository access)
6. Click **"Generate token"**
7. **COPY THE TOKEN IMMEDIATELY** - you won't see it again!

## Step 3: Push to Repository

Run these commands:

```bash
cd /Users/adityadubey/Documents/Startup_Travel/trippyway-webiste-v1-live/trippyway-host
git checkout develop
git push -u origin develop
```

When prompted:
- **Username**: `adityawithai25`
- **Password**: Paste your Personal Access Token (NOT your GitHub password)

## Alternative: Using Token in URL (One-time)

If you want to avoid prompts, you can use:

```bash
git push https://YOUR_TOKEN@github.com/adityawithai25/trippyway-host.git develop
```

Replace `YOUR_TOKEN` with your actual token.

## Current Status
✅ Branch `develop` created
✅ All code committed
✅ Remote configured
⏳ Waiting for authentication to push

