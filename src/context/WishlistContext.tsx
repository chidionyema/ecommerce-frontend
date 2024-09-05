import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product } from '../types/types';

interface WishlistState {
    items: Product[];
}

type Action = 
    | { type: 'ADD_TO_WISHLIST'; product: Product }
    | { type: 'REMOVE_FROM_WISHLIST'; id: string }
    | { type: 'INIT_WISHLIST'; items: Product[] };

const initialState: WishlistState = {
    items: [],
};

const WishlistContext = createContext<{
    state: WishlistState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => undefined,
});

const wishlistReducer = (state: WishlistState, action: Action): WishlistState => {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':
            if (state.items.some(item => item.id === action.product.id)) {
                return state;
            }
            const newItems = [...state.items, action.product];
            localStorage.setItem('wishlist', JSON.stringify(newItems));
            return { items: newItems };
        case 'REMOVE_FROM_WISHLIST':
            const updatedItems = state.items.filter(item => item.id !== action.id);
            localStorage.setItem('wishlist', JSON.stringify(updatedItems));
            return { items: updatedItems };
        case 'INIT_WISHLIST':
            return { items: action.items };
        default:
            return state;
    }
};

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(wishlistReducer, initialState);

    useEffect(() => {
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            dispatch({ type: 'INIT_WISHLIST', items: JSON.parse(storedWishlist) });
        }
    }, []);

    return (
        <WishlistContext.Provider value={{ state, dispatch }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
