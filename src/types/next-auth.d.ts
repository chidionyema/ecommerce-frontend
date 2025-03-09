// File: types/next-auth.d.ts
// Type definitions for NextAuth.js to include our custom properties
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Extend the built-in session types
   */
  interface Session extends DefaultSession {
    accessToken: string;
    refreshToken: string;
    expires: string;
    isSubscribed: boolean;
    error?: string;
    user: {
      id: string;
      isSubscribed: boolean;
    } & DefaultSession['user'];
  }

  /**
   * Extend the built-in user types
   */
  interface User extends DefaultUser {
    accessToken?: string;
    refreshToken?: string;
    expires?: string;
    accessTokenExpires?: number;
    isSubscribed?: boolean;
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extend the built-in JWT types
   */
  interface JWT extends DefaultJWT {
    accessToken?: string;
    refreshToken?: string;
    expires?: string;
    accessTokenExpires?: number;
    isSubscribed?: boolean;
    error?: string;
  }
}

// File: types/subscription.ts
// Types for subscription data and responses

/**
 * Subscription status from the API
 */
export interface SubscriptionStatusResponse {
  isSubscribed: boolean;
  message?: string;
}

/**
 * Detailed subscription information
 */
export interface SubscriptionDetails {
  id: string;
  planName: string;
  planPrice: number;
  currentPeriodEnd: string;
  status: 'active' | 'canceled' | 'past_due' | 'incomplete' | 'trialing';
  cancelAtPeriodEnd: boolean;
  paymentMethodLast4?: string;
  paymentMethodBrand?: string;
}

/**
 * Checkout session creation response
 */
export interface CreateCheckoutSessionResponse {
  sessionId: string;
  url?: string;
}

/**
 * Subscription update response
 */
export interface SubscriptionActionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Pricing plan information
 */
export interface PricingPlan {
  id: string;
  name: string;
  priceId: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  description: string;
  buttonText: string;
}