#!/bin/bash
# ─────────────────────────────────────────────────────────────────
#  Ashman Studio — GitHub + Vercel deploy script
#  Run:  bash deploy.sh
# ─────────────────────────────────────────────────────────────────

set -e

REPO_NAME="ashman-studio"
REPO_DESC="Ashman Studio — Brand Environments & Spatial Design (Next.js + GSAP)"

echo ""
echo "════════════════════════════════════════════════"
echo "  ASHMAN STUDIO — Deploy Script"
echo "════════════════════════════════════════════════"
echo ""

# ── Step 1: GitHub PAT ───────────────────────────────────────────
echo "STEP 1 — GitHub Personal Access Token"
echo ""
read -rsp "  Paste your GitHub token (hidden, press Enter when done): " GITHUB_TOKEN
echo ""
echo ""

# Verify token + get login
echo "  Verifying token..."
API_RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user)
GH_LOGIN=$(echo "$API_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('login',''))" 2>/dev/null)

if [ -z "$GH_LOGIN" ]; then
  echo "  ✗ Token is invalid or expired. Generate a new one and retry."
  exit 1
fi
echo "  ✓ Authenticated as: $GH_LOGIN"

# Check scopes
SCOPES=$(curl -sI -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user | grep -i "x-oauth-scopes" | tr -d '\r' | sed 's/x-oauth-scopes: //')
echo "  Token scopes: [${SCOPES:-none}]"

if [ -z "$SCOPES" ]; then
  echo ""
  echo "  ✗ This token has NO scopes — it cannot create repositories."
  echo ""
  echo "  ────────────────────────────────────────────────────────"
  echo "  FIX: Generate a classic token WITH repo scope:"
  echo ""
  echo "  1. Go to: https://github.com/settings/tokens/new"
  echo "     (make sure URL says /tokens/new, not /tokens/new?type=beta)"
  echo "  2. Set any note, e.g. 'deploy'"
  echo "  3. Under 'Select scopes', check the FIRST checkbox: [ ] repo"
  echo "     It should turn blue and show 5 sub-items underneath"
  echo "  4. Scroll down, click GREEN button 'Generate token'"
  echo "  5. Copy the ghp_... value and re-run this script"
  echo "  ────────────────────────────────────────────────────────"
  echo ""
  echo "  ALTERNATIVE — skip token, create repo manually:"
  echo "  Go to https://github.com/new, name it '$REPO_NAME',"
  echo "  keep it Public, do NOT add README/gitignore."
  echo "  Then press Enter below to continue with manual repo."
  echo ""
  read -rp "  Press Enter to continue with manual repo, or Ctrl+C to exit and fix the token: "
  MANUAL_REPO="https://github.com/$GH_LOGIN/$REPO_NAME"
  echo ""
  echo "  Using existing/manual repo: $MANUAL_REPO"
  REPO_URL=$MANUAL_REPO
else
  # ── Step 2: Create repo via API ────────────────────────────────
  echo ""
  echo "STEP 2 — Creating GitHub repository..."
  REPO_RESPONSE=$(curl -s -X POST \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github+json" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$REPO_NAME\",\"description\":\"$REPO_DESC\",\"private\":false}" \
    https://api.github.com/user/repos)

  REPO_URL=$(echo "$REPO_RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('html_url',''))" 2>/dev/null)

  if echo "$REPO_URL" | grep -q "github.com"; then
    echo "  ✓ Repo created: $REPO_URL"
  else
    # Check if it already exists
    EXISTING=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
      https://api.github.com/repos/$GH_LOGIN/$REPO_NAME | \
      python3 -c "import sys,json; print(json.load(sys.stdin).get('html_url',''))" 2>/dev/null)
    if echo "$EXISTING" | grep -q "github.com"; then
      echo "  ✓ Repo already exists: $EXISTING"
      REPO_URL=$EXISTING
    else
      echo "  ✗ Failed to create repo. Full response:"
      echo "$REPO_RESPONSE"
      exit 1
    fi
  fi
fi

# ── Step 3: Push code ────────────────────────────────────────────
echo ""
echo "STEP 3 — Pushing code to GitHub..."
cd "$(dirname "$0")"
git remote remove origin 2>/dev/null || true
git remote add origin "https://$GITHUB_TOKEN@github.com/$GH_LOGIN/$REPO_NAME.git"
git push -u origin main
echo "  ✓ All code pushed!"

# ── Done: Vercel instructions ────────────────────────────────────
echo ""
echo "════════════════════════════════════════════════"
echo "  ✓ GitHub repo live:"
echo "  https://github.com/$GH_LOGIN/$REPO_NAME"
echo ""
echo "  DEPLOY TO VERCEL — open this URL in your browser:"
echo ""
echo "  https://vercel.com/new/clone?repository-url=https://github.com/$GH_LOGIN/$REPO_NAME"
echo ""
echo "  Log in to Vercel → click Import → Deploy."
echo "  Vercel auto-detects Next.js. No config needed."
echo "  Your site will be live in ~60 seconds."
echo "════════════════════════════════════════════════"
echo ""
