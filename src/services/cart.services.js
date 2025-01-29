import { http } from "./Config";

export const cartServices = {
  addToCart: (data) => {
    return http.post("/cart/addToCart", data);
  },
  getCartById: (id) => {
    return http.get(`/cart/getCartById/${id}`);
  },
  deleteProductCart: (id) => {
    return http.delete(`/cart/deleteProductCart/${id}`);
  },
};
