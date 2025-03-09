import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface PricingPlan {
  id: string;
  name: string;
  priceId: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  description: string;
  buttonText: string;
}

interface PricingTableProps {
  plans: PricingPlan[];
}

export default function PricingTable({ plans }: PricingTableProps) {
  const { user, subscribe, isSubscribed } = useAuth();

  const handleSubscribe = async (priceId: string) => {
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = `/login?redirect=${encodeURIComponent('/subscription')}`;
      return;
    }
    await subscribe(priceId);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose the right plan for you
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Unlock premium features and get the most out of our platform
          </p>
        </div>

        <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative p-8 bg-white border rounded-2xl shadow-sm flex flex-col ${
                plan.isPopular ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-200'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-0 bg-indigo-500 rounded-full px-4 py-1 text-white text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                {plan.description && (
                  <p className="mt-4 text-gray-500">{plan.description}</p>
                )}
                <p className="mt-6">
                  <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>

                <ul role="list" className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSubscribe(plan.priceId)}
                disabled={isSubscribed}
                className={`mt-8 block w-full py-3 px-6 rounded-md font-medium text-center ${
                  isSubscribed
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : plan.isPopular
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                }`}
              >
                {isSubscribed ? 'Already Subscribed' : plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
