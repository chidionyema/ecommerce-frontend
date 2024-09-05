import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product, ProductState, BasketItem, BasketState } from '../types/types';

type Action = 
    | { type: 'ADD_TO_BASKET'; product: Product }
    | { type: 'REMOVE_FROM_BASKET'; id: string }
    | { type: 'UPDATE_BASKET_QUANTITY'; id: string; quantity: number }
    | { type: 'REMOVE_ALL_QUANTITY'; id: string }
    | { type: 'INIT_BASKET'; items: BasketItem[] };

const initialState: BasketState = {
    items: [],
};

const BasketContext = createContext<{
    state: BasketState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => undefined,
});

const basketReducer = (state: BasketState, action: Action): BasketState => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            const existingProductIndex = state.items.findIndex(item => item.id === action.product.id);
            if (existingProductIndex >= 0) {
                const updatedItems = state.items.map((item, index) =>
                    index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
                );
                localStorage.setItem('basket', JSON.stringify(updatedItems));
                return { items: updatedItems };
            } else {
                const newItems = [...state.items, { ...action.product, quantity: 1 }];
                localStorage.setItem('basket', JSON.stringify(newItems));
                return { items: newItems };
            }
        case 'REMOVE_FROM_BASKET':
            const itemToRemoveIndex = state.items.findIndex(item => item.id === action.id);
            if (itemToRemoveIndex >= 0) {
                const updatedItems = state.items[itemToRemoveIndex].quantity > 1
                    ? state.items.map((item, index) =>
                          index === itemToRemoveIndex ? { ...item, quantity: item.quantity - 1 } : item
                      )
                    : state.items.filter(item => item.id !== action.id);
                localStorage.setItem('basket', JSON.stringify(updatedItems));
                return { items: updatedItems };
            }
            return state;
        case 'UPDATE_BASKET_QUANTITY':
            const itemToUpdateIndex = state.items.findIndex(item => item.id === action.id);
            if (itemToUpdateIndex >= 0) {
                const updatedItems = state.items.map((item, index) =>
                    index === itemToUpdateIndex ? { ...item, quantity: action.quantity } : item
                );
                localStorage.setItem('basket', JSON.stringify(updatedItems));
                return { items: updatedItems };
            }
            return state;
        case 'REMOVE_ALL_QUANTITY':
            const remainingItems = state.items.filter(item => item.id !== action.id);
            localStorage.setItem('basket', JSON.stringify(remainingItems));
            return { items: remainingItems };
        case 'INIT_BASKET':
            return { items: action.items };
        default:
            return state;
    }
};

export const BasketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(basketReducer, initialState);

    useEffect(() => {
        const storedBasket = localStorage.getItem('basket');
        if (storedBasket) {
            dispatch({ type: 'INIT_BASKET', items: JSON.parse(storedBasket) });
        }
    }, []);

    return (
        <BasketContext.Provider value={{ state, dispatch }}>
            {children}
        </BasketContext.Provider>
    );
};

export const useBasket = () => useContext(BasketContext);
