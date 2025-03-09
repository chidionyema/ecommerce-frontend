// File: pages/store/checkout/success.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { CheckCircle, Package, Truck, AlertCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import MainLayout from '../../../components/layouts/MainLayout';
import { useAuth } from '../../../contexts/AuthContext';
import { clearCart } from '../../../utils/cart';
import styles from '../../../styles/store/CheckoutSuccess.module.css';

export default function CheckoutSuccessPage() {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, refreshSubscriptionStatus } = useAuth();
  const router = useRouter();
  const { token, type, sessionId } = router.query;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!router.isReady) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // For subscription checkouts, refresh the subscription status
        if (type === 'subscription') {
          await refreshSubscriptionStatus();
        }
        
        // Verify and fetch order details
        const response = await fetch(`/api/orders/verify?${new URLSearchParams({
          token: token as string || '',
          sessionId: sessionId as string || ''
        }).toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to verify order');
        }
        
        const data = await response.json();
        setOrderDetails(data);
        
        // Clear cart for one-time purchases
        if (type !== 'subscription') {
          clearCart();
        }
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('We were unable to retrieve your order details. Please contact customer support for assistance.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [router.isReady, token, sessionId, type, refreshSubscriptionStatus]);

  // Generate order ID display
  const getOrderIdDisplay = () => {
    if (orderDetails?.orderId) {
      return orderDetails.orderId;
    } else if (sessionId) {
      // Use a portion of the session ID if no order ID is available
      return `TMP-${(sessionId as string).substring(0, 8)}`;
    }
    return 'Pending';
  };

  // Format order date
  const formatOrderDate = () => {
    if (orderDetails?.date) {
      return new Date(orderDetails.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get estimated delivery date (5-7 business days from now)
  const getEstimatedDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    
    // Add 7 business days (skipping weekends)
    let daysToAdd = 7;
    while (daysToAdd > 0) {
      deliveryDate.setDate(deliveryDate.getDate() + 1);
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) {
        daysToAdd--;
      }
    }
    
    return deliveryDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Head>
          <title>Order Error | Your Store</title>
          <meta name="robots" content="noindex" />
        </Head>
        
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  </div>
                  
                  <h1 className="text-3xl font-extrabold text-gray-900">There was a problem with your order</h1>
                  <p className="mt-2 text-lg text-gray-600">{error}</p>
                  
                  <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/store/cart">
                      <a className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Return to Cart
                      </a>
                    </Link>
                    <Link href="/store/contact">
                      <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-// File: pages/store/checkout/success.tsx (continued)
                        sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Contact Support
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Head>
        <title>Order Confirmed | Your Store</title>
        <meta name="description" content="Thank you for your purchase" />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success header */}
          <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
            <div className="p-6 sm:p-8">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                
                <h1 className="text-3xl font-extrabold text-gray-900">Thank you for your order!</h1>
                <p className="mt-2 text-lg text-gray-600">
                  {type === 'subscription' 
                    ? 'Your subscription has been successfully activated.' 
                    : 'Your order has been confirmed and is now being processed.'}
                </p>
                
                {user && user.email && (
                  <p className="mt-2 text-sm text-gray-500">
                    We've sent a confirmation email to <span className="font-medium">{user.email}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Order details */}
          <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Order Details</h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Order Number</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">{getOrderIdDisplay()}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">{formatOrderDate()}</p>
                </div>
                
                {orderDetails?.billingMethod && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">{orderDetails.billingMethod}</p>
                  </div>
                )}
                
                {orderDetails?.total && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">${orderDetails.total.toFixed(2)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Shipping information and timeline */}
          {type !== 'subscription' && (
            <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Shipping Information</h2>
              </div>
              
              <div className="p-6">
                {orderDetails?.shippingAddress ? (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Shipping Address</h3>
                    <p className="text-gray-900">{orderDetails.shippingAddress.name}</p>
                    <p className="text-gray-900">{orderDetails.shippingAddress.line1}</p>
                    {orderDetails.shippingAddress.line2 && (
                      <p className="text-gray-900">{orderDetails.shippingAddress.line2}</p>
                    )}
                    <p className="text-gray-900">
                      {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.postal_code}
                    </p>
                    <p className="text-gray-900">{orderDetails.shippingAddress.country}</p>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Shipping details will be included in your confirmation email.</p>
                )}
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Estimated Delivery</h3>
                  
                  <div className={styles.timeline}>
                    <div className={`${styles.timelineStep} ${styles.completed}`}>
                      <div className={styles.timelineIcon}>
                        <CheckCircle size={16} />
                      </div>
                      <div className={styles.timelineContent}>
                        <p className={styles.timelineTitle}>Order Placed</p>
                        <p className={styles.timelineDate}>{formatOrderDate()}</p>
                      </div>
                    </div>
                    
                    <div className={styles.timelineConnector}></div>
                    
                    <div className={styles.timelineStep}>
                      <div className={styles.timelineIcon}>
                        <Package size={16} />
                      </div>
                      <div className={styles.timelineContent}>
                        <p className={styles.timelineTitle}>Processing</p>
                        <p className={styles.timelineDate}>1-2 business days</p>
                      </div>
                    </div>
                    
                    <div className={styles.timelineConnector}></div>
                    
                    <div className={styles.timelineStep}>
                      <div className={styles.timelineIcon}>
                        <Truck size={16} />
                      </div>
                      <div className={styles.timelineContent}>
                        <p className={styles.timelineTitle}>Delivery</p>
                        <p className={styles.timelineDate}>Estimated {getEstimatedDeliveryDate()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Order Items */}
          {orderDetails?.items && orderDetails.items.length > 0 && (
            <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Order Items</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {orderDetails.items.map((item: any) => (
                  <div key={item.id} className="p-6 flex items-center">
                    {item.image && (
                      <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-md overflow-hidden mr-4">
                        <img src={item.image} alt={item.name} className="w-full h-full object-center object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-gray-900 truncate">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <p className="text-base font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Next steps */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link href="/store/orders">
              <a className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                View Order History
              </a>
            </Link>
            <Link href="/store/products">
              <a className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Continue Shopping
                <ArrowRight size={18} className="ml-2" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}