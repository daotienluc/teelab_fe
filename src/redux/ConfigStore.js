import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/user.slice";
import cartSlice from "./slice/cart.slice";

export const store = configureStore({
  reducer: { userSlice, cartSlice },
});
