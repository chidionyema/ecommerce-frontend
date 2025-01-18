import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import axios, { AxiosProgressEvent } from 'axios';
import { Product, ProductState } from '../types/types';

// Define the shape of our product actions
type Action =
  | { type: 'SET_PRODUCTS'; products: Product[]; totalProducts: number }
  | { type: 'ADD_PRODUCT'; product: Product }
  | { type: 'UPDATE_PRODUCT'; product: Product }
  | { type: 'DELETE_PRODUCT'; id: string }
  | { type: 'SET_ERROR'; error: string };

// Define the shape of ProductState with an error property


// Initial state
const initialState: ProductState = {
  products: [],
  totalProducts: 0,
  error: '', // Initialize error as an empty string
};

// Create the context
const ProductContext = createContext<{
  state: ProductState;
  dispatch: React.Dispatch<Action>;
  fetchProducts: () => Promise<void>;
  addProduct: (productData: Partial<Product>) => Promise<Product>;
  updateProduct: (productId: string, productData: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  uploadProductContents: (
    productId: string,
    formData: FormData,
    onProgress?: (progressEvent: AxiosProgressEvent) => void
  ) => Promise<void>;
  uploadProductContentsChunked?: (
    productId: string,
    file: File,
    chunkSize: number,
    onProgress?: (uploadedBytes: number, totalBytes: number) => void
  ) => Promise<void>;
}>({
  state: initialState,
  dispatch: () => undefined,
  fetchProducts: async () => {},
  addProduct: async () => initialState.products[0],
  updateProduct: async () => initialState.products[0],
  deleteProduct: async () => {},
  uploadProductContents: async () => {},
});

function productReducer(state: ProductState, action: Action): ProductState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.products, totalProducts: action.totalProducts };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.product], totalProducts: state.totalProducts + 1 };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((p) => (p.id === action.product.id ? action.product : p)),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.id),
        totalProducts: state.totalProducts - 1,
      };
    case 'SET_ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
}

// Our provider
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Basic fetch
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get<Product[]>('https://api.local.ritualworks.com/api/products');
      dispatch({ type: 'SET_PRODUCTS', products: response.data, totalProducts: response.data.length });
    } catch (err) {
      console.error('Failed to fetch products:', err);
      dispatch({ type: 'SET_ERROR', error: 'Failed to fetch products. Please try again later.' });
    }
  }, []);

  // Create product with JSON only
  const addProduct = useCallback(async (productData: Partial<Product>): Promise<Product> => {
    try {
      const response = await axios.post<Product>('https://api.local.ritualworks.com/api/products', productData);
      dispatch({ type: 'ADD_PRODUCT', product: response.data });
      return response.data;
    } catch (err) {
      console.error('Failed to add product:', err);
      dispatch({ type: 'SET_ERROR', error: 'Failed to add product. Please try again later.' });
      throw err;
    }
  }, []);

  // Update product with JSON only
  const updateProduct = useCallback(async (productId: string, productData: Partial<Product>): Promise<Product> => {
    try {
      const response = await axios.put<Product>(`https://api.local.ritualworks.com/api/products/${productId}`, productData);
      dispatch({ type: 'UPDATE_PRODUCT', product: response.data });
      return response.data;
    } catch (err) {
      console.error('Failed to update product:', err);
      dispatch({ type: 'SET_ERROR', error: 'Failed to update product. Please try again later.' });
      throw err;
    }
  }, []);

  // Delete a product
  const deleteProduct = useCallback(async (id: string) => {
    try {
      await axios.delete(`https://api.local.ritualworks.com/api/products/${id}`);
      dispatch({ type: 'DELETE_PRODUCT', id });
    } catch (err) {
      console.error('Failed to delete product:', err);
      dispatch({ type: 'SET_ERROR', error: 'Failed to delete product. Please try again later.' });
      throw err;
    }
  }, []);

  /**
   * Upload product contents in a single request.
   * onProgress is an optional callback to handle progress events for large files.
   */
  const uploadProductContents = useCallback(async (
    productId: string,
    formData: FormData,
    onProgress?: (progressEvent: AxiosProgressEvent) => void
  ) => {
    try {
      await axios.post(
        `https://api.local.ritualworks.com/api/content/upload?entityId=${productId}&entityType=Product`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: onProgress,
        }
      );
    } catch (err) {
      console.error('Failed to upload product contents:', err);
      dispatch({ type: 'SET_ERROR', error: 'Failed to upload product contents. Please try again later.' });
      throw err;
    }
  }, []);

  /**
   * Chunked upload approach for large files.
   * This is a naive example that splits a file into chunkSize bytes
   * and sends them sequentially.
   */
  const uploadProductContentsChunked = useCallback(async (
    productId: string,
    file: File,
    chunkSize: number,
    onProgress?: (uploadedBytes: number, totalBytes: number) => void
  ) => {
    const totalSize = file.size;
    let offset = 0;
    let chunkIndex = 0;

    while (offset < totalSize) {
      const end = Math.min(offset + chunkSize, totalSize);
      const chunk = file.slice(offset, end);

      // Build form data with chunk
      const formData = new FormData();
      formData.append('files', chunk, `${file.name}.part${chunkIndex}`);

      try {
        await axios.post(
          `https://api.local.ritualworks.com/api/content/chunked-upload?entityId=${productId}&entityType=Product`,
          formData,
          {
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              if (onProgress) {
                const uploadedSoFar = offset + (progressEvent.loaded ?? 0);
                onProgress(uploadedSoFar, totalSize);
              }
            },
          }
        );
      } catch (err) {
        console.error('Chunk upload failed:', err);
        dispatch({ type: 'SET_ERROR', error: 'Chunk upload failed. Please try again later.' });
        throw err;
      }

      offset = end;
      chunkIndex++;
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductContext.Provider
      value={{
        state,
        dispatch,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        uploadProductContents,
        uploadProductContentsChunked,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
