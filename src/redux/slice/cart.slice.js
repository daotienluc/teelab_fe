import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCard: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cart.find(
        (item) => item.product_id === product.product_id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },

    removeFromCard: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter((item) => item.product_id !== productId);
    },
  },
});

export const { addToCard, removeFromCard } = cartSlice.actions;

export default cartSlice.reducer;
