// File: pages/store/checkout/error.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { AlertCircle, ArrowLeft, ShoppingCart, LifeBuoy } from 'lucide-react';
import MainLayout from '../../../components/layouts/MainLayout';
import styles from '../../../styles/store/CheckoutError.module.css';

export default function CheckoutErrorPage() {
  const router = useRouter();
  const { code, message } = router.query;
  
  // Log error details for support
  useEffect(() => {
    if (router.isReady && code) {
      console.error(`Checkout error: ${code} - ${message || 'Unknown error'}`);
      
      // Could also send to analytics or error tracking service
      // Example: trackErrorEvent('checkout_error', { code, message });
    }
  }, [router.isReady, code, message]);
  
  // Determine error message to display based on error code
  const getErrorMessage = () => {
    if (!code) return 'There was a problem processing your payment.';
    
    switch(code) {
      case 'card_declined':
        return 'Your card was declined. Please try a different payment method.';
      case 'expired_card':
        return 'Your card has expired. Please try a different card.';
      case 'insufficient_funds':
        return 'Your card has insufficient funds. Please try a different payment method.';
      case 'processing_error':
        return 'An error occurred while processing your payment. Please try again.';
      case 'authentication_required':
        return 'Additional authentication is required. Please try again and follow the authentication steps.';
      case 'payment_intent_canceled':
        return 'The payment process was canceled. Please try again.';
      case 'session_expired':
        return 'Your checkout session has expired. Please try again.';
      default:
        return message as string || 'An unexpected error occurred. Please try again or contact customer support.';
    }
  };
  
  // Determine recommended action based on error code
  const getRecommendedAction = () => {
    if (!code) return 'tryAgain';
    
    switch(code) {
      case 'card_declined':
      case 'expired_card':
      case 'insufficient_funds':
        return 'differentPayment';
      case 'processing_error':
      case 'authentication_required':
      case 'payment_intent_canceled':
      case 'session_expired':
        return 'tryAgain';
      default:
        return 'contact';
    }
  };
  
  const recommendedAction = getRecommendedAction();

  return (
    <MainLayout>
      <Head>
        <title>Payment Error | Your Store</title>
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
                
                <h1 className="text-3xl font-extrabold text-gray-900">Payment Unsuccessful</h1>
                <p className="mt-4 text-lg text-gray-600">{getErrorMessage()}</p>
                
                <div className={styles.errorDetails}>
                  {recommendedAction === 'differentPayment' && (
                    <div className={styles.recommendationBox}>
                      <h3 className={styles.recommendationTitle}>What to do next:</h3>
                      <ul className={styles.recommendationList}>
                        <li>Check if your card details were entered correctly</li>
                        <li>Make sure your card has sufficient funds</li>
                        <li>Try a different payment method</li>
                        <li>Contact your bank if the problem persists</li>
                      </ul>
                    </div>
                  )}
                  
                  {recommendedAction === 'tryAgain' && (
                    <div className={styles.recommendationBox}>
                      <h3 className={styles.recommendationTitle}>What to do next:</h3>
                      <ul className={styles.recommendationList}>
                        <li>Try submitting your payment again</li>
                        <li>Ensure you complete any required authentication steps</li>
                        <li>Check your internet connection</li>
                        <li>If the problem persists, try a different payment method</li>
                      </ul>
                    </div>
                  )}
                  
                  {recommendedAction === 'contact' && (
                    <div className={styles.recommendationBox}>
                      <h3 className={styles.recommendationTitle}>What to do next:</h3>
                      <p className={styles.recommendationText}>
                        There seems to be a technical issue with our payment system. Please contact our customer support team for assistance.
                      </p>
                    </div>
                  )}
                  
                  {code && (
                    <div className={styles.errorCode}>
                      <p>Error code: <span>{code}</span></p>
                    </div>
                  )}
                </div>
                
                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4">
                  {recommendedAction !== 'contact' && (
                    <Link href="/store/checkout">
                      <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <ArrowLeft size={18} className="mr-2" />
                        Return to Checkout
                      </a>
                    </Link>
                  )}
                  
                  <Link href="/store/cart">
                    <a className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <ShoppingCart size={18} className="mr-2" />
                      Return to Cart
                    </a>
                  </Link>
                  
                  {recommendedAction === 'contact' && (
                    <Link href="/store/contact">
                      <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <LifeBuoy size={18} className="mr-2" />
                        Contact Support
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}