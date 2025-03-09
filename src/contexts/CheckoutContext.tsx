// File: contexts/CheckoutContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from './AuthContext';
import { getCart, clearCart } from '../utils/cart';
import { CartItem} from '../types/haworks.types';
import {  CheckoutContextType, GuestCheckoutInfo, SubscriptionPlan, ProductDto } from '../types/haworks.types';


const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGuestCheckout, setIsGuestCheckout] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  // Load cart on initial render
  useEffect(() => {
    const loadCartFromStorage = () => {
      const items = getCart();
      setCartItems(items);
    };

    loadCartFromStorage();
    
    // Add event listener for storage changes (for multi-tab support)
    window.addEventListener('storage', loadCartFromStorage);
    
    return () => {
      window.removeEventListener('storage', loadCartFromStorage);
    };
  }, []);

  // Calculate cart totals
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Add item to cart
  const addItemToCart = useCallback((item: CartItem) => {
    setCartItems(prevItems => {
      // Check if item already exists
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      
      let newItems;
      if (existingItemIndex >= 0) {
        // Update existing item
        newItems = [...prevItems];
        newItems[existingItemIndex].quantity += item.quantity;
      } else {
        // Add new item
        newItems = [...prevItems, item];
      }
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((id: string) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => {
      const newItems = prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  }, []);

  // Clear the entire cart
  const emptyCart = useCallback(() => {
    setCartItems([]);
    clearCart();
  }, []);

  // Get CSRF token from meta tag
  const getCsrfToken = (): string => {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
  };

  // Regular checkout with items in cart
  const checkout = useCallback(async (guestInfo?: GuestCheckoutInfo, redirectPath = '/checkout/success', saveShippingInfo = false) => {
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    // If user is not authenticated and not doing guest checkout, prompt for login or guest checkout
    if (!user && !guestInfo && !isGuestCheckout) {
      router.push(`/store/checkout?redirect=${encodeURIComponent(router.asPath)}`);
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Convert cart items to checkout items
      const items = cartItems.map(item => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        imageUrl: item.image
      }));

      // If user wants to save shipping info, call the API
      if (saveShippingInfo && guestInfo && user) {
        try {
          const shippingInfo = {
            firstName: guestInfo.firstName,
            lastName: guestInfo.lastName,
            address: guestInfo.address,
            city: guestInfo.city,
            state: guestInfo.state,
            postalCode: guestInfo.postalCode,
            country: guestInfo.country,
            phone: guestInfo.phone || ''
          };
          
          await fetch('/api/UserProfile/shipping-info', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'X-CSRF-Token': getCsrfToken() 
            },
            body: JSON.stringify(shippingInfo),
          });
        } catch (err) {
          console.error('Failed to save shipping info:', err);
          // Continue with checkout even if saving shipping info fails
        }
      }

      // Prepare request body
      const requestBody: any = {
        items,
        type: 'one-time',
        redirectPath
      };

      // Add guest info if available
      if (!user && guestInfo) {
        requestBody.guestInfo = guestInfo;
        requestBody.isGuest = true;
      }

      // Get CSRF token
      const csrfToken = getCsrfToken();

      // Call our checkout API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Checkout failed');
      }

      const { sessionId } = await response.json();
      
      // Store guest checkout info in session storage for retrieval after redirect
      if (!user && guestInfo) {
        sessionStorage.setItem('guestCheckoutInfo', JSON.stringify(guestInfo));
      }
      
      // Store checkout transaction ID for verification
      sessionStorage.setItem('checkoutSessionId', sessionId);
      
      // Redirect to Stripe checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }
      
      await stripe.redirectToCheckout({ sessionId });
      
      // Clear cart (this will run if redirectToCheckout fails)
      emptyCart();
    } catch (error) {
      console.error('Checkout error:', error);
      
      // More detailed error handling
      if (error instanceof Response) {
        if (error.status === 401) {
          setError('Authentication required. Please log in or continue as guest.');
        } else if (error.status === 400) {
          setError('Invalid checkout information. Please check your details and try again.');
        } else {
          setError('Failed to process checkout. Please try again.');
        }
      } else {
        setError(error instanceof Error ? error.message : 'Failed to process checkout');
      }
      
      // Track error for analytics
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'checkout_error', {
          error_type: error instanceof Error ? error.name : 'unknown',
          error_message: error instanceof Error ? error.message : 'unknown error'
        });
      }
    } finally {
      setIsProcessing(false);
    }
  }, [user, cartItems, router, emptyCart, isGuestCheckout]);
