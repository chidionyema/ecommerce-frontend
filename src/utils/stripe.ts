// src/utils/stripe.ts
// -----------------------------------------------------------------------------
// Centralised helpers for working with the Stripe SDK + webhook payloads
// -----------------------------------------------------------------------------
// Last updated: 2025-05-25

import Stripe from 'stripe';

/**
 * Input union covering every value the Stripe SDK can surface when referring
 * to a customer: a plain string ID, an expanded `Customer`, a `DeletedCustomer`,
 * or `null | undefined` when the association has been removed.
 */
export type StripeCustomerLike =
  | string
  | Stripe.Customer
  | Stripe.DeletedCustomer
  | null
  | undefined;

/**
 * Safely extract a Stripe customer ID (cus_…) no matter how the SDK represents
 * it. Returns `null` if the customer is deleted or missing.
 */
export const getCustomerId = (customer: StripeCustomerLike): string | null => {
  if (!customer) return null;
  if (typeof customer === 'string') return customer;
  if ('id' in customer && typeof customer.id === 'string') return customer.id;
  return null; // deleted customer or unexpected shape
};
