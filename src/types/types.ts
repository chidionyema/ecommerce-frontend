export interface Post {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Comment {
    id: string;
    postId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
}


export interface ProductImage {
  id: string;
  imageUrl: string;
  productId: string;
  product?: Product;
}

export interface ProductAsset {
  id: string;
  imageUrl: string;
  productId: string;
  product?: Product;
}
export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  assets: any[];
  rating: number;
  new: boolean;
  brand: string;
  type: 'physical' | 'digital';
  inStock: boolean;
  reviews?: { user: string; comment: string; rating: number }[]; // Add this line
}

export interface Review {
  user: string;
  comment: string;
  rating: number;
}

export interface BasketItem extends Product {
  quantity: number;

}

export interface BasketState {
  items: BasketItem[];
}
export interface ProductState {
  products: Product[];
  totalProducts: number;
}