// This function should accept cart items or product-quantity pairs
const directCheckout = useCallback(async (
    items: Array<CartItem | {productId: string, quantity: number}>, 
    guestInfo?: GuestCheckoutInfo, 
    redirectPath = '/checkout/success', 
    saveShippingInfo = false
  ) => {
    if (!items || items.length === 0) {
      setError('No products selected for checkout');
      return;
    }
  
    // If user is not authenticated and not doing guest checkout, prompt for login or guest checkout
    if (!user && !guestInfo && !isGuestCheckout) {
      router.push(`/store/checkout?redirect=${encodeURIComponent(router.asPath)}`);
      return;
    }
  
    setIsProcessing(true);
    setError(null);
  
    try {
      // Convert items to checkout items format
      const checkoutItems = items.map(item => {
        // Check if item is a CartItem or just {productId, quantity}
        if ('id' in item) {
          // It's a CartItem
          return {
            productId: item.id,
            quantity: item.quantity
          };
        } else {
          // It's a {productId, quantity} object
          return {
            productId: item.productId,
            quantity: item.quantity
          };
        }
      });
  
      // If user wants to save shipping info, call the API
      if (saveShippingInfo && guestInfo && user) {
        try {
          const shippingInfo = {
            firstName: guestInfo.firstName,
            lastName: guestInfo.lastName,
            address: guestInfo.address,
            city: guestInfo.city,
            state: guestInfo.state,
            postalCode: guestInfo.postalCode,
            country: guestInfo.country,
            phone: guestInfo.phone || ''
          };
          
          await fetch('/api/UserProfile/shipping-info', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'X-CSRF-Token': getCsrfToken() 
            },
            body: JSON.stringify(shippingInfo),
          });
        } catch (err) {
          console.error('Failed to save shipping info:', err);
          // Continue with checkout even if saving shipping info fails
        }
      }
  
      // Prepare request body
      const requestBody: any = {
        items: checkoutItems,
        type: 'one-time',
        redirectPath
      };
  
      // Add guest info if available
      if (!user && guestInfo) {
        requestBody.guestInfo = guestInfo;
        requestBody.isGuest = true;
      }
  
      // Get CSRF token
      const csrfToken = getCsrfToken();
  
      // Call our checkout API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Checkout failed');
      }
  
      const { sessionId } = await response.json();
      
      // Store guest checkout info in session storage for retrieval after redirect
      if (!user && guestInfo) {
        sessionStorage.setItem('guestCheckoutInfo', JSON.stringify(guestInfo));
      }
      
      // Store checkout transaction ID for verification
      sessionStorage.setItem('checkoutSessionId', sessionId);
      
      // Redirect to Stripe checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }
      
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Direct checkout error:', error);
      
      // More detailed error handling
      if (error instanceof Response) {
        if (error.status === 401) {
          setError('Authentication required. Please log in or continue as guest.');
        } else if (error.status === 400) {
          setError('Invalid checkout information. Please check your details and try again.');
        } else {
          setError('Failed to process checkout. Please try again.');
        }
      } else {
        setError(error instanceof Error ? error.message : 'Failed to process checkout');
      }
      
      // Track error for analytics
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'checkout_error', {
          error_type: error instanceof Error ? error.name : 'unknown',
          error_message: error instanceof Error ? error.message : 'unknown error'
        });
      }
    } finally {
      setIsProcessing(false);
    }
  }, [user, router, isGuestCheckout]);

  // Subscription checkout with specific plan
  const subscriptionCheckout = useCallback(async (plan: SubscriptionPlan, redirectPath = '/account/subscription') => {
    // Subscriptions still require authentication
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
      return;
    }

    if (!plan.priceId) {
      setError('Invalid subscription plan');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Get CSRF token
      const csrfToken = getCsrfToken();
      
      // Call our checkout API for subscriptions
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify({
          items: [{ priceId: plan.priceId }],
          type: 'subscription',
          redirectPath
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Subscription checkout failed');
      }

      const { sessionId } = await response.json();
      
      // Store checkout transaction ID for verification
      sessionStorage.setItem('checkoutSessionId', sessionId);
      
      // Redirect to Stripe checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }
      
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Subscription checkout error:', error);
      
      // More detailed error handling
      if (error instanceof Response) {
        if (error.status === 401) {
          setError('Authentication required for subscriptions. Please log in.');
        } else if (error.status === 400) {
          setError('Invalid subscription information. Please try again.');
        } else {
          setError('Failed to process subscription. Please try again.');
        }
      } else {
        setError(error instanceof Error ? error.message : 'Failed to process subscription');
      }
      
      // Track error for analytics
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'subscription_error', {
          error_type: error instanceof Error ? error.name : 'unknown',
          error_message: error instanceof Error ? error.message : 'unknown error'
        });
      }
    } finally {
      setIsProcessing(false);
    }
  }, [user, router]);

  // Provide context value
  const value: CheckoutContextType = {
    isProcessing,
    error,
    cartItems,
    cartTotal,
    cartCount,
    addToCart: addItemToCart,
    removeFromCart,
    updateQuantity,
    clearCart: emptyCart,
    checkout,
    directCheckout,
    subscriptionCheckout,
    isGuestCheckout,
    setIsGuestCheckout
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

// Custom hook to use the checkout context
export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  
  return context;
};