import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Helper: get cart from localStorage or fallback to empty
const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

const initialState = {
  cartItems: getInitialCart(),
};

// Action types
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';

function cartReducer(state, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const { product, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === product._id);
      let updatedCart;

      if (existingItem) {
        updatedCart = state.cartItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updatedCart = [...state.cartItems, { ...product, quantity }];
      }

      return { ...state, cartItems: updatedCart };
    }
    case REMOVE_FROM_CART: {
      const productId = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== productId),
      };
    }
    case UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      if (quantity < 1) return state;
      const updatedCart = state.cartItems.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      );
      return { ...state, cartItems: updatedCart };
    }
    case CLEAR_CART: {
      return { ...state, cartItems: [] };
    }
    default:
      return state;
  }
}

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Save cartItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const addToCart = (product, quantity = 1) => {
    dispatch({ type: ADD_TO_CART, payload: { product, quantity } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: REMOVE_FROM_CART, payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: UPDATE_QUANTITY, payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
