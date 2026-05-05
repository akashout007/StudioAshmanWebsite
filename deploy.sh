#!/bin/bash
# ─────────────────────────────────────────────────────────────────
#  Ashman Studio — one-shot GitHub + Vercel deploy script
#  Run:  bash deploy.sh
# ─────────────────────────────────────────────────────────────────

set -e

GITHUB_USER="akashout007"
REPO_NAME="ashman-studio"
REPO_DESC="Ashman Studio — Brand Environments & Spatial Design (Next.js + GSAP)"

echo ""
echo "════════════════════════════════════════════════"
echo "  ASHMAN STUDIO — Deploy Script"
echo "════════════════════════════════════════════════"
echo ""

# ── Step 1: GitHub PAT ────────────────────────────────────────────
echo "STEP 1 of 3 — GitHub Personal Access Token"
echo ""
echo "  You need a CLASSIC token with 'repo' scope."
echo "  1. Open: https://github.com/settings/tokens"
echo "  2. Click 'Generate new token (classic)'"
echo "  3. Name it anything, e.g. 'ashman-deploy'"
echo "  4. Tick the top-level 'repo' checkbox ✓"
echo "  5. Click 'Generate token' and copy it (starts with ghp_)"
echo ""
read -rsp "Paste your GitHub token here (hidden): " GITHUB_TOKEN
echo ""
echo ""

# Verify token
echo "  Verifying GitHub token..."
GH_LOGIN=$(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user | python3 -c "import sys,json; print(json.load(sys.stdin).get('login','ERROR'))")
if [ "$GH_LOGIN" = "ERROR" ]; then
  echo "  ✗ Token invalid. Please check and retry."
  exit 1
fi
echo "  ✓ Authenticated as: $GH_LOGIN"
echo ""

# ── Step 2: Create GitHub repo ────────────────────────────────────
echo "STEP 2 of 3 — Creating GitHub repository..."
REPO_RESPONSE=$(curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"$REPO_NAME\",\"description\":\"$REPO_DESC\",\"private\":false}" \
  https://api.github.com/user/repos)

REPO_URL=$(echo "$REPO_RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('html_url', d.get('message','')))" 2>/dev/null)

if echo "$REPO_URL" | grep -q "github.com"; then
  echo "  ✓ Repo created: $REPO_URL"
else
  # Repo may already exist — check
  EXISTING=$(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/$GH_LOGIN/$REPO_NAME | python3 -c "import sys,json; print(json.load(sys.stdin).get('html_url',''))" 2>/dev/null)
  if echo "$EXISTING" | grep -q "github.com"; then
    echo "  ✓ Repo already exists: $EXISTING"
    REPO_URL=$EXISTING
  else
    echo "  ✗ Could not create repo. Response: $REPO_RESPONSE"
    exit 1
  fi
fi

# ── Step 3: Push code ─────────────────────────────────────────────
echo ""
echo "  Pushing code to GitHub..."
cd "$(dirname "$0")"
git remote remove origin 2>/dev/null || true
git remote add origin "https://$GITHUB_TOKEN@github.com/$GH_LOGIN/$REPO_NAME.git"
git push -u origin main
echo "  ✓ Code pushed to GitHub!"

# ── Step 4: Vercel deploy ─────────────────────────────────────────
echo ""
echo "STEP 3 of 3 — Vercel Deployment"
echo ""
echo "  Option A — One-click deploy (no token needed):"
echo "  Open this URL in your browser:"
echo ""
echo "  ┌─────────────────────────────────────────────────────────┐"
echo "  │  https://vercel.com/new/clone?repository-url=           │"
echo "  │  https://github.com/$GH_LOGIN/$REPO_NAME               │"
echo "  └─────────────────────────────────────────────────────────┘"
echo ""
echo "  Option B — Vercel CLI (if you have Node.js installed):"
echo "  cd ~/ashman-studio && npx vercel --prod"
echo ""
echo "════════════════════════════════════════════════"
echo "  ✓ All done! Your GitHub repo is live at:"
echo "  $REPO_URL"
echo "════════════════════════════════════════════════"
echo ""
