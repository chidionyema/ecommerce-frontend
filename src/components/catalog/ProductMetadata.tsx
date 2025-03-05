// File: components/catalog/ProductMetadata.tsx
import React from 'react';
import { ProductMetadataDto } from '../../types/haworks.types';
import styles from '../../styles/ProductMetadata.module.css';

interface ProductMetadataProps {
  metadata: ProductMetadataDto[];
  showTitle?: boolean;
  maxItems?: number;
}

const ProductMetadata: React.FC<ProductMetadataProps> = ({
  metadata,
  showTitle = true,
  maxItems = 5
}) => {
  // If no metadata or empty array, don't render anything
  if (!metadata || metadata.length === 0) {
    return null;
  }

  // Only show the most important metadata in the list (limited by maxItems)
  const displayedMetadata = metadata.slice(0, maxItems);

  return (
    <div className={styles.metadataContainer}>
      {showTitle && <h3 className={styles.metadataTitle}>Product Details</h3>}
      
      <dl className={styles.metadataList}>
        {displayedMetadata.map((item) => (
          <div key={item.id} className={styles.metadataItem}>
            <dt className={styles.metadataKey}>{item.keyName}</dt>
            <dd className={styles.metadataValue}>{item.keyValue}</dd>
          </div>
        ))}
      </dl>
      
      {metadata.length > maxItems && (
        <div className={styles.moreDetails}>
          <span className={styles.moreDetailsText}>
            +{metadata.length - maxItems} more details
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductMetadata;