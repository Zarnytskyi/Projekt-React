import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
  quantity: 10
};

const cartSlicer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.items.push(action.payload);
      state.total += action.payload.price;
      state.quantity += 1;
    },
    removeFromCart(state, action) {
      const index = state.items.findIndex(i => i.id === action.payload);
      if (index !== -1) {
        state.total -= state.items[index].price;
        state.items.splice(index, 1);
        state.quantity -= 1;
      }
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
      state.quantity = 0;
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlicer.actions;
export default cartSlicer.reducer;
