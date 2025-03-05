import { useState } from 'react';
import Head from 'next/head';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import PricingTable from '../components/subscription/PricingTable';
import { useAuth } from '../contexts/AuthContext';

// Sample pricing plans
const plans = [
  {
    id: 'basic',
    name: 'Basic',
    priceId: 'price_basic_monthly',
    price: 9.99,
    description: 'Perfect for individuals just getting started',
    features: [
      'Access to basic content',
      'Standard support',
      'Up to 3 projects',
      'Basic analytics'
    ],
    buttonText: 'Start Basic',
  },
  {
    id: 'pro',
    name: 'Professional',
    priceId: 'price_pro_monthly',
    price: 19.99,
    description: 'Great for professionals and teams',
    features: [
      'Access to all content',
      'Priority support',
      'Unlimited projects',
      'Advanced analytics',
      'Team collaboration'
    ],
    isPopular: true,
    buttonText: 'Start Pro',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceId: 'price_enterprise_monthly',
    price: 49.99,
    description: 'For large organizations with advanced needs',
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced security features',
      'Enterprise SLA',
      'Dedicated support line'
    ],
    buttonText: 'Contact Sales',
  }
];

export default function SubscriptionPage() {
  const { isSubscribed } = useAuth();

  return (
    <ProtectedRoute>
      <Head>
        <title>Subscription Plans | YourApp</title>
        <meta name="description" content="Choose a subscription plan" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="py-12">
          {isSubscribed ? (
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-5">
                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-extrabold text-gray-900">You're subscribed!</h2>
                  <p className="mt-2 text-lg text-gray-600">
                    You already have an active subscription. You can manage your subscription from your account settings.
                  </p>
                  <div className="mt-6">
                    <a
                      href="/account/subscription"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Manage Subscription
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <PricingTable plans={plans} />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}