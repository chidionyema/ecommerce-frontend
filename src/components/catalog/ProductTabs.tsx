// File: components/catalog/ProductTabs.tsx
import React from 'react';
import { ProductMetadataDto } from '../../types/haworks.types';
import styles from '../../styles/ProductTabs.module.css';

interface ProductTabsProps {
  description: string;
  specifications: ProductMetadataDto[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  description,
  specifications,
  activeTab,
  onTabChange
}) => {
  // Sanitize HTML if needed - this is a simple approach, consider using DOMPurify in production
  const createMarkup = (html: string) => {
    return { __html: html };
  };

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsHeader}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'description' ? styles.active : ''}`}
          onClick={() => onTabChange('description')}
        >
          Description
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'specifications' ? styles.active : ''}`}
          onClick={() => onTabChange('specifications')}
        >
          Specifications
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.active : ''}`}
          onClick={() => onTabChange('reviews')}
        >
          Reviews
        </button>
      </div>
      
      <div className={styles.tabContent}>
        {/* Description Tab */}
        {activeTab === 'description' && (
          <div className={styles.descriptionTab}>
            {description ? (
              <div dangerouslySetInnerHTML={createMarkup(description)} />
            ) : (
              <p className={styles.noContent}>No description available for this product.</p>
            )}
          </div>
        )}
        
        {/* Specifications Tab */}
        {activeTab === 'specifications' && (
          <div className={styles.specificationsTab}>
            {specifications && specifications.length > 0 ? (
              <table className={styles.specTable}>
                <tbody>
                  {specifications.map((spec) => (
                    <tr key={spec.id}>
                      <th className={styles.specName}>{spec.keyName}</th>
                      <td className={styles.specValue}>{spec.keyValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className={styles.noContent}>No specifications available for this product.</p>
            )}
          </div>
        )}
        
        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className={styles.reviewsTab}>
            <p className={styles.noContent}>
              No reviews yet. Be the first to review this product!
            </p>
            
            {/* This would be where you'd integrate a reviews component */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;