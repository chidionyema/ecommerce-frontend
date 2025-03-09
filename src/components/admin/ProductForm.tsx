// File: components/admin/ProductForm.tsx
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ProductCreateDto, ProductDto, CategoryDto, ContentDto } from '../../types/haworks.types';
import { categoryService } from '../../services/category.service';
import FileUploader from '../Shared/FileUploader';
import RichTextEditor from './RichTextEditor';
import styles from '../../styles/admin/ProductForm.module.css';

interface ProductFormProps {
  initialData?: ProductDto;
  onSubmit: (data: ProductCreateDto) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [uploadedImages, setUploadedImages] = useState<ContentDto[]>(
    initialData?.contents || []
  );
  const [metadataFields, setMetadataFields] = useState<Array<{ key: string; value: string; id?: string }>>([
    { key: '', value: '' },
  ]);

  const { register, handleSubmit, control, formState: { errors } } = useForm<ProductCreateDto>({
    defaultValues: initialData ? {
      name: initialData.name,
      headline: initialData.headline,
      title: initialData.title,
      shortDescription: initialData.shortDescription,
      description: initialData.description,
      unitPrice: initialData.unitPrice,
      stock: initialData.stock,
      rating: initialData.rating,
      // Fix: align property names with the ProductCreateDto type
      isListed: initialData.isListed, // Changed from isNew to isListed
      isInStock: initialData.isInStock, // Changed from inStock to isInStock
      brand: initialData.brand,
      type: initialData.type,
      categoryId: initialData.categoryId,
      metadata: initialData.metadata,
    } : {
      name: '',
      headline: '',
      title: '',
      shortDescription: '',
      description: '',
      unitPrice: 0,
      stock: 0,
      rating: 5.0,
      isListed: true, // Changed from isNew to isListed
      isInStock: true, // Changed from inStock to isInStock
      brand: '',
      type: '',
      categoryId: '',
      metadata: [],
    }
  });

  // Load categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await categoryService.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Initialize metadata fields if we have existing data
  useEffect(() => {
    if (initialData?.metadata && initialData.metadata.length > 0) {
      setMetadataFields(
        initialData.metadata.map(meta => ({
          key: meta.keyName,
          value: meta.keyValue,
          id: meta.id
        }))
      );
    }
  }, [initialData]);

  // Handle image upload
  const handleFileUploaded = (content: ContentDto) => {
    setUploadedImages(prev => [...prev, content]);
  };

  // Handle metadata fields
  const addMetadataField = () => {
    setMetadataFields([...metadataFields, { key: '', value: '' }]);
  };

  const removeMetadataField = (index: number) => {
    setMetadataFields(metadataFields.filter((_, i) => i !== index));
  };

  const updateMetadataField = (index: number, field: 'key' | 'value', value: string) => {
    const updatedFields = [...metadataFields];
    updatedFields[index][field] = value;
    setMetadataFields(updatedFields);
  };

  // Prepare metadata for submission
  const prepareMetadataForSubmission = () => {
    return metadataFields
      .filter(field => field.key.trim() !== '' && field.value.trim() !== '')
      .map(field => ({
        id: field.id || '', // Use existing ID if available
        keyName: field.key,
        keyValue: field.value
      }));
  };

