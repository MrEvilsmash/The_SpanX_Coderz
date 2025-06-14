import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import goldRateReducer from './goldRateSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    users: userReducer,
    cart: cartReducer,
    goldRate: goldRateReducer,
  },
});
