// File: pages/store/checkout/index.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { 
  CreditCard, 
  ChevronRight, 
  Check, 
  ShoppingCart, 
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import MainLayout from '../../../components/layouts/MainLayout';
import { useAuth } from '../../../contexts/AuthContext';
import { useCheckout } from '../../../contexts/CheckoutContext';
import { getCart } from '../../../utils/cart';
import styles from '../../../styles/store/CheckoutPage.module.css';
import { ProductDto , GuestCheckoutInfo } from '../../../types/haworks.types';



export default function CheckoutPage() {
  const router = useRouter();
  const { user, isAuthenticated, isAuthLoading: authLoading } = useAuth();
  const { cartItems, cartTotal, isProcessing, error, checkout } = useCheckout();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
    phone: '',
    saveInfo: true
  });
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Checkout steps
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent('/store/checkout')}`);
    }
  }, [authLoading, isAuthenticated, router]);
  
  // Pre-fill form data if user is logged in
  useEffect(() => {
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        email: user.email || prevData.email,
        // Safely access profile properties with optional chaining
        firstName: user.profile?.firstName || prevData.firstName,
        lastName: user.profile?.lastName || prevData.lastName,
        address: user.profile?.address || prevData.address,
        city: user.profile?.city || prevData.city,
        state: user.profile?.state || prevData.state,
        postalCode: user.profile?.postalCode || prevData.postalCode,
        country: user.profile?.country || prevData.country,
        phone: user.profile?.phone || prevData.phone
      }));
    }
  }, [user]);
  
  // Redirect to cart if empty
  useEffect(() => {
    if (!authLoading && cartItems.length === 0) {
      router.push('/store/cart');
    }
  }, [authLoading, cartItems, router]);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Validate shipping form
  const validateShippingForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'postalCode', 'country'];
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Postal code validation
    if (formData.postalCode && formData.country === 'US' && !/^\d{5}(-\d{4})?$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Please enter a valid ZIP code';
    }
    
    // Phone validation
    if (formData.phone && !/^\+?[\d\s()-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle shipping form submission
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    if (validateShippingForm()) {
      // Move to next step
      setCurrentStep(2);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Handle payment method selection
  const handlePaymentMethodSelect = (method: 'card' | 'paypal') => {
    setPaymentMethod(method);
  };
  
  // Handle checkout submission
// Handle checkout submission
const handleCheckout = async () => {
    try {
      // Check if cart contains digital-only products
      const hasPhysicalProducts = cartItems.some(item => !item.isSubscription);
      
      // Prepare guest checkout info based on form data
      const guestInfo: GuestCheckoutInfo = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
        phone: formData.phone
      };
      
      // For digital-only orders, you might want to skip shipping info requirements
      // This would require modifying your validation logic elsewhere
      
      // Save shipping info if requested (and user is logged in)
      if (formData.saveInfo && user) {
        try {
          // This would be implemented with your user profile service
          // Example implementation:
          await fetch('/api/UserProfile/shipping-info', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            },
            body: JSON.stringify({
              firstName: formData.firstName,
              lastName: formData.lastName,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              postalCode: formData.postalCode,
              country: formData.country,
              phone: formData.phone || ''
            }),
          });
          console.log('Shipping info saved to user profile');
        } catch (saveError) {
          console.error('Failed to save shipping info:', saveError);
          // Continue with checkout even if saving shipping info fails
        }
      }
      
      // Process checkout with correct parameter order
      // 1. guestInfo object (GuestCheckoutInfo type)
      // 2. redirectPath (string)
      // 3. saveShippingInfo (boolean)
      await checkout(
        guestInfo,                  // First parameter: GuestCheckoutInfo
        '/store/checkout/success',  // Second parameter: redirect path
        formData.saveInfo           // Third parameter: whether to save shipping info
      );
      
    } catch (err) {
      console.error('Checkout error:', err);
      // Error will be handled by the checkout context
      
      // You could add additional error handling here if needed
      // For example, display a more user-friendly error message
      // or track errors for analytics
    }
  };
  
  // Render loading state while auth is being checked
  if (authLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <Head>
        <title>Checkout | Your Store</title>
        <meta name="description" content="Complete your purchase" />
      </Head>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={styles.checkoutContainer}>
          {/* Checkout Steps */}
          <div className={styles.stepsContainer}>
            <div className={`${styles.step} ${currentStep >= 1 ? styles.active : ''} ${currentStep > 1 ? styles.completed : ''}`}>
              <div className={styles.stepNumber}>
                {currentStep > 1 ? <Check size={16} /> : '1'}
              </div>
              <span className={styles.stepLabel}>Shipping</span>
            </div>
            <div className={styles.stepConnector}></div>
            <div className={`${styles.step} ${currentStep >= 2 ? styles.active : ''} ${currentStep > 2 ? styles.completed : ''}`}>
              <div className={styles.stepNumber}>
                {currentStep > 2 ? <Check size={16} /> : '2'}
              </div>
              <span className={styles.stepLabel}>Payment</span>
            </div>
            <div className={styles.stepConnector}></div>
            <div className={`${styles.step} ${currentStep >= 3 ? styles.active : ''}`}>
              <div className={styles.stepNumber}>3</div>
              <span className={styles.stepLabel}>Review</span>
            </div>
          </div>
          
          {/* Main Content */}
          <div className={styles.contentContainer}>
            <div className={styles.formContainer}>
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <div className={styles.shippingStep}>
                  <h2 className={styles.sectionTitle}>Shipping Information</h2>
                  
                  <form onSubmit={handleShippingSubmit} className={styles.shippingForm}>
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label htmlFor="email" className={styles.fieldLabel}>Email Address*</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        />
                        {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
                      </div>
                    </div>
                    
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label htmlFor="firstName" className={styles.fieldLabel}>First Name*</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                        />
                        {errors.firstName && <div className={styles.errorMessage}>{errors.firstName}</div>}
                      </div>
                      
                      <div className={styles.formField}>
                        <label htmlFor="lastName" className={styles.fieldLabel}>Last Name*</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                        />
                        {errors.lastName && <div className={styles.errorMessage}>{errors.lastName}</div>}
                      </div>
                    </div>
                    
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label htmlFor="address" className={styles.fieldLabel}>Address*</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
                        />
                        {errors.address && <div className={styles.errorMessage}>{errors.address}</div>}
                      </div>
                    </div>
                    
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label htmlFor="city" className={styles.fieldLabel}>City*</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
                        />
                        {errors.city && <div className={styles.errorMessage}>{errors.city}</div>}
                      </div>
                      
                      <div className={styles.formField}>
                        <label htmlFor="state" className={styles.fieldLabel}>State/Province</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={styles.input}
                        />
                      </div>
                    </div>
                    
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label htmlFor="postalCode" className={styles.fieldLabel}>Postal Code*</label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className={`${styles.input} ${errors.postalCode ? styles.inputError : ''}`}
                        />
                        {errors.postalCode && <div className={styles.errorMessage}>{errors.postalCode}</div>}
                      </div>
                      
                      <div className={styles.formField}>
                        <label htmlFor="country" className={styles.fieldLabel}>Country*</label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className={`${styles.select} ${errors.country ? styles.inputError : ''}`}
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="GB">United Kingdom</option>
                          <option value="AU">Australia</option>
                        </select>
                        {errors.country && <div className={styles.errorMessage}>{errors.country}</div>}
                      </div>
                    </div>
                    
                    <div className={styles.formRow}>
                      <div className={styles.formField}>
                        <label htmlFor="phone" className={styles.fieldLabel}>Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                        />
                        {errors.phone && <div className={styles.errorMessage}>{errors.phone}</div>}
                      </div>
                    </div>
                    
                    <div className={styles.formRow}>
                      <div className={`${styles.formField} ${styles.checkboxField}`}>
                        <input
                          type="checkbox"
                          id="saveInfo"
                          name="saveInfo"
                          checked={formData.saveInfo}
                          onChange={handleInputChange}
                          className={styles.checkbox}
                        />
                        <label htmlFor="saveInfo" className={styles.checkboxLabel}>
                          Save this information for next time
                        </label>
                      </div>
                    </div>
                    
                    <div className={styles.formActions}>
                      <Link href="/store/cart">
                        <button type="button" className={styles.backButton}>
                          <ArrowLeft size={16} />
                          Back to Cart
                        </button>
                      </Link>
                      <button type="submit" className={styles.continueButton}>
                        Continue to Payment
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Step 2: Payment Method */}
              {currentStep === 2 && (
                <div className={styles.paymentStep}>
                  <h2 className={styles.sectionTitle}>Payment Method</h2>
                  
                  <div className={styles.paymentMethods}>
                    <div 
                      className={`${styles.paymentOption} ${paymentMethod === 'card' ? styles.selected : ''}`}
                      onClick={() => handlePaymentMethodSelect('card')}
                    >
                      <div className={styles.paymentRadio}>
                        <div className={paymentMethod === 'card' ? styles.radioSelected : ''}></div>
                      </div>
                      <div className={styles.paymentIconWrapper}>
                        <CreditCard size={24} />
                      </div>
                      <div className={styles.paymentLabel}>
                        Credit / Debit Card
                      </div>
                    </div>
                    
                    <div 
                      className={`${styles.paymentOption} ${paymentMethod === 'paypal' ? styles.selected : ''}`}
                      onClick={() => handlePaymentMethodSelect('paypal')}
                    >
                      <div className={styles.paymentRadio}>
                        <div className={paymentMethod === 'paypal' ? styles.radioSelected : ''}></div>
                      </div>
                      <div className={styles.paymentIconWrapper}>
                        <div className={styles.paypalIcon}>PayPal</div>
                      </div>
                      <div className={styles.paymentLabel}>
                        PayPal
                      </div>
                    </div>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div className={styles.cardPaymentForm}>
                      <p className={styles.securePaymentNote}>
                        <span className={styles.lockIcon}>🔒</span> Secure payment processed by Stripe
                      </p>
                      <p className={styles.paymentNote}>
                        You will be redirected to our secure payment provider to complete your payment.
                      </p>
                    </div>
                  )}
                  
                  {paymentMethod === 'paypal' && (
                    <div className={styles.paypalPaymentInfo}>
                      <p className={styles.paymentNote}>
                        You will be redirected to PayPal to complete your payment.
                      </p>
                    </div>
                  )}
                  
                  <div className={styles.formActions}>
                    <button 
                      type="button" 
                      className={styles.backButton}
                      onClick={() => setCurrentStep(1)}
                    >
                      <ArrowLeft size={16} />
                      Back to Shipping
                    </button>
                    <button 
                      type="button" 
                      className={styles.continueButton}
                      onClick={() => setCurrentStep(3)}
                    >
                      Review Order
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <div className={styles.reviewStep}>
                  <h2 className={styles.sectionTitle}>Review Your Order</h2>
                  
                  <div className={styles.reviewSection}>
                    <div className={styles.sectionHeader}>
                      <h3 className={styles.subsectionTitle}>Shipping Information</h3>
                      <button 
                        type="button" 
                        className={styles.editButton}
                        onClick={() => setCurrentStep(1)}
                      >
                        Edit
                      </button>
                    </div>
                    <div className={styles.reviewInfo}>
                      <p>{formData.firstName} {formData.lastName}</p>
                      <p>{formData.address}</p>
                      <p>{formData.city}, {formData.state} {formData.postalCode}</p>
                      <p>{formData.country}</p>
                      <p>{formData.email}</p>
                      {formData.phone && <p>{formData.phone}</p>}
                    </div>
                  </div>
                  
                  <div className={styles.reviewSection}>
                    <div className={styles.sectionHeader}>
                      <h3 className={styles.subsectionTitle}>Payment Method</h3>
                      <button 
                        type="button" 
                        className={styles.editButton}
                        onClick={() => setCurrentStep(2)}
                      >
                        Edit
                      </button>
                    </div>
                    <div className={styles.reviewInfo}>
                      <p>{paymentMethod === 'card' ? 'Credit / Debit Card' : 'PayPal'}</p>
                    </div>
                  </div>
                  
                  {/* Order Items */}
                  <div className={styles.reviewSection}>
                    <h3 className={styles.subsectionTitle}>Order Items</h3>
                    <div className={styles.orderItems}>
                      {cartItems.map((item) => (
                        <div key={item.id} className={styles.orderItem}>
                          <div className={styles.itemImageContainer}>
                            <div className={styles.itemImage} style={{ backgroundImage: `url(${item.image})` }}></div>
                          </div>
                          <div className={styles.itemDetails}>
                            <h4 className={styles.itemName}>{item.name}</h4>
                            <div className={styles.itemMeta}>
                              <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                              <span className={styles.itemQuantity}>Qty: {item.quantity}</span>
                            </div>
                          </div>
                          <div className={styles.itemTotal}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Error message */}
                  {error && (
                    <div className={styles.errorAlert}>
                      <AlertCircle size={20} />
                      <span>{error}</span>
                    </div>
                  )}
                  
                  <div className={styles.formActions}>
                    <button 
                      type="button" 
                      className={styles.backButton}
                      onClick={() => setCurrentStep(2)}
                    >
                      <ArrowLeft size={16} />
                      Back to Payment
                    </button>
                    <button 
                      type="button" 
                      className={`${styles.continueButton} ${styles.placeOrderButton}`}
                      onClick={handleCheckout}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className={styles.spinner}></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          Place Order
                          <ChevronRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Order Summary */}
            <div className={styles.orderSummary}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>
              
              <div className={styles.summaryContent}>
                <div className={styles.summaryItems}>
                  {cartItems.map((item) => (
                    <div key={item.id} className={styles.summaryItem}>
                      <div className={styles.summaryItemInfo}>
                        <div className={styles.summaryItemQuantity}>{item.quantity}×</div>
                        <div className={styles.summaryItemName}>{item.name}</div>
                      </div>
                      <div className={styles.summaryItemPrice}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className={styles.summaryDivider}></div>
                
                <div className={styles.summaryTotals}>
                  <div className={styles.summaryRow}>
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Tax</span>
                    <span>Calculated at next step</span>
                  </div>
                  <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}