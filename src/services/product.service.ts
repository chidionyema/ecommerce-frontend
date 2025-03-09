// product-service-builder.ts
import { apiService } from './api.service';

// IMPORTANT: Remove the types import to avoid redeclaration issues
// Avoid importing ProductDto, ProductCreateDto, etc.

// Use a function to check build time instead of a variable
function isBuildTime(): boolean {
  return process.env.NODE_ENV === 'production' && typeof window === 'undefined';
}

// Use a function to get fallback data
function getFallbackProducts(): any[] {
  return [
    {
      id: 'placeholder-1',
      name: 'Placeholder Product 1',
      headline: 'Top Rated Product',
      title: 'Premium Placeholder Product',
      shortDescription: 'A high-quality placeholder for build time',
      description: 'This is a detailed description of our premium placeholder product that is used during build time when the API is not available.',
      unitPrice: 99.99,
      originalPrice: 129.99,
      stock: 100,
      isListed: true,
      isFeatured: true,
      rating: 4.5,
      isInStock: true,
      isDigital: false,
      isSubscription: false,
      brand: 'PlaceholderBrand',
      type: 'Standard',
      categoryId: 'placeholder-category',
      contents: [
        {
          id: 'content-1',
          entityId: 'placeholder-1',
          entityType: 'Product',
          url: '/placeholder.jpg',
          contentType: 'Image',
          fileSize: 1024
        }
      ],
      metadata: [
        {
          id: 'meta-1',
          keyName: 'Color',
          keyValue: 'Blue'
        }
      ],
      specifications: [
        {
          id: 'spec-1',
          productId: 'placeholder-1',
          specKey: 'Material',
          specValue: 'Premium',
          displayOrder: 1
        },
        {
          id: 'spec-2',
          productId: 'placeholder-1',
          specKey: 'Weight',
          specValue: '500g',
          displayOrder: 2
        }
      ],
      reviews: [
        {
          id: 'review-1',
          productId: 'placeholder-1',
          userId: 'user-1',
          rating: 5,
          title: 'Great product!',
          comment: 'This is an amazing product, very happy with my purchase.',
          isVerifiedPurchase: true,
          createdAt: new Date().toISOString(),
          isApproved: true
        }
      ],
      averageRating: 4.5
    },
    {
      id: 'placeholder-2',
      name: 'Placeholder Product 2',
      headline: 'Best Seller',
      title: 'Deluxe Placeholder Product',
      shortDescription: 'Another quality placeholder for build time',
      description: 'This is a detailed description of our deluxe placeholder product that is used during build time when the API is not available.',
      unitPrice: 149.99,
      originalPrice: 179.99,
      stock: 75,
      isListed: true,
      isFeatured: true,
      rating: 4.8,
      isInStock: true,
      isDigital: true,
      isSubscription: true,
      brand: 'PlaceholderBrand',
      type: 'Deluxe',
      categoryId: 'placeholder-category',
      contents: [
        {
          id: 'content-2',
          entityId: 'placeholder-2',
          entityType: 'Product',
          url: '/placeholder-deluxe.jpg',
          contentType: 'Image',
          fileSize: 2048
        }
      ],
      metadata: [
        {
          id: 'meta-2',
          keyName: 'Format',
          keyValue: 'Digital'
        }
      ],
      specifications: [
        {
          id: 'spec-3',
          productId: 'placeholder-2',
          specKey: 'Format',
          specValue: 'Digital',
          displayOrder: 1
        },
        {
          id: 'spec-4',
          productId: 'placeholder-2',
          specKey: 'Duration',
          specValue: '12 months',
          displayOrder: 2
        }
      ],
      reviews: [
        {
          id: 'review-2',
          productId: 'placeholder-2',
          userId: 'user-2',
          rating: 5,
          title: 'Excellent service!',
          comment: 'The subscription offers great value for money.',
          isVerifiedPurchase: true,
          createdAt: new Date().toISOString(),
          isApproved: true
        }
      ],
      averageRating: 4.8
    },
    {
      id: 'placeholder-3',
      name: 'Placeholder Product 3',
      headline: 'New Arrival',
      title: 'Essential Placeholder Product',
      shortDescription: 'Budget-friendly placeholder for build time',
      description: 'This is a detailed description of our essential placeholder product that is used during build time when the API is not available.',
      unitPrice: 49.99,
      originalPrice: 59.99,
      stock: 200,
      isListed: true,
      isFeatured: false,
      rating: 4.2,
      isInStock: true,
      isDigital: false,
      isSubscription: false,
      brand: 'PlaceholderBrand',
      type: 'Basic',
      categoryId: 'basic-category',
      contents: [
        {
          id: 'content-3',
          entityId: 'placeholder-3',
          entityType: 'Product',
          url: '/placeholder-basic.jpg',
          contentType: 'Image',
          fileSize: 1536
        }
      ],
      metadata: [
        {
          id: 'meta-3',
          keyName: 'Size',
          keyValue: 'Medium'
        }
      ],
      specifications: [
        {
          id: 'spec-5',
          productId: 'placeholder-3',
          specKey: 'Weight',
          specValue: '300g',
          displayOrder: 1
        },
        {
          id: 'spec-6',
          productId: 'placeholder-3',
          specKey: 'Size',
          specValue: 'Medium',
          displayOrder: 2
        }
      ],
      reviews: [
        {
          id: 'review-3',
          productId: 'placeholder-3',
          userId: 'user-3',
          rating: 4,
          title: 'Good value',
          comment: 'Good value for money, would buy again',
          isVerifiedPurchase: true,
          createdAt: new Date().toISOString(),
          isApproved: true
        }
      ],
      averageRating: 4.2
    }
  ];
}

