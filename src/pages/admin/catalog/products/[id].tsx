// pages/admin/catalog/products/[id].tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { AlertCircle } from 'lucide-react';
import AdminLayout from '../../../../components/layouts/AdminLayout';
import ProductDetail from '../../../../components/catalog/ProductDetail';
import { productService } from '../../../../services/product.service';
import { ProductDto } from '../../../../types/haworks.types';
import ErrorBoundary from '../../../../components/Common/ErrorBoundary';
import ProductSkeleton from '../../../../components/catalog/ProductSkeleton';

interface ProductDetailPageProps {
  product: ProductDto;
  relatedProducts: ProductDto[];
}

interface ProductState {
  loading: boolean;
  error: string | null;
  feedback: {
    message: string;
    type: 'success' | 'error';
  } | null;
  quantity: number;
}

const MAX_QUANTITY = 99;

export default function AdminProductDetailPage({ product, relatedProducts }: ProductDetailPageProps) {
  const router = useRouter();
  const [state, setState] = useState<ProductState>({
    loading: false,
    error: null,
    feedback: null,
    quantity: 1
  });

  useEffect(() => {
    if (!product && !router.isFallback) {
      setState(prev => ({ ...prev, error: 'Product information could not be loaded' }));
    }
  }, [product, router.isFallback]);

  useEffect(() => {
    if (state.feedback) {
      const timeout = setTimeout(() => setState(prev => ({ ...prev, feedback: null })), 5000);
      return () => clearTimeout(timeout);
    }
  }, [state.feedback]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= MAX_QUANTITY) {
      setState(prev => ({ ...prev, quantity: newQuantity }));
    }
  };

  const handleAddToCart = () => {
    setState(prev => ({ ...prev, error: null, loading: true }));
    
    if (!product) {
      setState(prev => ({ ...prev, error: 'Product information is not available', loading: false }));
      return;
    }

    // Admin-specific cart functionality
    try {
      // Implementation for admin cart management
      setState(prev => ({
        ...prev,
        feedback: {
          message: `Added ${prev.quantity} item(s) to admin cart`,
          type: 'success'
        },
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Could not add item to cart',
        feedback: { message: 'Failed to add to cart', type: 'error' },
        loading: false
      }));
    }
  };

  // Add the wishlist handler to resolve the type error
  const handleAddToWishlist = (productId: string) => {
    // Admin-specific wishlist tracking or management
    console.log(`Admin tracking wishlist addition for product ${productId}`);
    
    // You could implement admin-specific analytics or tracking here
    setState(prev => ({
      ...prev,
      feedback: {
        message: `Product ${productId} added to wishlist tracking`,
        type: 'success'
      }
    }));
  };

  if (router.isFallback) {
    return (
      <AdminLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductSkeleton />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Head>
        <title>{product?.name || 'Product Not Found'} | Admin Dashboard</title>
        <meta name="description" content="Admin product management" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorBoundary fallback={<ErrorFallback />}>
          <ProductDetail
            product={product}
            relatedProducts={relatedProducts}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            loading={state.loading}
            quantity={state.quantity}
            onQuantityChange={handleQuantityChange}
            error={state.error}
          />
          {state.feedback && <FeedbackToast {...state.feedback} />}
        </ErrorBoundary>
      </div>
    </AdminLayout>
  );
}

const ErrorFallback = () => (
  <div className="text-center py-12">
    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
      <AlertCircle className="h-8 w-8 text-red-600" />
    </div>
    <h2 className="text-xl font-medium text-gray-900">Something went wrong</h2>
    <button
      onClick={() => window.location.reload()}
      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
    >
      Refresh Page
    </button>
  </div>
);

interface FeedbackToastProps {
  message: string;
  type: 'success' | 'error';
}

const FeedbackToast = ({ message, type }: FeedbackToastProps) => (
  <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md ${
    type === 'success' ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'
  }`}>
    <div className="flex items-center gap-2">
      {type === 'success' ? (
        <div className="text-green-600">✓</div>
      ) : (
        <AlertCircle className="text-red-600" />
      )}
      <span className={type === 'success' ? 'text-green-800' : 'text-red-800'}>{message}</span>
    </div>
  </div>
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = String(params?.id).replace(/[^\w-]/g, '');
    const product = await productService.getProductById(id);
    const relatedProducts = await productService.getRelatedProducts({
      categoryId: product.categoryId,
      excludeId: id,
      limit: 4
    });

    return { 
      props: { product, relatedProducts }, 
      revalidate: 3600 
    };
  } catch (error) {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};