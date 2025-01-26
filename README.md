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


1. Cloudflare Setup (Using Wrangler CLI)
What this does:
Sets up the storage system for rate limiting and deploys your email worker.

bash
Copy
# Create KV namespace for rate limiting
wrangler kv:namespace create RATE_LIMITER
wrangler kv:namespace create RATE_LIMITER --preview
KV Namespace: Creates a key-value database to track how often users submit forms

Why Needed: Prevents spam by limiting submissions to 1 request/second per IP

Production + Preview: Creates separate databases for live/production and testing environments

toml
Copy
# wrangler.toml
kv_namespaces = [
  { binding = "RATE_LIMITER", id = "..." } # Replace ... with actual ID from CLI
]
Binding: Connects your worker code to the database

ID: Unique identifier Cloudflare generates when you create the namespace

bash
Copy
wrangler deploy
Publishes your worker to Cloudflare's global network

2. DNS Records Configuration
Purpose:
Ensures proper email delivery and prevents your emails from being marked as spam.

Copy
TXT  @  v=spf1 include:_spf.mx.cloudflare.net ~all
SPF Record: Authorizes Cloudflare to send emails on your behalf

Prevents Spoofing: Tells email providers "Only Cloudflare can send emails from this domain"

Copy
MX   @  route1.mx.cloudflare.net (Priority 10)
MX   @  route2.mx.cloudflare.net (Priority 20)
MX   @  route3.mx.cloudflare.net (Priority 30)
MX Records: Directs all incoming emails to Cloudflare's servers

Priority Order: Traffic routing priority (10 = highest)

3. Email Routing Setup
In Cloudflare Dashboard:

Go to Email → Routing

Create a Catch-all Address rule:

Matched Email: *@your-domain.com

Action: Forward to your-personal-email@gmail.com

Why This Matters:

Routes all emails sent via your worker to your actual inbox

Cloudflare handles spam filtering before forwarding

Key Timeline:
First: Create DNS records (takes 1-48 hrs to propagate globally)

Then: Configure Email Routing

Finally: Deploy your worker

Troubleshooting Tips:
Verify DNS records with MX Lookup

Test email delivery using a temporary inbox

Check Cloudflare Worker logs in the dashboard

This setup ensures your email system is secure, spam-resistant, and production-ready using entirely free Cloudflare services.