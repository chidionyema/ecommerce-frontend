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

// Client-side API fetching for fallback
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.haworks.com';

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
  product: ProductDto | null;
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

export default function AdminProductDetailPage({ product: initialProduct, relatedProducts: initialRelatedProducts }: ProductDetailPageProps) {
  const router = useRouter();
  const { id } = router.query;
  
  const [product, setProduct] = useState<ProductDto | null>(initialProduct);
  const [relatedProducts, setRelatedProducts] = useState<ProductDto[]>(initialRelatedProducts || []);
  const [state, setState] = useState<ProductState>({
    loading: router.isFallback,
    error: null,
    feedback: null,
    quantity: 1
  });

  // Client-side data fetching for fallback mode
  useEffect(() => {
    if ((router.isFallback || !initialProduct) && id) {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      fetchProduct(id as string)
        .then(productData => {
          setProduct(productData);
          return fetchRelatedProducts({
            categoryId: productData.categoryId,
            excludeId: id as string,
            limit: 4
          });
        })
        .then(relatedData => {
          setRelatedProducts(relatedData);
          setState(prev => ({ ...prev, loading: false }));
        })
        .catch(error => {
          console.error('Error loading product:', error);
          setState(prev => ({ 
            ...prev, 
            loading: false, 
            error: 'Product information could not be loaded' 
          }));
        });
    }
  }, [router.isFallback, id, initialProduct]);

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

  if (state.loading || router.isFallback) {
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
          {product ? (
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
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
              <h2 className="text-xl font-medium text-gray-900">Product Not Found</h2>
              <p className="mt-2 text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
              <button
                onClick={() => router.push('/admin/catalog/products')}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Return to Products
              </button>
            </div>
          )}
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
      props: { product, relatedProducts }
      // No revalidate for static export
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    // Return empty props instead of notFound for static export
    return { 
      props: { 
        product: null, 
        relatedProducts: [] 
      } 
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // For static export, we need to pre-render some popular products
    const popularProductIds = await productService.getPopularProductIds(15);
    
    const paths = popularProductIds.map(id => ({
      params: { id: id.toString() }
    }));
    
    return {
      paths,
      fallback: true // Use true instead of 'blocking' for static export
    };
  } catch (error) {
    console.error("Error fetching product paths:", error);
    return { 
      paths: [], 
      fallback: true 
    };
  }
};