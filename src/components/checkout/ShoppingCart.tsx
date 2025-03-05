import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuth } from '../../contexts/AuthContext';
import CheckoutButton from './CheckoutButton';
import { CartItem } from '../../types/haworks.types';


export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Load cart items from localStorage
    const loadCart = () => {
      setIsLoading(true);
      try {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCart();
  }, []);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => {
      const updated = prevItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(updated));
      
      return updated;
    });
  };

  const removeItem = (itemId: string) => {
    setCartItems(prevItems => {
      const updated = prevItems.filter(item => item.id !== itemId);
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(updated));
      
      return updated;
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add items to your cart to proceed with checkout.</p>
        <button
          onClick={() => router.push('/products')}
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Shopping Cart</h2>
        
        <div className="divide-y divide-gray-200">
          {cartItems.map(item => (
            <div key={item.id} className="py-4 flex items-center">
              <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md overflow-hidden relative">
                <Image
                  src={item.image || '/images/placeholder.png'}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</p>
              </div>
              
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                
                <span className="mx-2 text-gray-700">{item.quantity}</span>
                
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 p-1 text-red-400 hover:text-red-500"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 border-t border-gray-200 pt-6">
          <div className="flex justify-between text-lg font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${calculateTotal().toFixed(2)}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          
          <div className="mt-6">
            <CheckoutButton
              label="Proceed to Checkout"
              products={cartItems.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity
              }))}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              redirectPath="/checkout/success"
            />
          </div>
          
          <div className="mt-4 flex justify-center text-sm text-gray-500">
            <p>
              or{' '}
              <button
                type="button"
                className="text-indigo-600 font-medium hover:text-indigo-500"
                onClick={() => router.push('/products')}
              >
                Continue Shopping<span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}