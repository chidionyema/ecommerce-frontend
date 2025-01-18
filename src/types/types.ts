export interface Content {
  id: string;
  entityId: string;
  entityType: string; // e.g., "Product"
  contentType: 'Image' | 'Asset'; // Match backend `ContentType` enum
  url: string;
  blobName: string;
  createdAt: string;
}


export interface Product {
  id: string;
  name: string;
  headline: string;
  title: string;
  shortDescription: string;
  description: string;
  authorAvatarUrl: string;
  authorName: string;
  unitPrice: number;
  stock: number;
  categoryId: string;
  contents: Content[]; // Use generic Content for both images and assets
  rating: number;
  new: boolean;
  brand: string;
  type: 'physical' | 'digital';
  inStock: boolean;
  reviews?: { user: string; comment: string; rating: number }[];
  metadata?: ProductMetadata[]; 
}

export interface ProductMetadata {
  //id: string;
  keyName: string;
  keyValue: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface BasketItem extends Product {
  quantity: number;
}


export interface CartItem {
  productid: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface BasketState {
  items: BasketItem[];
}

export interface ProductState {
  products: Product[];
  totalProducts: number;
  error: string;
}
