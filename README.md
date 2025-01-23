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
npm run dev

Cloudflare Edge Runtime Testing
npm run dev:cf

Fullstack Local Development
npm run dev:fullstack

Build & Preview
Production Build
npm run build

Local Production Preview

npm run preview
# Visits http://localhost:3000

Deployment
One-Time Deployment
npm run deploy:ci

Update Existing Deployment
npm run deploy

Configuration Files
wrangler.toml
name = "gluestack"
compatibility_date = "2024-02-01"


.gitignore
# Build directories
.out/
.next/

# Environment files
.env*.local

# Dependencies
node_modules/

Recommended Workflow
Daily Development

npm run dev

Test Cloudflare Features

npm run build
npm run dev:cf


Production Deployment
npm run deploy:ci

Key Features
🔥 Local dev server with hot reloading

☁️ Cloudflare edge runtime simulation

🚀 One-command CI/CD deployment

🔒 Separate environment configurations

📦 Automatic build cleanup

📊 Bundle analysis tools

Troubleshooting
Missing Environment Variables

Verify .env.local exists for local development

Check Cloudflare Dashboard environment variables

Deployment Failures

Ensure wrangler login has been completed

Verify Node.js version >= 20

Preview Issues

Run npm run build before preview

Check for build errors in console

Maintenance
Update compatibility_date in wrangler.toml quarterly

Review Cloudflare Pages settings after major Next.js updates

Rotate API keys/credentials every 90 days


This README provides a complete reference for both new developers and deployment pipelines. Keep it updated as your deployment process evolves.