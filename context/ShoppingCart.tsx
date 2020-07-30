import React, { createContext, useReducer } from "react";
import CartReducer from "./CartReducer";

export type Product = {
  id: number;
  price: number;
  image: string;
  name: string;
  quantity: number;
};

export type QuickPreview = {
  id: number;
  price: number;
  image: string;
  name: string;
};

export interface Init {
  cart: Product[];
  totalItems: number;
  totalAmount: number;
  bounce: boolean;
  removeProduct?: (id: number) => void;
  addProduct?: (selectedProducts: Product) => void;
  bouceEnd?: () => void;
}

const initialState = {
  cart: [],
  totalItems: 0,
  totalAmount: 0,
  bounce: false,
};

export const CartContext = createContext<Init>(initialState);
export const CartProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const removeProduct = (id: number) => {
    dispatch({
      type: "REMOVE_PRODUCT",
      payload: id,
    });
  };

  const addProduct = (selectedProducts: Product) => {
    dispatch({
      type: "ADD_PRODUCT",
      payload: selectedProducts,
    });
  };

  const bouceEnd = () => {
    dispatch({
      type: "BOUNCE_END",
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        totalItems: state.totalItems,
        totalAmount: state.totalAmount,
        bounce: state.bounce,
        removeProduct,
        addProduct,
        bouceEnd,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
