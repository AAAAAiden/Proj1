import { createSlice } from '@reduxjs/toolkit';

const initialState = {
// [{ _id, name, price, quantity }], name can be removed
  items: [],
  total: 0
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
      // actually, this never runs since we only need addToCart once
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      state.total = calculateTotal(state.items);
    },

    updateQuantity(state, action) {
      const { _id, quantity } = action.payload;
      const itemid = state.items.findIndex(i => i._id === _id);
      if (itemid !== -1) {
        if (quantity <= 0) {
          state.items.splice(itemid, 1);
        } else {
          state.items[itemid].quantity = quantity;
        }
        state.total = calculateTotal(state.items);
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(i => i._id !== action.payload);
      state.total = calculateTotal(state.items);
    },

    clearCart(state) {
      state.items = [];
      state.total = 0;
    }
  }
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;