  // Submit form with additional data
  const onFormSubmit = async (data: ProductCreateDto) => {
    // Add metadata and contents to the data
    const enrichedData = {
      ...data,
      metadata: prepareMetadataForSubmission(),
    };

    await onSubmit(enrichedData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
      <div className={styles.formGrid}>
        {/* Basic Information */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Basic Information</h3>
          
          <div className={styles.formField}>
            <label htmlFor="name" className={styles.label}>Product Name*</label>
            <input
              id="name"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              {...register('name', { required: 'Product name is required' })}
            />
            {errors.name && <p className={styles.errorText}>{errors.name.message}</p>}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label htmlFor="headline" className={styles.label}>Headline</label>
              <input
                id="headline"
                className={styles.input}
                {...register('headline')}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="title" className={styles.label}>Title (SEO)</label>
              <input
                id="title"
                className={styles.input}
                {...register('title')}
              />
            </div>
          </div>

          <div className={styles.formField}>
            <label htmlFor="shortDescription" className={styles.label}>Short Description</label>
            <textarea
              id="shortDescription"
              className={styles.textarea}
              rows={3}
              {...register('shortDescription')}
            ></textarea>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label htmlFor="brand" className={styles.label}>Brand</label>
              <input
                id="brand"
                className={styles.input}
                {...register('brand')}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="type" className={styles.label}>Type</label>
              <input
                id="type"
                className={styles.input}
                {...register('type')}
              />
            </div>
          </div>

          <div className={styles.formField}>
            <label htmlFor="categoryId" className={styles.label}>Category*</label>
            <select
              id="categoryId"
              className={`${styles.select} ${errors.categoryId ? styles.inputError : ''}`}
              {...register('categoryId', { required: 'Category is required' })}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className={styles.errorText}>{errors.categoryId.message}</p>}
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Pricing & Inventory</h3>
          
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label htmlFor="unitPrice" className={styles.label}>Price*</label>
              <input
                id="unitPrice"
                type="number"
                step="0.01"
                min="0"
                className={`${styles.input} ${errors.unitPrice ? styles.inputError : ''}`}
                {...register('unitPrice', { 
                  required: 'Price is required',
                  min: { value: 0, message: 'Price must be a positive number' },
                  valueAsNumber: true
                })}
              />
              {errors.unitPrice && <p className={styles.errorText}>{errors.unitPrice.message}</p>}
            </div>

            <div className={styles.formField}>
              <label htmlFor="stock" className={styles.label}>Stock</label>
              <input
                id="stock"
                type="number"
                min="0"
                className={styles.input}
                {...register('stock', { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label htmlFor="rating" className={styles.label}>Rating</label>
              <input
                id="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                className={styles.input}
                {...register('rating', { 
                  min: { value: 0, message: 'Rating must be between 0 and 5' },
                  max: { value: 5, message: 'Rating must be between 0 and 5' },
                  valueAsNumber: true
                })}
              />
              {errors.rating && <p className={styles.errorText}>{errors.rating.message}</p>}
            </div>
          </div>

          <div className={styles.formCheckboxes}>
            <div className={styles.checkboxField}>
              <input
                id="isListed"
                type="checkbox"
                className={styles.checkbox}
                {...register('isListed')}
              />
              <label htmlFor="isListed" className={styles.checkboxLabel}>New Product</label>
            </div>

            <div className={styles.checkboxField}>
              <input
                id="isInStock"
                type="checkbox"
                className={styles.checkbox}
                {...register('isInStock')}
              />
              <label htmlFor="isInStock" className={styles.checkboxLabel}>In Stock</label>
            </div>
          </div>
        </div>
      </div>

      {/* Product Images */}
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Product Images</h3>
        
        <div className={styles.uploadedImages}>
          {uploadedImages.map((image, index) => (
            <div key={image.id} className={styles.uploadedImage}>
              <img src={image.url} alt={`Product ${index + 1}`} />
              <div className={styles.imageOverlay}>
                <button
                  type="button"
                  className={styles.removeImageButton}
                  onClick={() => setUploadedImages(images => images.filter(img => img.id !== image.id))}
                >
                  ✕
                </button>
                {index === 0 && <div className={styles.mainImageBadge}>Main</div>}
              </div>
            </div>
          ))}
        </div>
        
        <FileUploader
          entityId={initialData?.id || 'new-product'}
          onFileUploaded={handleFileUploaded}
          maxFiles={10}
          acceptedFileTypes="image/*"
          className={styles.uploader}
        />
      </div>

      {/* Detailed Description */}
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Detailed Description</h3>
        
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      {/* Product Specifications/Metadata */}
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Product Specifications</h3>
        
        <div className={styles.metadataFields}>
          {metadataFields.map((field, index) => (
            <div key={index} className={styles.metadataField}>
              <input
                className={styles.metadataKey}
                placeholder="Specification name"
                value={field.key}
                onChange={(e) => updateMetadataField(index, 'key', e.target.value)}
              />
              <input
                className={styles.metadataValue}
                placeholder="Specification value"
                value={field.value}
                onChange={(e) => updateMetadataField(index, 'value', e.target.value)}
              />
              <button
                type="button"
                className={styles.removeMetadataButton}
                onClick={() => removeMetadataField(index)}
              >
                ✕
              </button>
            </div>
          ))}
          
          <button
            type="button"
            className={styles.addMetadataButton}
            onClick={addMetadataField}
          >
            + Add Specification
          </button>
        </div>
      </div>

      {/* Form Actions */}
      <div className={styles.formActions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;