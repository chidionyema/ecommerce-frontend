import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Product, ProductState } from '../types/types';

type Action =
    | { type: 'SET_PRODUCTS'; products: Product[]; totalProducts: number }
    | { type: 'ADD_PRODUCT'; product: Product }
    | { type: 'UPDATE_PRODUCT'; product: Product }
    | { type: 'DELETE_PRODUCT'; id: string };

const initialState: ProductState = {
    products: [],
    totalProducts: 0,
};

const ProductContext = createContext<{
    state: ProductState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => undefined,
});

const productReducer = (state: ProductState, action: Action): ProductState => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.products, totalProducts: action.totalProducts };
        case 'ADD_PRODUCT':
            return { ...state, products: [...state.products, action.product], totalProducts: state.totalProducts + 1 };
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === action.product.id ? action.product : product
                ),
            };
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter((product) => product.id !== action.id),
                totalProducts: state.totalProducts - 1,
            };
        default:
            return state;
    }
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => useContext(ProductContext);
