// ===============================
// File: src/app/api/checkout/create-payment-intent/route.ts
// ===============================

"use server";

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma"; // your Prisma client helper

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

// 🔒 Hard‑coded catalogue for demo ‑ replace with DB query.
// Prices are MINOR UNITS (cents) for Stripe.
const catalogue: Record<string, { title: string; amount: number; currency: string }> = {
  "5": { title: ".NET Security Best Practices Handbook", amount: 2999, currency: "usd" },
  "6": { title: "Next.js Auth Starter Template", amount: 1999, currency: "usd" },
  "7": { title: "Advanced .NET Security Masterclass", amount: 14999, currency: "usd" },
};

export async function POST(request: Request) {
  const { resourceId } = await request.json();

  // TODO 👉 Protect with your auth layer
  const userId = "demo-user"; // placeholder

  if (!resourceId || typeof resourceId !== "string") {
    return NextResponse.json({ message: "Invalid resourceId" }, { status: 400 });
  }

  const resource = catalogue[resourceId];
  if (!resource) {
    return NextResponse.json({ message: "Resource not found or not purchasable" }, { status: 404 });
  }

  // 🔑  Idempotency key prevents duplicate PIs on refresh / retry
  const idemKey = `${userId}_${resourceId}_pi`;

  // Check if we already created a PI for this idemKey and it’s still incomplete
  const existing = await prisma.resourceAccess.findFirst({
    where: { grantedByPaymentIntentId: idemKey },
  });
  if (existing) {
    return NextResponse.json({ message: "Resource already purchased" }, { status: 409 });
  }

  const paymentIntent = await stripe.paymentIntents.create(
    {
      amount: resource.amount,
      currency: resource.currency,
      metadata: { resourceId, userId },
      automatic_payment_methods: { enabled: true },
    },
    { idempotencyKey: idemKey }
  );

  return NextResponse.json({ clientSecret: paymentIntent.client_secret, displayPrice: `$${(resource.amount / 100).toFixed(2)}` });
}
