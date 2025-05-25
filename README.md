# Enterprise Front-End – Next.js 15

> Production-ready starter with App Router, MUI, Stripe subscriptions and
> social authentication.

---

## 1 · Prerequisites

| Tool | Minimum Version | Why |
|------|-----------------|-----|
| **Node.js** | 20.x LTS | Required by Next 15 |
| **npm / pnpm / yarn** | npm 9+, pnpm 9+, yarn 4+ | Package manager |
| **Stripe account** | — | Payments & webhooks |
| **GitHub / Vercel / Docker** | — | (pick one) deployment |

---

## 2 · Getting Started

```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo

# Install dependencies
npm install          # or: pnpm i  /  yarn

# Start the dev server (http://localhost:3000)
npm run dev

HTTPS in development (optional)
# Generates a local certificate (macOS/linux)
npm run dev:https     # wrapper around `ts-node server.ts`


3 · Environment Variables

Create .env.local in the project root.
Only the Stripe secrets are mandatory to run the build; everything else
falls back to stubs or dev defaults.
# ─────────── Core ───────────
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ─────────── Stripe ───────────
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_…
STRIPE_SECRET_KEY=sk_test_…          # used by server-only code
STRIPE_WEBHOOK_SECRET=whsec_…        # signature verification

# ─────────── NextAuth (optional) ───────────
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-256-bit-hex

# ─────────── Social Login (optional) ───────────
GOOGLE_CLIENT_ID=…
GOOGLE_CLIENT_SECRET=…
FACEBOOK_CLIENT_ID=…
FACEBOOK_CLIENT_SECRET=…
MICROSOFT_CLIENT_ID=…
MICROSOFT_CLIENT_SECRET=…
MICROSOFT_TENANT_ID=common


4 · Scripts
| Script              | What it does                             |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Hot-reload dev server (HTTP)             |
| `npm run dev:https` | Same, but with local TLS via `server.ts` |
| `npm run build`     | Production compile (`next build`)        |
| `npm start`         | Starts compiled output (`next start`)    |
| `npm run lint`      | ESLint + TypeScript                      |
| `npm run test`      | Jest / React-Testing-Library unit tests  |


5 · Authentication & Subscription Flow
5 · Authentication & Subscription Flow

User signs up / signs in via credentials or social provider
→ /api/auth/[...nextauth]
Visits pricing page
→ /pricing renders PricingTable with Stripe Prices.
Clicks Subscribe
→ /api/Subscription/create-checkout-session
returns a Stripe Checkout URL.
Stripe sends checkout.session.completed webhook
→ /api/webhooks/stripe verifies signature with
STRIPE_WEBHOOK_SECRET and grants access.
Subsequent invoice.payment_* or customer.subscription.* events keep the
user’s entitlement in sync.
Webhook URL in dashboard:
https://<your-domain>/api/webhooks/stripe

6 · Deployment Options

Vercel (1 click)
Import the repo → Vercel dashboard.
Add env vars under Settings ▸ Environment Variables.
Click Deploy – Vercel runs npm run build automatically.


Docker
docker build -t my-next-app .
docker run -p 3000:3000 \
  -e STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY \
  -e STRIPE_WEBHOOK_SECRET=$STRIPE_WEBHOOK_SECRET \
  my-next-app

Generic CI (GitHub Actions)

name: Build & Test
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
        env:
          STRIPE_SECRET_KEY: ${{ secrets.STRIPE_SECRET_KEY }}
          STRIPE_WEBHOOK_SECRET: ${{ secrets.STRIPE_WEBHOOK_SECRET }}

7 · Important Files

| Path                                       | Purpose                                |
| ------------------------------------------ | -------------------------------------- |
| `src/app/page.tsx`                         | Streaming landing page (App Router)    |
| `src/app/api/webhooks/stripe/route.ts`     | Stripe webhook handler                 |
| `src/components/home/*`                    | Hero, tech showcase, testimonials, CTA |
| `src/components/Shared/LoadingSection.tsx` | Skeleton for lazy imports              |
| `middleware.ts`                            | Route protection & token refresh       |
| `theme/`                                   | MUI & Emotion theme providers          |

8 · Security Checklist

✅ NEXTAUTH_SECRET is 256-bit and stored in secrets manager.
✅ STRIPE_WEBHOOK_SECRET matches dashboard value.
✅ HTTPS enforced in prod (Vercel auto-TLS or reverse-proxy).
✅ CSP & Referrer-Policy headers set in next.config.js.
✅ GitHub Dependabot alerts monitored weekly.


9 · FAQ & Troubleshooting

| Problem                                                             | Fix                                                                                          |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **“Neither apiKey nor config.authenticator provided” during build** | Confirm `STRIPE_SECRET_KEY` present for the build or use lazy Stripe init (already in code). |
| **Webhook signature failed**                                        | Ensure dashboard secret matches `.env` and your tunnelling tool (if any) forwards raw body.  |
| **Social login 400 redirect\_uri\_mismatch**                        | Update OAuth console to point to the correct domain (including protocol and trailing slash). |
| **Auth token expired mid-session**                                  | Inspect `middleware.ts` – refresh token if `exp < now + 30 s`.                               |


Contributing
Fork → Branch → PR.
Conventional commits (feat:, fix:, etc.).
CI must pass lint, tests, and build.


Happy shipping!