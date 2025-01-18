import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';

// Define the Category type
interface Category {
  id: string;
  name: string;
}

// Define the state shape
interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

// Define actions for the context
type Action = 
  | { type: 'SET_CATEGORIES'; categories: Category[] }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string | null };

// Initial state
const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Create the context
const CategoryContext = createContext<{
  state: CategoryState;
  fetchCategories: () => Promise<void>;
  error: string | null;
  loading: boolean; // ✅ Added loading to the context
}>({
  state: initialState,
  fetchCategories: async () => {},
  error: null,
  loading: false, // ✅ Added default loading state
});

// Reducer function to handle actions
function categoryReducer(state: CategoryState, action: Action): CategoryState {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.categories, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
    case 'SET_ERROR':
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
}

// Provider component
export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  const fetchCategories = React.useCallback(async () => {
    if (state.categories.length > 0) return; // Avoid duplicate fetches

    dispatch({ type: 'SET_LOADING', loading: true }); // Set loading state before fetching
    try {
      const response = await axios.get<Category[]>('https://api.local.ritualworks.com/api/category');
      dispatch({ type: 'SET_CATEGORIES', categories: response.data });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Failed to fetch categories:', errorMessage);
      dispatch({ type: 'SET_ERROR', error: 'Failed to fetch categories. Please try again later.' });
    }
  }, [state.categories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <CategoryContext.Provider
      value={{
        state,
        fetchCategories,
        error: state.error, 
        loading: state.loading, // ✅ Added loading here
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

// Hook to use the CategoryContext
export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context; // ✅ Now includes loading
};
