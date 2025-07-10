import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
  quantity: 0
};

const cartSlicer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
  const item = state.items.find(i => i.id === action.payload.id);
  if (item) {
    item.quantity += action.payload.quantity;
  } else {
    state.items.push({ ...action.payload });
  }
  state.total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  state.quantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
},

    removeFromCart(state, action) {
      const id = action.payload;
      const index = state.items.findIndex(i => i.id === id);
      if (index !== -1) {
        const item = state.items[index];
        state.quantity -= item.quantity;
        state.total -= item.price * item.quantity;
        state.items.splice(index, 1);
      }
    },

    incrementQuantity(state, action) {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity += 1;
        state.quantity += 1;
        state.total += item.price;
      }
    },

    decrementQuantity(state, action) {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.quantity -= 1;
        state.total -= item.price;
      } else if (item && item.quantity === 1) {
        state.quantity -= 1;
        state.total -= item.price;
        state.items = state.items.filter(i => i.id !== id);
      }
    },

    clearCart(state) {
      state.items = [];
      state.total = 0;
      state.quantity = 0;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart
} = cartSlicer.actions;

export default cartSlicer.reducer;