/**
 * Product service wrapper with build-time protection
 * Extends your existing product service with fallback data during builds
 */
export const createBuildProtectedService = () => {
  // Functions that return fallback data for build time
  const getPopularProductsProtected = async (limit: number = 15): Promise<any[]> => {
    if (isBuildTime()) {
      console.log('Build-time detected, using fallback data for popular products');
      return getFallbackProducts().slice(0, limit);
    }
    
    try {
      // Call your original API service
      return await apiService.get<any[]>('/api/products/popular', { limit });
    } catch (error) {
      console.error('Error fetching popular products:', error);
      // Return fallback data on error
      return getFallbackProducts().slice(0, limit);
    }
  };
  
  const getFeaturedProductsProtected = async (limit: number = 4): Promise<any[]> => {
    if (isBuildTime()) {
      console.log('Build-time detected, using fallback data for featured products');
      return getFallbackProducts().filter(p => p.isFeatured).slice(0, limit);
    }
    
    try {
      const result = await apiService.get<any>('/api/products', { 
        isFeatured: true, 
        pageSize: limit, 
      });
      return result.items;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return getFallbackProducts().filter(p => p.isFeatured).slice(0, limit);
    }
  };
  
  const getProductsProtected = async (filters?: any): Promise<any> => {
    if (isBuildTime()) {
      console.log('Build-time detected, using fallback data for getProducts');
      const fallbackData = getFallbackProducts();
      return {
        items: fallbackData,
        totalCount: fallbackData.length,
        totalPages: 1,
        currentPage: 1,
        pageSize: fallbackData.length
      };
    }
    
    try {
      return await apiService.get<any>('/api/products', filters);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };
  
  const getProductByIdProtected = async (id: string): Promise<any> => {
    if (isBuildTime()) {
      console.log(`Build-time detected, using fallback data for product ID: ${id}`);
      const fallbackData = getFallbackProducts();
      return fallbackData.find(p => p.id === id) || fallbackData[0];
    }
    
    try {
      return await apiService.get<any>(`/api/products/${id}`);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  };
  
  const getRelatedProductsProtected = async (params: {
    categoryId: string;
    excludeId?: string;
    limit?: number;
  }): Promise<any[]> => {
    if (isBuildTime()) {
      console.log('Build-time detected, using fallback data for related products');
      const { excludeId, limit = 4 } = params;
      const fallbackData = getFallbackProducts();
      const filtered = excludeId 
        ? fallbackData.filter(p => p.id !== excludeId)
        : fallbackData;
      return filtered.slice(0, limit);
    }
    
    try {
      const { categoryId, excludeId, limit = 4 } = params;
      return await apiService.get<any[]>(`/api/products/by-category/${categoryId}`, { 
        excludeId,
        pageSize: limit 
      });
    } catch (error) {
      console.error(`Error fetching related products by category:`, error);
      const fallbackData = getFallbackProducts();
      const { excludeId, limit = 4 } = params;
      return fallbackData
        .filter(p => excludeId ? p.id !== excludeId : true)
        .slice(0, limit);
    }
  };
  
  // Return the protected methods
  return {
    getPopularProducts: getPopularProductsProtected,
    getFeaturedProducts: getFeaturedProductsProtected,
    getProducts: getProductsProtected,
    getProductById: getProductByIdProtected,
    getRelatedProducts: getRelatedProductsProtected
  };
};