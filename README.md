# Next.js + Cloudflare Pages Deployment Guide

This document outlines the development workflow, build process, and deployment configuration for a Next.js application to Cloudflare Pages.

## Prerequisites
- Node.js v20+
- npm v9+
- Cloudflare account
- Wrangler CLI installed globally (`npm install -g wrangler`)

## Installation
```bash
# Install project dependencies
npm install

# Install development tools
npm install --save-dev serve cross-env concurrently

Environment Setup
1. Local Development Environment
Create .env.local file:

NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_ID=local_dev
# Add other environment variables here

2. Cloudflare Production Environment
Go to Cloudflare Dashboard → Pages → Settings → Environment Variables
https://dash.cloudflare.com/4912457480997df81450b3ea614ccf3c/workers-and-pages/create/pages
Add production values matching your local environment variables

Development Workflow
Local Development Server
npm run dev or
npx ts-node server.ts for https


