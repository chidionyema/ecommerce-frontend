// pages/store/products/[id].tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { AlertCircle, CheckCircle } from 'lucide-react';
import MainLayout from '../../../../components/layouts/MainLayout';
import ProductDetail from '../../../../components/catalog/ProductDetail';
import { productService } from '../../../../services/product.service';
import { useCheckout } from '../../../../contexts/CheckoutContext';
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

interface FeedbackToastProps {
  message: string;
  type: 'success' | 'error';
}

const MAX_QUANTITY = 99;

export default function ProductDetailPage({ product, relatedProducts }: ProductDetailPageProps) {
  const router = useRouter();
  const { addToCart } = useCheckout();
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
    setState(prev => ({ ...prev, error: null }));
    
    if (!product) {
      setState(prev => ({ ...prev, error: 'Product information is not available' }));
      return;
    }

    const validationError = validateProduct(product, state.quantity);
    if (validationError) {
      setState(prev => ({ ...prev, error: validationError }));
      return;
    }

    setState(prev => ({ ...prev, loading: true }));
    
    try {
      addToCart(createCartItem(product, state.quantity));
      setState(prev => ({
        ...prev,
        feedback: {
          message: `Added ${prev.quantity} item${prev.quantity !== 1 ? 's' : ''} to cart`,
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

  if (router.isFallback) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductSkeleton />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Head>
        <title>{product?.name || 'Product Not Found'} | Your Store</title>
        <meta name="description" content={product?.shortDescription?.substring(0, 160) || ''} />
        {product && <ProductMetaTags product={product} />}
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorBoundary fallback={<ErrorFallback />}>
          <ProductDetail
            product={product}
            relatedProducts={relatedProducts}
            onAddToCart={handleAddToCart}
            loading={state.loading}
            quantity={state.quantity}
            onQuantityChange={handleQuantityChange}
            error={state.error}
          />
          {state.feedback && <FeedbackToast {...state.feedback} />}
        </ErrorBoundary>
      </div>
    </MainLayout>
  );
}

const ProductMetaTags = ({ product }: { product: ProductDto }) => (
  <>
    <meta property="og:title" content={`${product.name} | Your Store`} />
    <meta property="og:description" content={product.shortDescription || ''} />
    <meta property="og:type" content="product" />
    <meta property="og:url" content={`https://yourstore.com/store/products/${product.id}`} />
    {product.contents?.[0]?.url && <meta property="og:image" content={product.contents[0].url} />}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: product.name,
          image: product.contents?.map(c => c.url) || [],
          description: product.description,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: product.unitPrice,
            availability: product.isInStock ? 'InStock' : 'OutOfStock'
          }
        })
      }}
    />
  </>
);

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

const FeedbackToast = ({ message, type }: FeedbackToastProps) => (
  <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md ${
    type === 'success' ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'
  }`}>
    <div className="flex items-center gap-2">
      {type === 'success' ? <CheckCircle className="text-green-600" /> : <AlertCircle className="text-red-600" />}
      <span className={type === 'success' ? 'text-green-800' : 'text-red-800'}>{message}</span>
    </div>
  </div>
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = sanitizeId(params?.id);
    const product = await productService.getProductById(id);
    const relatedProducts = await productService.getRelatedProducts({
      categoryId: product.categoryId,
      excludeId: id,
      limit: 4
    });

    return { props: { product, relatedProducts }, revalidate: 3600 };
  } catch (error) {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking'
});

const sanitizeId = (id: unknown) => String(id).replace(/[^\w-]/g, '');

const validateProduct = (product: ProductDto, quantity: number) => {
  if (quantity <= 0 || quantity > MAX_QUANTITY) return `Quantity must be between 1 and ${MAX_QUANTITY}`;
  if (!product.unitPrice || product.unitPrice <= 0) return 'Product price information is invalid';
  return null;
};

const createCartItem = (product: ProductDto, quantity: number) => ({
  id: product.id,
  name: product.name,
  price: product.unitPrice,
  image: product.contents?.[0]?.url || '/images/placeholder.png',
  quantity,
  isSubscription: product.isSubscription || false
});