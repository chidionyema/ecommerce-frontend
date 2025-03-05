// File: pages/admin/catalog/products/[id].tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { ChevronLeft, Save, Trash2 } from 'lucide-react';
import AdminLayout from '../../../../components/layouts/AdminLayout';
import ProductForm from '../../../../components/admin/ProductForm';
import Modal from '../../../../components/admin/Modal';
import { productService } from '../../../../services/product.service';
import { ProductDto, ProductCreateDto } from '../../../../types/haworks.types';
import styles from '../../../../styles/admin/ProductEditPage.module.css';

interface ProductEditPageProps {
  product?: ProductDto;
  isNew: boolean;
}

export default function ProductEditPage({ product, isNew }: ProductEditPageProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Redirect if not found and not new
  useEffect(() => {
    if (!product && !isNew && !router.isFallback) {
      router.push('/admin/catalog/products');
    }
  }, [product, isNew, router]);

  // Handle form submission
  const handleSubmit = async (data: ProductCreateDto) => {
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      if (isNew) {
        // Create new product
        await productService.createProduct(data);
        setSuccessMessage('Product created successfully');
        
        // Redirect to products list after a brief delay
        setTimeout(() => {
          router.push('/admin/catalog/products');
        }, 1500);
      } else if (product) {
        // Update existing product
        await productService.updateProduct(product.id, data);
        setSuccessMessage('Product updated successfully');
      }
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
      // Scroll to top to show error/success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle cancel
  const handleCancel = () => {
    router.push('/admin/catalog/products');
  };

  // Handle delete
  const handleDelete = async () => {
    if (!product) return;
    
    setIsSubmitting(true);
    try {
      await productService.deleteProduct(product.id);
      setShowDeleteModal(false);
      
      // Redirect to products list
      router.push('/admin/catalog/products');
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product. Please try again.');
      setShowDeleteModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout title={isNew ? 'Add Product' : 'Edit Product'}>
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <button 
            className={styles.backButton}
            onClick={() => router.push('/admin/catalog/products')}
          >
            <ChevronLeft size={16} />
            Back to Products
          </button>
          <h1 className={styles.pageTitle}>
            {isNew ? 'Add New Product' : `Edit Product: ${product?.name}`}
          </h1>
        </div>
        
        {!isNew && product && (
          <button
            className={styles.deleteButton}
            onClick={() => setShowDeleteModal(true)}
            disabled={isSubmitting}
          >
            <Trash2 size={16} />
            Delete Product
          </button>
        )}
      </div>
      
      {/* Success/Error Messages */}
      {successMessage && (
        <div className={styles.successMessage}>
          <span>{successMessage}</span>
        </div>
      )}
      
      {error && (
        <div className={styles.errorMessage}>
          <span>{error}</span>
        </div>
      )}
      
      {/* Product Form */}
      <div className={styles.formContainer}>
        <ProductForm
          initialData={product}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </div>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Product"
      >
        <div className={styles.deleteConfirmation}>
          <p>
            Are you sure you want to delete <strong>{product?.name}</strong>? 
            This action cannot be undone.
          </p>
          
          <div className={styles.modalActions}>
            <button
              className={styles.cancelButton}
              onClick={() => setShowDeleteModal(false)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              className={styles.deleteButton}
              onClick={handleDelete}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};
  
  // Check if this is a new product page
  if (id === 'new') {
    return {
      props: {
        isNew: true
      }
    };
  }
  
  // Otherwise, fetch existing product
  try {
    const product = await productService.getProductById(id as string);
    
    if (!product) {
      return {
        notFound: true
      };
    }
    
    return {
      props: {
        product,
        isNew: false
      }
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true
    };
  }
};