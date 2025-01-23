import { http } from "./Config";

export const authService = {
  register: (data) => {
    return http.post("/auth/register", data);
  },
  login: (data) => {
    return http.post("/auth/login", data);
  },
  loginFacebook: (data) => {
    return http.post("/auth/login-facebook", data);
  },
  loginGoogle: (data) => {
    return http.post("/auth/login-google", data);
  },
};
