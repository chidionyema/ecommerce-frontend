// src/context/ProductContext.tsx

import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import { Product, ProductState } from '../types/types';
import axios from 'axios';

// Define action types for product state management
type Action =
  | { type: 'SET_PRODUCTS'; products: Product[]; totalProducts: number }
  | { type: 'ADD_PRODUCT'; product: Product }
  | { type: 'UPDATE_PRODUCT'; product: Product }
  | { type: 'DELETE_PRODUCT'; id: string }
  | { type: 'SET_SINGLE_PRODUCT'; product: Product };

// Initial state for the product context
const initialState: ProductState = {
  products: [],
  totalProducts: 0,
};

// Create the ProductContext with state and dispatch
const ProductContext = createContext<{
  state: ProductState;
  dispatch: React.Dispatch<Action>;
  fetchProducts: () => Promise<void>;
  addProduct: (formData: FormData) => Promise<void>;
  updateProduct: (productId: string, formData: FormData) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}>({
  state: initialState,
  dispatch: () => undefined,
  fetchProducts: async () => {},
  addProduct: async () => {},
  updateProduct: async () => {},
  deleteProduct: async () => {},
});

// Reducer function to handle product state changes based on actions
const productReducer = (state: ProductState, action: Action): ProductState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.products, totalProducts: action.totalProducts };
    case 'SET_SINGLE_PRODUCT':
      return { ...state, products: [action.product] };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.product], totalProducts: state.totalProducts + 1 };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.product.id ? action.product : product
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.id),
        totalProducts: state.totalProducts - 1,
      };
    default:
      return state;
  }
};

// ProductProvider component that wraps children components with ProductContext
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Fetch products from the backend API
  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('https://api.local.ritualworks.com/api/products');
      dispatch({ type: 'SET_PRODUCTS', products: response.data, totalProducts: response.data.length });
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  // Add a product to the backend and update context
  const addProduct = async (formData: FormData) => {
    try {
      const response = await axios.post<Product>('https://api.local.ritualworks.com/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch({ type: 'ADD_PRODUCT', product: response.data });
    } catch (error) {
      console.error('Failed to add product:', error);
      throw error;
    }
  };

  // Update a product in the backend and update context
  const updateProduct = async (productId: string, formData: FormData) => {
    try {
      const response = await axios.put<Product>(
        `https://api.local.ritualworks.com/api/products/${productId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      dispatch({ type: 'UPDATE_PRODUCT', product: response.data });
    } catch (error) {
      console.error('Failed to update product:', error);
      throw error;
    }
  };

  // Delete a product from the backend and update context
  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`https://api.local.ritualworks.com/api/products/${id}`);
      dispatch({ type: 'DELETE_PRODUCT', id });
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component is mounted
  }, []);

  return (
    <ProductContext.Provider value={{ state, dispatch, fetchProducts, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook to access the ProductContext in any component
export const useProduct = () => useContext(ProductContext);
