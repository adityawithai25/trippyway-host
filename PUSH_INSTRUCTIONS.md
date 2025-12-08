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

## ⚠️ Security Note

**NEVER commit your Personal Access Token to the repository!** If you accidentally commit a token:
1. Remove it from the file immediately
2. Revoke the token at: https://github.com/settings/tokens
3. Create a new token
4. Amend your commit: `git commit --amend --no-edit`

## Current Status
✅ Branch `develop` created and pushed
✅ Branch `main` created and pushed
✅ All code committed and pushed
✅ Remote configured

## Next Steps

For future pushes, you can:
1. Use the credential helper (already configured): `git push origin develop`
2. Or use token in URL temporarily: `git push https://YOUR_TOKEN@github.com/adityawithai25/trippyway-host.git develop`

**Important**: If you used a token in a command that was visible in terminal history, consider revoking it and creating a new one for security.

