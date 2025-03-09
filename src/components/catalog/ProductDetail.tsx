// File: components/catalog/ProductDetail.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star, Minus, Plus, AlertCircle } from 'lucide-react';
import { ProductDto, CategoryDto } from '../../types/haworks.types';

// Add this interface to properly type the product with its category
interface ProductWithCategory extends ProductDto {
  category?: CategoryDto;
}

interface ProductDetailProps {
  product: ProductWithCategory;
  relatedProducts: ProductWithCategory[];
  onAddToCart: () => void;
  onAddToWishlist: (productId: string) => void;
  loading: boolean;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  error: string | null;
}

const MAX_QUANTITY = 99;

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  relatedProducts,
  onAddToCart,
  onAddToWishlist,
  loading,
  quantity,
  onQuantityChange,
  error
}) => {
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(product.contents?.[0]?.url || '/images/placeholder.png');
  
  // Format currency
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  // Helper function to find metadata by key
  const getMetadataValue = (key: string): string | undefined => {
    return product.metadata?.find(item => item.keyName === key)?.keyValue;
  };
  
  // Get brand and tags from metadata
  const brand = getMetadataValue('brand');
  const tags = getMetadataValue('tags');
  
  // Handle quantity changes
  const incrementQuantity = () => {
    if (quantity < MAX_QUANTITY) {
      onQuantityChange(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };
  
  // Content for different tabs
  const renderTabContent = () => {
    switch(activeTab) {
      case 'description':
        return (
          <div className="prose prose-indigo max-w-none" dangerouslySetInnerHTML={{ __html: product.description || 'No description available.' }} />
        );
      case 'specifications':
        return (
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-200">
                {product.specifications?.map((spec, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{spec.specKey}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{spec.specValue}</td>
                  </tr>
                )) || (
                  <tr>
                    <td colSpan={2} className="px-6 py-4 text-sm text-gray-500">No specifications available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );
      case 'reviews':
        return (
          <div>
            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{review.title}</span>
                    </div>
                    <p className="text-gray-800">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white">
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Gallery */}
        <div>
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100 mb-4">
            <div className="relative h-96 w-full">
              <Image
                src={selectedImage}
                alt={product.name}
                layout="fill"
                objectFit="contain"
                className="w-full h-full object-center object-cover"
                priority
              />
            </div>
          </div>
          
          {product.contents && product.contents.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.contents.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image.url)}
                  className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${
                    selectedImage === image.url ? 'ring-2 ring-indigo-500' : 'ring-1 ring-gray-200'
                  }`}
                >
                  <div className="relative h-20 w-full">
                    <Image
                      src={image.url}
                      alt={`Product image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">{product.name}</h1>
          
          <div className="mt-4">
            <p className="text-3xl text-gray-900">{formatPrice(product.unitPrice)}</p>
            {product.originalPrice && product.originalPrice > product.unitPrice && (
              <p className="mt-1 text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>
          
          {/* Product Rating */}
          {product.averageRating && (
            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.reviews ? `${product.reviews.length} reviews` : 'No reviews yet'}
              </span>
            </div>
          )}
          
          {/* Availability */}
          <div className="mt-4">
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
              <span className={product.stock > 0 ? 'text-green-700' : 'text-red-700'}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
          
          {/* Short Description */}
          {product.shortDescription && (
            <div className="mt-4">
              <p className="text-base text-gray-700">{product.shortDescription}</p>
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="mt-4 flex items-start rounded-md bg-red-50 p-4">
              <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-1 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Quantity Selector */}
          <div className="mt-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <div className="mt-1 flex rounded-md">
              <button
                type="button"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="relative inline-flex items-center justify-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Decrease quantity</span>
                <Minus size={16} />
              </button>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                max={MAX_QUANTITY}
                value={quantity}
                onChange={(e) => onQuantityChange(parseInt(e.target.value) || 1)}
                className="block w-24 text-center border-t border-b border-gray-300 py-2 outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={incrementQuantity}
                disabled={quantity >= MAX_QUANTITY}
                className="relative inline-flex items-center justify-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Increase quantity</span>
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <div className="mt-6">
            <button
              type="button"
              onClick={onAddToCart}
              disabled={loading || product.stock <= 0}
              className="w-full md:w-auto flex items-center justify-center rounded-md border border-transparent py-3 px-8 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
          
          {/* Add to Wishlist Button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => onAddToWishlist(product.id)}
              className="w-full md:w-auto flex items-center justify-center rounded-md border border-gray-300 py-3 px-8 text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </button>
          </div>
          
          {/* Additional Details (SKU, Categories, etc.) */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <dl className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
            
              {product.category && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="mt-1 text-sm text-gray-900">{product.category.name}</dd>
                </div>
              )}
              
              {brand && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Brand</dt>
                  <dd className="mt-1 text-sm text-gray-900">{brand}</dd>
                </div>
              )}
              
              {tags && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Tags</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <div className="flex flex-wrap gap-2">
                      {tags.split(',').map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
      
      {/* Product Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`${
                activeTab === 'description'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`${
                activeTab === 'specifications'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`${
                activeTab === 'reviews'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Reviews
            </button>
          </nav>
        </div>
        <div className="py-6">
          {renderTabContent()}
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group relative">
                <div className="aspect-w-1 aspect-h-1 rounded-md bg-gray-200 overflow-hidden group-hover:opacity-75">
                  <Link href={`/store/products/${relatedProduct.id}`}>
                    <a>
                      <div className="relative h-64 w-full">
                        <Image
                          src={relatedProduct.contents?.[0]?.url || '/images/placeholder.png'}
                          alt={relatedProduct.name}
                          layout="fill"
                          objectFit="cover"
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={`/store/products/${relatedProduct.id}`}>
                        <a>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {relatedProduct.name}
                        </a>
                      </Link>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{formatPrice(relatedProduct.unitPrice)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;