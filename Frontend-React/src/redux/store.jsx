import { configureStore } from '@reduxjs/toolkit';
import cartSlicer from './cartSlicer';

export const store = configureStore({
  reducer: {
    cart: cartSlicer,
  },
});
