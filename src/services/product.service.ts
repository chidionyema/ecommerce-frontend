// File: services/product.service.ts
import { apiService } from './api.service';
import { 
  ProductDto, 
  ProductCreateDto,
  ProductListResponse, 
  ProductFilter, 
  ContentDto
} from '../types/haworks.types';

class ProductService {
  private readonly baseUrl = '/api/products';
  
  // Customer-facing methods
  public async getProducts(filters?: ProductFilter): Promise<ProductListResponse> {
    try {
      return await apiService.get<ProductListResponse>(this.baseUrl, filters);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
  
  public async getProductById(id: string): Promise<ProductDto> {
    try {
      return await apiService.get<ProductDto>(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }
  
  public async getFeaturedProducts(limit: number = 4): Promise<ProductDto[]> {
    try {
      const result = await apiService.get<ProductListResponse>(this.baseUrl, { 
        isFeatured: true, 
        pageSize: limit, 
      });
      return result.items;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  }
  
  public async getRelatedProducts(params: {
    categoryId: string;
    excludeId?: string;
    limit?: number;
  }): Promise<ProductDto[]> {
    try {
      const { categoryId, excludeId, limit = 4 } = params;
      
      return await apiService.get<ProductDto[]>(`${this.baseUrl}/by-category/${categoryId}`, { 
        excludeId,
        pageSize: limit 
      });
    } catch (error) {
      console.error(`Error fetching related products by category:`, error);
      throw error;
    }
  }
  
  // Admin-facing methods
  public async createProduct(productData: ProductCreateDto): Promise<ProductDto> {
    try {
      return await apiService.post<ProductDto>(this.baseUrl, productData);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }
  
  public async updateProduct(id: string, productData: ProductCreateDto): Promise<ProductDto> {
    try {
      return await apiService.put<ProductDto>(`${this.baseUrl}/${id}`, productData);
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  }
  
  // New method: Bulk update products
  public async bulkUpdateProducts(ids: string[], updateData: Partial<ProductCreateDto>): Promise<{ message: string; updatedCount: number }> {
    try {
      return await apiService.put<{ message: string; updatedCount: number }>(`${this.baseUrl}/bulk-update`, { ids, ...updateData });
    } catch (error) {
      console.error('Error performing bulk update:', error);
      throw error;
    }
  }
  
  public async deleteProduct(id: string): Promise<void> {
    try {
      await apiService.delete<void>(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  }
  
  public async bulkDeleteProducts(ids: string[]): Promise<{ message: string; deletedCount: number }> {
    try {
      return await apiService.post<{ message: string; deletedCount: number }>(`${this.baseUrl}/bulk-delete`, { ids });
    } catch (error) {
      console.error('Error performing bulk delete:', error);
      throw error;
    }
  }
}

export const productService = new ProductService();
