import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, clearCart } from '../store/cartSlice';
import { RootState } from '../store';
import { CartItem } from '../types/types';

const ShoppingCart: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div>
      {cart.items.map((item: CartItem) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.quantity}</p>
          <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
        </div>
      ))}
      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
    </div>
  );
};

export default ShoppingCart;
