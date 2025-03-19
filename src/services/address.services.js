import { http } from "./Config";

export const addressServices = {
  getAllTinhThanh: () => {
    return http.get("https://esgoo.net/api-tinhthanh/1/0.htm");
  },
  getDataHuyen: (id) => {
    return http.get(`https://esgoo.net/api-tinhthanh/2/${id}.htm`);
  },
  getdataPhuongXa: (id) => {
    return http.get(`https://esgoo.net/api-tinhthanh/3/${id}.htm`);
  },
};
