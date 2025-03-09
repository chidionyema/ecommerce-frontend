// File: types/haworks.types.ts

// API response types
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
  
  export interface PaginationParams {
    page?: number;
    pageSize?: number;
  }
  
  export interface FilterParams {
    [key: string]: any;
  }
  // Define the shape of the user profile
  export interface UserProfile {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
    bio?: string;
    avatarUrl?: string;
    website?: string;
    lastLogin?: string;
  }
  
  // Define the shape of the user
  export interface User {
    id: string;
    userName: string;
    email: string;
    profile?: UserProfile;
    isActive?: boolean;
    isSubscribed: boolean;
  }
  
  // Login credentials interface
  export interface LoginCredentials {
    username: string;
    password: string;
    rememberMe?: boolean;
  }


  export interface SubscriptionDetails {
  planName: string;
  planPrice: number;
  currentPeriodEnd: string;
  status: string;
  cancelAtPeriodEnd: boolean;
}

export interface SubscriptionPlan {
  priceId: string;
  name?: string;
}

export interface GuestCheckoutInfo {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}


export interface CartItem {
  id: string;
  name: string;
  price: number;
  isSubscription: boolean;
  image: string;
  quantity: number;
}

// Update this in your haworks.types.ts file
export interface CheckoutContextType {
    // State
    isProcessing: boolean;
    error: string | null;
    
    // Cart Management
    cartItems: CartItem[];
    cartTotal: number;
    cartCount: number;
    
    // Actions
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    
    // Checkout Actions
    checkout: (guestInfo?: GuestCheckoutInfo, redirectPath?: string, saveShippingInfo?: boolean) => Promise<void>;
    directCheckout: (
      items: Array<CartItem | {productId: string, quantity: number}>, 
      guestInfo?: GuestCheckoutInfo, 
      redirectPath?: string, 
      saveShippingInfo?: boolean
    ) => Promise<void>;
    subscriptionCheckout: (plan: SubscriptionPlan, redirectPath?: string) => Promise<void>;
    
    // Guest checkout
    isGuestCheckout: boolean;
    setIsGuestCheckout: (isGuest: boolean) => void;
  }

export type AuthContextType = {
  user: User | null;
  isSubscribed: boolean;
  isAuthLoading: boolean;
  token: string | null;
  subscriptionDetails: SubscriptionDetails | null;
  login: (credentials: { username: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  register: (user: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    captchaToken: string;
  }) => Promise<{ success: boolean; errors?: Array<{ message: string; field?: string }> }>;
  logout: () => Promise<void>;
  subscribe: (priceId: string) => Promise<{ success: boolean; error?: string }>;
  cancelSubscription: () => Promise<{ success: boolean; error?: string }>;
  updatePaymentMethod: () => Promise<{ success: boolean; error?: string }>;
  refreshSubscriptionStatus: () => Promise<void>;
  refreshSubscriptionDetails: () => Promise<void>;
  loginWithProvider: (provider: string) => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
};





  export interface RequestParams extends PaginationParams, FilterParams {}
  
  // Product types
  export interface ProductDto {
    id: string;
    name: string;
    headline: string;
    title: string;
    shortDescription: string;
    description: string;
    unitPrice: number;
    originalPrice: number;
    stock: number;
    isListed: boolean;
    isFeatured: boolean;
    rating: number;
    isInStock: boolean;
    isDigital: boolean;
    isSubscription: boolean;
    brand: string;
    type: string;
    categoryId: string;
    contents: ContentDto[];
    metadata: ProductMetadataDto[];
    // New properties for reviews and specifications
    specifications?: ProductSpecificationDto[];
    reviews?: ProductReviewDto[];
    averageRating?: number;
  }
  
  export interface ProductCreateDto {
    id: string;
    name: string;
    headline: string;
    title: string;
    shortDescription: string;
    description: string;
    unitPrice: number;
    originalPrice: number;
    stock: number;
    isListed: boolean;
    isDigital: boolean;
    isSubscription: boolean;
    isFeatured: boolean;
    rating: number;
    isInStock: boolean;
    brand: string;
    type: string;
    categoryId: string;
    contents: ContentDto[];
    metadata: ProductMetadataDto[];
    // New properties for reviews and specifications
    specifications?: ProductSpecificationDto[];
    reviews?: ProductReviewDto[];
    averageRating?: number;
  }
  
  export interface ProductListResponse {
    items: ProductDto[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  }
  
  export interface ProductFilter {
    page?: number;
    pageSize?: number;
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    isFeatured?: boolean;
    isInStock?: boolean;
    brand?: string;
    type?: string;
    sort?: string;
  }
  
  export interface ProductMetadataDto {
    id: string;
    keyName: string;
    keyValue: string;
  }
  
  // New Specification types
  export interface ProductSpecificationDto {
    id: string;
    productId: string;
    specKey: string;
    specValue: string;
    group?: string;
    displayOrder: number;
  }
  
  export interface ProductSpecificationCreateDto {
    specKey: string;
    specValue: string;
    group?: string;
    displayOrder?: number;
  }
  
  // New Review types
  export interface ProductReviewDto {
    id: string;
    productId: string;
    userId: string;
    rating: number;
    title: string;
    comment?: string;
    isVerifiedPurchase: boolean;
    createdAt: string;
    isApproved: boolean;
  }
  
  export interface ProductReviewCreateDto {
    productId: string;
    rating: number;
    title: string;
    comment?: string;
  }
  
  export interface ProductReviewSummary {
    averageRating: number;
    totalReviews: number;
    ratingDistribution: {
      [key: number]: number;  // Maps rating (1-5) to count
    };
  }
  
  // Category types
  export interface CategoryDto {
    id: string;
    name: string;
  }
  
  // Content types
  export enum ContentType {
    Image = 'Image',
    Document = 'Document',
    Video = 'Video',
    Other = 'Other'
  }
  
  export interface ContentDto {
    id: string;
    entityId: string;
    entityType: string;
    url: string;
    contentType: string;
    fileSize: number;
  }
  
  export interface ContentUploadResult {
    bucketName: string;
    objectName: string;
    contentType: string;
    fileSize: number;
    versionId: string;
    storageDetails: string;
    path: string;
  }
  
  // Chunked Upload types
  export interface ChunkSessionRequest {
    entityId: string;
    fileName: string;
    totalSize: number;
    totalChunks: number;
    contentType?: string;
  }
  
  export interface ChunkSessionDto {
    sessionId: string;
    expiresAt: string;
    totalChunks: number;
  }
  
  export interface UploadProgressEvent {
    sessionId?: string;
    fileName: string;
    loaded: number;
    total: number;
    percentComplete: number;
    currentChunk: number;
    totalChunks: number;
    status: 'initializing' | 'uploading' | 'processing' | 'completed' | 'error';
    error?: string;
  }
  
  // StorageInfo record from C#
  export interface StorageInfo {
    fileSize: number;
    bucketName: string;
    objectName: string;
    eTag: string;
    storageDetails: string;
    path: string;
  }