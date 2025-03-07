import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { AlertCircle, CheckCircle } from 'lucide-react';
import MainLayout from '../../../components/layouts/MainLayout';
import ProductDetail from '../../../components/catalog/ProductDetail';
import { productService } from '../../../services/product.service';
import { useCheckout } from '../../../contexts/CheckoutContext';
import { ProductDto } from '../../../types/haworks.types';
import ErrorBoundary from '../../../components/Common/ErrorBoundary';
import ProductSkeleton from '../../../components/catalog/ProductSkeleton';



interface ProductDetailPageProps {
  product: ProductDto;
  relatedProducts: ProductDto[];
}

const sanitizeInput = (input: string) => input.replace(/[^\w-]/g, '');
const MAX_QUANTITY = 99;

export default function ProductDetailPage({ product, relatedProducts }: ProductDetailPageProps) {
  const router = useRouter();
  const { addToCart } = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Loading state for fallback
  if (router.isFallback) {
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

  useEffect(() => {
    const timeoutId = feedback && setTimeout(() => setFeedback(null), 5000);
    return () => timeoutId && clearTimeout(timeoutId);
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
      <Head>
        <title>{product.name} | Your Store</title>
        <meta name="description" content={product.shortDescription?.substring(0, 160) || ''} />
        {/* SEO and Social Meta Tags */}
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorBoundary fallback={<ErrorFallback />}>
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
          
          {feedback && <FeedbackToast {...feedback} />}
        </ErrorBoundary>
      </div>
    </MainLayout>
  );
}

// Helper Components
const ErrorFallback = () => (
  <div className="text-center py-12">
    {/* Error UI */}
  </div>
);

const FeedbackToast = ({ message, type }: { message: string, type: 'success' | 'error' }) => (
  <div className={`fixed top-4 right-4 z-50 rounded-md shadow-md p-4 transition-opacity duration-500 ${
    type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
  }`}>
    {/* Toast Content */}
  </div>
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params || {};
  const sanitizedId = sanitizeInput(id as string);

  try {
    const [product, relatedProducts] = await Promise.all([
      productService.getProductById(sanitizedId),
      productService.getRelatedProducts({
        categoryId: (await productService.getProductById(sanitizedId)).categoryId,
        excludeId: sanitizedId,
        limit: 4
      })
    ]);

    return {
      props: { product, relatedProducts },
      revalidate: 60
    };
  } catch (error) {
    console.error('Product page generation error:', error);
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const popularProducts = await productService.getPopularProducts(100);
    return {
      paths: popularProducts.map(p => ({ params: { id: p.id } })),
      fallback: 'blocking'
    };
  } catch (error) {
    console.error('Error generating static paths:', error);
    return { paths: [], fallback: 'blocking' };
  }
};