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


# Authentication and Subscription Integration

This guide explains how to set up the authentication and subscription system in your Next.js application.

## Features

- **Secure Authentication**
  - JWT-based authentication with automatic token refresh
  - Social login (Google, Facebook, Microsoft)
  - Protected routes and middleware
  - Session management

- **Subscription Management**
  - Stripe integration for payments
  - Subscription status tracking
  - Premium content access control
  - Subscription management UI

## Setup Instructions

### 1. Prerequisites

- Node.js 14+ and npm/yarn
- Next.js 13+ project
- Stripe account
- Social login providers (optional)

### 2. Environment Variables

Create a `.env.local` file with the following variables:

```env
# Next Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# API URL
NEXT_PUBLIC_BASE_URL=https://api.your-backend.com

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
API_WEBHOOK_KEY=your-webhook-key

# Social Login
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
MICROSOFT_TENANT_ID=common
```

### 3. Installation

Install the required packages:

```bash
npm install next-auth @stripe/stripe-js stripe micro
npm install -D @types/stripe
```

### 4. Backend Setup

Ensure your backend API has the following endpoints:

- Authentication
  - `/api/Authentication/login`
  - `/api/Authentication/register`
  - `/api/Authentication/logout`
  - `/api/Authentication/verify-token`
  - `/api/Authentication/refresh-token`
  - `/api/external-authentication/callback`

- Subscription
  - `/api/Subscription/status`
  - `/api/Subscription/create-checkout-session`
  - `/api/Subscription/webhook-update`
  - `/api/Subscription/webhook-cancel`

### 5. Stripe Configuration

1. Set up products and prices in your Stripe dashboard
2. Configure a webhook endpoint in Stripe pointing to `/api/webhook` with these events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

### 6. Integration with Your App

1. Place the provided files in their respective directories
2. Update `_app.tsx` to include the `AuthProvider` and `SessionProvider`
3. Use the `ProtectedRoute` component for pages that require authentication
4. Implement the pricing page using the `PricingTable` component

## Deployment Checklist

Before deploying to production:

1. **Security**
   - Ensure HTTPS is enabled
   - Set proper CORS headers
   - Use strong NEXTAUTH_SECRET
   - Configure secure cookies

2. **Stripe**
   - Switch to production Stripe API keys
   - Update webhook endpoints and secrets
   - Test the complete subscription flow

3. **Social Login**
   - Update redirect URIs in provider dashboards
   - Set up proper callback URLs

4. **Performance**
   - Implement proper error handling
   - Add loading states for async operations

## Important Files

- `pages/api/auth/[...nextauth].ts` - NextAuth configuration
- `contexts/AuthContext.tsx` - Authentication context provider
- `middleware.ts` - Route protection and token handling
- `pages/api/webhook.ts` - Stripe webhook handler
- `components/subscription/PricingTable.tsx` - Subscription UI

## Customization

### Styling

The components use Tailwind CSS classes. You can customize the appearance by:

1. Modifying the Tailwind classes directly in the components
2. Creating a custom theme in your Tailwind config
3. Adding additional CSS in your global stylesheet

### Functionality

To customize the behavior:

1. Update the `AuthContext` to add or modify authentication functions
2. Modify the `SubscriptionDetails` component to show different information
3. Add or remove protected routes in the middleware configuration

## Troubleshooting

### Common Issues

1. **Authentication fails**
   - Check API URL and endpoints
   - Verify JWT secret consistency
   - Check browser console for CORS errors

2. **Stripe webhook not working**
   - Verify webhook signature secret
   - Check webhook endpoint is accessible
   - Look at Stripe Dashboard for failed webhook attempts

3. **Social login fails**
   - Verify redirect URIs in provider dashboards
   - Check console for OAuth errors
   - Ensure provider credentials are correct

### Logs and Debugging

- Enable debug mode in NextAuth by setting `debug: true`
- Check browser console for client-side errors
- Review server logs for backend issues
- Use Stripe CLI to test webhooks locally