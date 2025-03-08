#!/bin/bash
# Set to exit on error
set -e

# Step 1: Build the Next.js app with static export
echo "Building Next.js app..."
npx next build

# For debugging
echo "Listing current directory:"
ls -la

# Check if out directory exists
if [ ! -d "out" ]; then
  echo "Creating out directory as it doesn't exist"
  mkdir -p out
  
  # If Next.js built to a different directory, try to find it
  if [ -d ".next" ]; then
    echo "Found .next directory, copying static files"
    cp -r .next/static out/
    # Create a basic index.html if it doesn't exist
    echo "<html><body><h1>Site is being set up</h1></body></html>" > out/index.html
  fi
fi

# For debugging
echo "Listing out directory (if it exists):"
ls -la out || echo "out directory doesn't exist or is empty"

# Step 2: Create the directory structure Cloudflare Pages expects
echo "Creating Cloudflare Pages directory structure..."
mkdir -p .vercel/output/static
mkdir -p .vercel/output/functions

# Step 3: Copy all content from the Next.js output directory to the .vercel/output/static directory
echo "Copying files to .vercel/output/static..."
if [ -d "out" ] && [ "$(ls -A out)" ]; then
  # Use cp -r to preserve directory structure
  cp -r out/* .vercel/output/static/
else
  # Create a placeholder file to prevent empty directory errors
  echo "<html><body><h1>Site is being set up</h1></body></html>" > .vercel/output/static/index.html
fi

# Ensure index.html exists and is properly placed
if [ ! -f ".vercel/output/static/index.html" ]; then
  echo "No index.html found at root level, copying from elsewhere or creating new one..."
  # Try to find an index.html somewhere in the output
  find .vercel/output/static -name "index.html" -exec cp {} .vercel/output/static/ \; || \
  echo "<html><body><h1>Welcome to the site</h1><p>The site is being set up.</p></body></html>" > .vercel/output/static/index.html
fi

# Step 4: Create a config.json file for Cloudflare Pages
echo "Creating Cloudflare Pages config..."
cat > .vercel/output/config.json << 'EOF'
{
  "version": 1,
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "status": 200, "dest": "/index.html" }
  ]
}
EOF

# Step 5: Create a simple function file (not middleware)
echo "Creating functions..."
mkdir -p .vercel/output/functions
cat > .vercel/output/functions/[[path]].js << 'EOF'
export function onRequest(context) {
  // This is a catch-all function that will handle any requests not handled by static files
  return context.next();
}
EOF

echo "Directory structure created for Cloudflare Pages deployment."
echo "Contents of .vercel/output directory:"
ls -la .vercel/output/
echo "Contents of .vercel/output/static directory:"
ls -la .vercel/output/static/