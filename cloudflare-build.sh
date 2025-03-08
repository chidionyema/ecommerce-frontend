#!/bin/bash
# deploy-setup.sh - Create the correct directory structure for Cloudflare Pages

# Make sure we start from a clean state
rm -rf .vercel

# Create the directory structure Cloudflare Pages expects
mkdir -p .vercel/output/static
mkdir -p .vercel/output/functions

# Copy all content from the Next.js output directory to the .vercel/output/static directory
cp -r out/* .vercel/output/static/

# Create a config.json file for Cloudflare Pages
cat > .vercel/output/config.json << 'EOF'
{
  "version": 1,
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
EOF

echo "Directory structure created for Cloudflare Pages deployment."
ls -la .vercel/output/