// File: utils/cart.ts
/**

  
  /**
   * Add item to cart
   */

  import { CartItem } from '../types/haworks.types';


  export function addToCart(item: CartItem): void {
    try {
      // Get existing cart
      const cart = getCart();
      
      // Check if item already exists
      const existingItemIndex = cart.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        cart[existingItemIndex].quantity += item.quantity;
      } else {
        // Add new item
        cart.push(item);
      }
      
      // Save updated cart
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  }
  
  /**
   * Get all cart items
   */
  export function getCart(): CartItem[] {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Failed to get cart:', error);
      return [];
    }
  }
  
  /**
   * Clear the cart
   */
  export function clearCart(): void {
    localStorage.removeItem('cart');
  }
  
  /**
   * Get cart total
   */
  export function getCartTotal(): number {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  /**
   * Get cart item count
   */
  export function getCartItemCount(): number {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }