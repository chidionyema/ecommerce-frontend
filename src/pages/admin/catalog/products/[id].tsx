// File: pages/store/products/[id].tsx
//export const runtime = 'experimental-edge';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { AlertCircle, CheckCircle, ShoppingBag } from 'lucide-react';
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

// Helper to sanitize input
const sanitizeInput = (input: string): string => {
  return String(input).replace(/[^\w-]/g, '');
};

// Maximum quantity allowed per product
const MAX_QUANTITY = 99;

export default function ProductDetailPage({ product, relatedProducts }: ProductDetailPageProps) {
  const router = useRouter();
  const { addToCart } = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Validate product data is available
  useEffect(() => {
    if (!product && !router.isFallback) {
      setError('Product information could not be loaded');
    }
  }, [product, router.isFallback]);

  // Clear feedback after a timeout
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (feedback) {
      timeoutId = setTimeout(() => setFeedback(null), 5000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [feedback]);

  // Validate quantity before updating
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= MAX_QUANTITY) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    setError(null);
    
    // Validate product is available
    if (!product) {
      setError('Product information is not available');
      return;
    }
    
    // Validate quantity
    if (quantity <= 0 || quantity > MAX_QUANTITY) {
      setError(`Quantity must be between 1 and ${MAX_QUANTITY}`);
      return;
    }
    
    // Validate price
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
        isSubscription: product.isSubscription || false // Add the isSubscription property
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

  // Handle adding to wishlist
  const handleAddToWishlist = (productId: string) => {
    try {
      // This would integrate with your wishlist service
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

  // If the page is loading via client-side navigation
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
        {product.contents && product.contents.length > 0 && (
          <meta property="og:image" content={product.contents[0].url} />
        )}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.shortDescription || product.description?.substring(0, 160)} />
        {product.contents && product.contents.length > 0 && (
          <meta name="twitter:image" content={product.contents[0].url} />
        )}
        
        {/* Product Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'Product',
              name: product.name,
              image: product.contents?.map(c => c.url) || [],
              description: product.description,
            //  sku: product.sku,
              mpn: product.id,
             // brand: {
             //   '@type': 'Brand',
             //   name: product.brandName || 'Your Store'
            //  },
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
          
          {/* Feedback Toast Notification */}
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

// Modified getStaticPaths to not fetch from API during build
export const getStaticPaths: GetStaticPaths = async () => {
  // For static export, return empty paths array
  // This means no pages will be pre-rendered during build
  return {
    paths: [],
    fallback: 'blocking' // Keep using blocking to ensure good UX
  };
};

// Modified getStaticProps to use mock data during build
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params || {};
  const sanitizedId = sanitizeInput(id as string);
  
  // Check if we're in build process
  const isBuildProcess = process.env.NODE_ENV === 'production' && 
                       (process.env.NEXT_PHASE === 'phase-production-build' || 
                        process.env.NEXT_PHASE === 'phase-export');
  
  try {
    // Use mock data during build process
    if (isBuildProcess) {
      const mockProduct = {
        id: sanitizedId,
        name: 'Product Name',
        shortDescription: 'Short product description for build-time generation',
        description: 'This is a detailed product description used during build time when API is not available.',
        unitPrice: 29.99,
        categoryId: 'category-1',
        isInStock: true,
        contents: [{ url: '/images/placeholder.png' }],
        isSubscription: false
      };
      
      const mockRelatedProducts = Array(4).fill(null).map((_, i) => ({
        id: `related-${i + 1}`,
        name: `Related Product ${i + 1}`,
        shortDescription: `Description for related product ${i + 1}`,
        unitPrice: 19.99 + i,
        contents: [{ url: '/images/placeholder.png' }],
        isSubscription: false
      }));
      
      return {
        props: {
          product: mockProduct,
          relatedProducts: mockRelatedProducts
        },
        revalidate: 3600
      };
    }
    
    // Normal API calls when not in build process
    const product = await productService.getProductById(sanitizedId);
    
    if (!product) {
      return {
        notFound: true
      };
    }
    
    const relatedProducts = await productService.getRelatedProducts({
      categoryId: product.categoryId,
      excludeId: product.id,
      limit: 4
    });
    
    return {
      props: {
        product,
        relatedProducts
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error fetching product details:', error);
    
    // If in build process, return mock data instead of 404
    if (isBuildProcess) {
      return {
        props: {
          product: {
            id: sanitizedId,
            name: 'Product Name',
            shortDescription: 'Short product description for build-time generation',
            description: 'This is a detailed product description used during build time when API is not available.',
            unitPrice: 29.99,
            categoryId: 'category-1',
            isInStock: true,
            contents: [{ url: '/images/placeholder.png' }],
            isSubscription: false
          },
          relatedProducts: []
        },
        revalidate: 3600
      };
    }
    
    // Return 404 for non-existent or inaccessible products
    return {
      notFound: true
    };
  }
};