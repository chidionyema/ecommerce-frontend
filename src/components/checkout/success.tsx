import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { useAuth } from '../../contexts/AuthContext';

export default function CheckoutSuccessPage() {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, refreshSubscriptionStatus } = useAuth();
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!router.isReady || !token) return;
      
      setIsLoading(true);
      try {
        // For subscription checkouts, refresh the subscription status
        if (router.query.type === 'subscription') {
          await refreshSubscriptionStatus();
        }
        
        // Fetch order details if needed
        if (token && typeof token === 'string') {
          const response = await fetch(`/api/orders/verify?token=${encodeURIComponent(token)}`);
          
          if (response.ok) {
            const data = await response.json();
            setOrderDetails(data);
          }
        }
        
        // Clear cart for one-time purchases
        if (router.query.type !== 'subscription') {
          localStorage.removeItem('cart');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [router.isReady, token, router.query.type, refreshSubscriptionStatus]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Order Confirmed | Your Store</title>
        <meta name="description" content="Thank you for your purchase" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h1 className="text-3xl font-extrabold text-gray-900">Thank you for your order!</h1>
                <p className="mt-2 text-lg text-gray-600">
                  {router.query.type === 'subscription' 
                    ? 'Your subscription has been successfully activated.' 
                    : 'Your order has been confirmed and is now being processed.'}
                </p>
                
                {orderDetails && (
                  <div className="mt-8 border-t border-gray-200 pt-8">
                    <h2 className="text-xl font-medium text-gray-900">Order Summary</h2>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">Order ID: {orderDetails.orderId}</p>
                      <p className="mt-1 text-sm text-gray-600">Date: {new Date(orderDetails.date).toLocaleDateString()}</p>
                      <p className="mt-1 text-sm text-gray-600">Total: ${orderDetails.total.toFixed(2)}</p>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 sm:mt-10">
                  {router.query.type === 'subscription' ? (
                    <Link
                      href="/account/subscription"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Manage Your Subscription
                    </Link>
                  ) : (
                    <Link
                      href="/orders"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View Order History
                    </Link>
                  )}
                </div>
                
                <div className="mt-4">
                  <Link
                    href="/products"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}