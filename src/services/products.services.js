import { http } from "./Config";

export const productServices = {
  getAllProduct: () => {
    return http.get("/products/allProducts");
  },
  productByCategory: () => {
    return http.get("/products/product-category");
  },
  productByproductId: (id) => {
    return http.get(`/products/product-by-productName/${id}`);
  },

  getProductByProductName: (productName) => {
    return http.get(`/products/search/${productName}`);
  },
  productByProductTypeId: (product_type_id) => {
    return http.get(`/products/product-type/${product_type_id}`);
  },
  addProduct: (data) => {
    return http.post("/products/them-san-pham", data);
  },

  addCategoryProduct: (data) => {
    return http.post("/products/them-danh-muc", data);
  },

  updateProduct: (id, data) => {
    return http.put(`/products/update-product/${id}`, data);
  },
  deleteProduct: (id) => {
    return http.delete(`/products/delete-product/${id}`);
  },
};
