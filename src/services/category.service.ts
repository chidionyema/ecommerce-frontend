

// File: services/category.service.ts
import { apiService } from './api.service';
import { CategoryDto } from '../types/haworks.types';

class CategoryService {
  private readonly baseUrl = '/api/category';
  
  public async getCategories(): Promise<CategoryDto[]> {
    try {
      return await apiService.get<CategoryDto[]>(this.baseUrl);
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
  
  public async getCategoryById(id: string): Promise<CategoryDto> {
    try {
      return await apiService.get<CategoryDto>(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      throw error;
    }
  }
  
  public async createCategory(name: string): Promise<CategoryDto> {
    try {
      return await apiService.post<CategoryDto>(this.baseUrl, { name });
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }
  
  public async updateCategory(id: string, name: string): Promise<CategoryDto> {
    try {
      return await apiService.put<CategoryDto>(`${this.baseUrl}/${id}`, { id, name });
    } catch (error) {
      console.error(`Error updating category ${id}:`, error);
      throw error;
    }
  }
  
  public async deleteCategory(id: string): Promise<void> {
    try {
      await apiService.delete<void>(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error);
      throw error;
    }
  }
}

export const categoryService = new CategoryService();
