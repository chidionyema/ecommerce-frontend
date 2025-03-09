// File: types/api.types.ts

export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
  }
  
  export interface ApiError {
    message: string;
    statusCode: number;
    errors?: Record<string, string[]>;
  }
  
  export interface RequestParams {
    [key: string]: any;
  }
  
  export interface PaginationParams {
    page?: number;
    pageSize?: number;
  }
  
  export interface FilterParams {
    [key: string]: any;
  }
  
  export interface RequestParams extends PaginationParams, FilterParams {}