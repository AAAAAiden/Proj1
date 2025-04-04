import { createSlice } from '@reduxjs/toolkit';

const initialState = {
// [{ _id, name, price, quantity }]
  items: [],
  total: 0,
};

const calculateTotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find(i => i._id === item._id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      state.total = calculateTotal(state.items);
    },
    updateQuantity(state, action) {
      const { _id, quantity } = action.payload;
      const item = state.items.find(i => i._id === _id);
      if (item) item.quantity = quantity;
      state.total = calculateTotal(state.items);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(i => i._id !== action.payload);
      state.total = calculateTotal(state.items);
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;