// app/store/products/[id]/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle } from 'lucide-react';
import MainLayout from '../../../components/layouts/MainLayout';
import ProductDetail from '../../../components/catalog/ProductDetail';
import { productService } from '../../../services/product.service';
import { useCheckout } from '../../../contexts/CheckoutContext';
import { ProductDto } from '../../../types/haworks.types';
import ErrorBoundary from '../../../components/Common/ErrorBoundary';
import ProductSkeleton from '../../../components/catalog/ProductSkeleton';

// Client-side API fetching for fallback
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ritualworks.com';

const fetchProduct = async (id: string): Promise<ProductDto> => {
  const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
};

const fetchRelatedProducts = async (params: { categoryId: string; excludeId: string; limit: number }): Promise<ProductDto[]> => {
  const queryString = new URLSearchParams({
    categoryId: params.categoryId,
    excludeId: params.excludeId,
    limit: params.limit.toString()
  }).toString();
  
  const response = await fetch(`${API_BASE_URL}/api/products/related?${queryString}`);
  if (!response.ok) throw new Error('Failed to fetch related products');
  return response.json();
};

interface ProductDetailPageProps {
  params?: { id: string };
  product?: ProductDto | null;
  relatedProducts?: ProductDto[];
}

const sanitizeInput = (input: string) => input.replace(/[^\w-]/g, '');
const MAX_QUANTITY = 99;

export default function ProductDetailPage({ 
  params: serverParams, 
  product: initialProduct, 
  relatedProducts: initialRelatedProducts 
}: ProductDetailPageProps) {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string || serverParams?.id;
  const { addToCart } = useCheckout();
  
  const [product, setProduct] = useState<ProductDto | null>(initialProduct || null);
  const [relatedProducts, setRelatedProducts] = useState<ProductDto[]>(initialRelatedProducts || []);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Client-side data fetching when needed
  useEffect(() => {
    if ((!initialProduct) && id) {
      setLoading(true);
      setError(null);
      
      fetchProduct(id)
        .then(productData => {
          setProduct(productData);
          return fetchRelatedProducts({
            categoryId: productData.categoryId,
            excludeId: id,
            limit: 4
          });
        })
        .then(relatedData => {
          setRelatedProducts(relatedData);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading product:', error);
          setError('Product information could not be loaded');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, initialProduct]);

  // Loading state
  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductSkeleton />
        </div>
      </MainLayout>
    );
  }

  useEffect(() => {
    if (!product) setError('Product information could not be loaded');
  }, [product]);

  // Fixed useEffect cleanup function
  useEffect(() => {
    let timeoutId: number | undefined;
    
    if (feedback) {
      timeoutId = window.setTimeout(() => setFeedback(null), 5000);
    }
    
    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [feedback]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= MAX_QUANTITY) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    setError(null);
    
    if (!product) {
      setError('Product information is not available');
      return;
    }
    
    if (quantity <= 0 || quantity > MAX_QUANTITY) {
      setError(`Quantity must be between 1 and ${MAX_QUANTITY}`);
      return;
    }
    
    if (!product.unitPrice || product.unitPrice <= 0) {
      setError('Product price information is invalid');
      return;
    }
    
    setLoading(true);
    try {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.unitPrice,
        image: product.contents?.[0]?.url || '/images/placeholder.png',
        quantity,
        isSubscription: product.isSubscription || false
      });
      
      setFeedback({
        message: `Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`,
        type: 'success'
      });
    } catch (err) {
      console.error('Failed to add to cart:', err);
      setError('Could not add item to cart. Please try again.');
      setFeedback({ message: 'Failed to add to cart. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = (productId: string) => {
    try {
      console.log(`Added product ${productId} to wishlist`);
      setFeedback({ message: 'Added to wishlist', type: 'success' });
    } catch (err) {
      console.error('Failed to add to wishlist:', err);
      setFeedback({ message: 'Failed to add to wishlist', type: 'error' });
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorBoundary fallback={<ErrorFallback />}>
          {product ? (
            <ProductDetail
              product={product}
              relatedProducts={relatedProducts}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              loading={loading}
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              error={error}
            />
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
              <h2 className="text-xl font-medium text-gray-900">Product Not Found</h2>
              <p className="mt-2 text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
              <button
                onClick={() => router.push('/store/products')}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Browse Products
              </button>
            </div>
          )}
          
          {feedback && <FeedbackToast {...feedback} />}
        </ErrorBoundary>
      </div>
    </MainLayout>
  );
}

// Helper Components
const ErrorFallback = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-semibold text-gray-800">Something went wrong</h2>
    <p className="mt-2 text-gray-600">We couldn't load the product information. Please try again later.</p>
  </div>
);

const FeedbackToast = ({ message, type }: { message: string, type: 'success' | 'error' }) => (
  <div className={`fixed top-4 right-4 z-50 rounded-md shadow-md p-4 transition-opacity duration-500 ${
    type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
  }`}>
    <div className="flex items-center">
      {type === 'success' ? (
        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
      ) : (
        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
      )}
      <p className={`text-sm font-medium ${
        type === 'success' ? 'text-green-800' : 'text-red-800'
      }`}>
        {message}
      </p>
    </div>
  </div>
);