import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const cart = state.cart;

      const existingProduct = cart.find(
        (item) => item.product_id === product.product_id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    },
    handleDeleteCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter((item) => item.product_id !== productId);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    updateCartQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cart.find((item) => item.product_id === productId);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const { addToCart, handleDeleteCart, updateCartQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
