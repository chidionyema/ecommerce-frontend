// File: components/catalog/ProductGrid.tsx
import React from 'react';
import { ProductDto } from '../../types/haworks.types';
import ProductCard from './ProductCard';
import styles from '../../styles/ProductGrid.module.css';

interface ProductGridProps {
  products: ProductDto[];
  loading?: boolean;
  emptyMessage?: string;
  variant?: 'default' | 'compact' | 'featured';
  columns?: 2 | 3 | 4 | 5;
  onAddToCart?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  emptyMessage = 'No products found',
  variant = 'default',
  columns = 4,
  onAddToCart,
  onAddToWishlist
}) => {
  // Render skeleton placeholders when loading
  if (loading) {
    return (
      <div className={`${styles.productGrid} ${styles[`columns-${columns}`]}`}>
        {Array.from({ length: columns * 2 }).map((_, index) => (
          <div key={index} className={styles.skeletonCard}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonRating}></div>
              <div className={styles.skeletonPrice}></div>
              {variant !== 'compact' && (
                <div className={styles.skeletonButton}></div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Render empty state if no products
  if (!products || products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  // Render product grid
  return (
    <div className={`${styles.productGrid} ${styles[`columns-${columns}`]}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          variant={variant}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
        />
      ))}
    </div>
  );
};

export default ProductGrid;