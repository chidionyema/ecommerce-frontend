// File: pages/store/products/[id].tsx
export const runtime = 'edge';

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
import { unstable_cache } from 'next/cache';

interface ProductDetailPageProps {
  product: ProductDto;
  relatedProducts: ProductDto[];
}

const sanitizeInput = (input: string): string => {
  return String(input).replace(/[^\w-]/g, '');
};

const MAX_QUANTITY = 99;

const getCachedProduct = unstable_cache(
  async (id: string) => {
    try {
      return await productService.getProductById(id);
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },
  ['product-details'],
  { revalidate: 3600 }
);

const getCachedRelated = unstable_cache(
  async (categoryId: string, productId: string) => {
    try {
      return await productService.getRelatedProducts({
        categoryId,
        excludeId: productId,
        limit: 4
      });
    } catch (error) {
      console.error('Error fetching related products:', error);
      return [];
    }
  },
  ['related-products'],
  { revalidate: 1800 }
);

export default function ProductDetailPage({ product, relatedProducts }: ProductDetailPageProps) {
  const router = useRouter();
  const { addToCart } = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product && !router.isFallback) {
      setError('Product information could not be loaded');
    }
  }, [product, router.isFallback]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (feedback) {
      timeoutId = setTimeout(() => setFeedback(null), 5000);
    }
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
      setFeedback({
        message: 'Failed to add to cart. Please try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = (productId: string) => {
    try {
      console.log(`Added product ${productId} to wishlist`);
      setFeedback({
        message: 'Added to wishlist',
        type: 'success'
      });
    } catch (err) {
      console.error('Failed to add to wishlist:', err);
      setFeedback({
        message: 'Failed to add to wishlist',
        type: 'error'
      });
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
        <title>{product.name} | Your Store</title>
        <meta name="description" content={product.shortDescription || product.description?.substring(0, 160)} />
        <meta property="og:title" content={`${product.name} | Your Store`} />
        <meta property="og:description" content={product.shortDescription || product.description?.substring(0, 160)} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://yourstore.com/store/products/${product.id}`} />
        {product.contents?.[0]?.url && (
          <meta property="og:image" content={product.contents[0].url} />
        )}
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.shortDescription || product.description?.substring(0, 160)} />
        {product.contents?.[0]?.url && (
          <meta name="twitter:image" content={product.contents[0].url} />
        )}
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'Product',
              name: product.name,
              image: product.contents?.map(c => c.url) || [],
              description: product.description,
              mpn: product.id,
              offers: {
                '@type': 'Offer',
                url: `https://yourstore.com/store/products/${product.id}`,
                priceCurrency: 'USD',
                price: product.unitPrice,
                availability: product.isInStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
                itemCondition: 'https://schema.org/NewCondition'
              }
            })
          }}
        />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorBoundary
          fallback={
            <div className="text-center py-12">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-xl font-medium text-gray-900">Something went wrong</h2>
              <p className="mt-2 text-gray-600">We couldn't load the product information. Please try refreshing the page.</p>
              <button
                onClick={() => router.reload()}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Refresh Page
              </button>
            </div>
          }
        >
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
          
          {feedback && (
            <div className={`fixed top-4 right-4 z-50 rounded-md shadow-md p-4 transition-opacity duration-500 ${
              feedback.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center">
                {feedback.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                )}
                <p className={feedback.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                  {feedback.message}
                </p>
              </div>
            </div>
          )}
        </ErrorBoundary>
      </div>
    </MainLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const products = await unstable_cache(
      async () => {
        try {
          return await productService.getProducts();
        } catch (error) {
          console.error('Error fetching product IDs:', error);
          return [];
        }
      },
      ['all-product-ids'],
      { revalidate: 86400 }
    )();

    const paths = products.map(({ id }) => ({
      params: { id: sanitizeInput(id) }
    }));

    return {
      paths,
      fallback: 'blocking'
    };
  } catch (error) {
    console.error('Error generating paths:', error);
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params || {};
  const sanitizedId = sanitizeInput(id as string);

  try {
    const product = await getCachedProduct(sanitizedId);
    
    if (!product) {
      return { notFound: true };
    }

    const relatedProducts = await getCachedRelated(
      product.categoryId, 
      sanitizedId
    );

    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
        relatedProducts: JSON.parse(JSON.stringify(relatedProducts))
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
      revalidate: 60
    };
  }
};