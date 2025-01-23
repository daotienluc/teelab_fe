import { http } from "./Config";

export const cartServices = {
  addToCart: (data) => {
    return http.post("/cart/addToCart", data);
  },
  getCartById: (id) => {
    return http.post("/cart/getCartById", { id });
  },
};
