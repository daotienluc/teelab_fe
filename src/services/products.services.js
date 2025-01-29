import { http } from "./Config";

export const productServices = {
  getAllProduct: () => {
    return http.get("/products/allProducts");
  },
  productByCategory: () => {
    return http.get("/products/productCategory");
  },
  productByproductId: (id) => {
    return http.get(`/products/productByProductName/${id}`);
  },

  getProductByProductName: (productName) => {
    return http.get(`/products/search/${productName}`);
  },
  productByProductTypeId: (product_type_id) => {
    return http.get(`/products/productType/${product_type_id}`);
  },
  addProduct: (data) => {
    return http.post("/products/addProduct", data);
  },

  addCategoryProduct: (data) => {
    return http.post("/products/addCategoryProduct", data);
  },

  updateProduct: (id, data) => {
    return http.put(`/products/updateProduct/${id}`, data);
  },
  deleteProduct: (id) => {
    return http.delete(`/products/deleteProduct/${id}`);
  },
};
