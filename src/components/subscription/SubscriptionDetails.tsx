import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../utils/dateUtils';

interface SubscriptionDetailsProps {
  onManage: () => void;
  onCancel: () => void;
}

export default function SubscriptionDetails({ onManage, onCancel }: SubscriptionDetailsProps) {
  const { subscriptionDetails } = useAuth();

  if (!subscriptionDetails) {
    return (
      <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
        <p className="text-gray-500">Loading subscription details...</p>
      </div>
    );
  }

  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Subscription</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between border-b border-gray-100 pb-3">
          <span className="text-gray-600">Plan</span>
          <span className="font-medium text-gray-900">{subscriptionDetails.planName}</span>
        </div>
        
        <div className="flex justify-between border-b border-gray-100 pb-3">
          <span className="text-gray-600">Price</span>
          <span className="font-medium text-gray-900">${subscriptionDetails.planPrice}/month</span>
        </div>
        
        <div className="flex justify-between border-b border-gray-100 pb-3">
          <span className="text-gray-600">Status</span>
          <span className={`font-medium ${
            subscriptionDetails.status === 'active' ? 'text-green-600' : 'text-gray-900'
          }`}>
            {subscriptionDetails.status.charAt(0).toUpperCase() + subscriptionDetails.status.slice(1)}
          </span>
        </div>
        
        <div className="flex justify-between border-b border-gray-100 pb-3">
          <span className="text-gray-600">Current period ends</span>
          <span className="font-medium text-gray-900">
            {formatDate(new Date(subscriptionDetails.currentPeriodEnd))}
          </span>
        </div>
        
        {subscriptionDetails.cancelAtPeriodEnd && (
          <div className="bg-yellow-50 p-4 rounded-md mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Cancellation Scheduled</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Your subscription will be canceled at the end of the current billing period. You will still have access until {formatDate(new Date(subscriptionDetails.currentPeriodEnd))}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4">
        <button
          onClick={onManage}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-3 sm:mb-0"
        >
          Update Payment Method
        </button>
        
        {!subscriptionDetails.cancelAtPeriodEnd && (
          <button
            onClick={onCancel}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel Subscription
          </button>
        )}
      </div>
    </div>
  );
}