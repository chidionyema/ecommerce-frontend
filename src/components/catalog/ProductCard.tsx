// File: components/catalog/ProductCard.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { ProductDto } from '../../types/haworks.types';
import styles from '../../styles/ProductCard.module.css';

interface ProductCardProps {
  product: ProductDto;
  variant?: 'default' | 'compact' | 'featured';
  onAddToCart?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  variant = 'default',
  onAddToCart,
  onAddToWishlist
}) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToWishlist) {
      onAddToWishlist(product.id);
    }
  };

  // Find the main image to display
  const getMainImage = () => {
    if (product.contents && product.contents.length > 0) {
      return product.contents[0].url; // Assuming first content is the main image
    }
    return 'https://via.placeholder.com/300?text=No+Image'; // Fallback
  };

  // Check if product has any special badge
  const hasBadge =  !product.isInStock || product.isFeatured;

  // Render product card based on variant
  return (
    <div className={`${styles.productCard} ${styles[variant]}`}>
      <Link href={`/store/products/${product.id}`} className={styles.productLink}>
        <div className={styles.imageContainer}>
          <Image 
            src={getMainImage()}
            alt={product.name}
            width={variant === 'compact' ? 150 : 300}
            height={variant === 'compact' ? 150 : 300}
            className={styles.productImage}
            priority={variant === 'featured'}
          />
          
          {/* Badges */}
          <div className={styles.badges}>
           
            {!product.isInStock && (
              <span className={`${styles.badge} ${styles.outOfStockBadge}`}>Out of Stock</span>
            )}
            {product.isFeatured && (
              <span className={`${styles.badge} ${styles.featuredBadge}`}>Featured</span>
            )}
          </div>
          
          {/* Quick action buttons */}
          {variant !== 'compact' && (
            <div className={styles.quickActions}>
              <button 
                className={styles.actionButton}
                onClick={handleAddToCart}
                disabled={!product.isInStock}
              >
                <ShoppingCart size={18} />
              </button>
              
              <button 
                className={styles.actionButton}
                onClick={handleAddToWishlist}
              >
                <Heart size={18} />
              </button>
            </div>
          )}
        </div>
        
        <div className={styles.productInfo}>
          {/* Product category */}
          {product.type && (
            <div className={styles.category}>{product.type}</div>
          )}
          
          {/* Product title */}
          <h3 className={styles.productTitle}>
            {product.name}
          </h3>
          
          {/* Product description - only for featured and default */}
          {variant !== 'compact' && product.shortDescription && (
            <p className={styles.description}>
              {product.shortDescription.length > 100 
                ? `${product.shortDescription.substring(0, 100)}...` 
                : product.shortDescription}
            </p>
          )}
          
          {/* Rating */}
          <div className={styles.ratingContainer}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  size={14}
                  fill={star <= Math.round(product.rating) ? 'currentColor' : 'none'}
                  className={`${styles.star} ${star <= Math.round(product.rating) ? styles.filled : styles.empty}`}
                />
              ))}
            </div>
            <span className={styles.ratingText}>{product.rating.toFixed(1)}</span>
          </div>
          
          {/* Price info */}
          <div className={styles.priceContainer}>
            <span className={styles.price}>${product.unitPrice.toFixed(2)}</span>
            {product.unitPrice < product.unitPrice && (
              <span className={styles.originalPrice}>${product.unitPrice.toFixed(2)}</span>
            )}
          </div>
          
          {/* Add to cart button - only for featured and default */}
          {variant !== 'compact' && (
            <button 
              className={`${styles.addToCartButton} ${!product.isInStock ? styles.disabled : ''}`}
              onClick={handleAddToCart}
              disabled={!product.isInStock}
            >
              {product.isInStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;