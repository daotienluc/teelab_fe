import { http } from "./Config";

export const checkoutService = {
  // Lấy tất cả đơn hàng
  getAllOrder: () => {
    return http.get("/checkout/getAllOrder");
  },

  // thanh toán bằng momo
  payment: (data) => {
    return http.post("/checkout/payment", data);
  },

  // thanh toán khi nhận hàng
  payLater: (data) => {
    return http.post("/checkout/payLater", data);
  },

  // kiểm tra trạng thái đơn hàng
  checkStatusTransaction: (data) => {
    return http.post("/checkout/checkStatusTransaction", data);
  },
};
