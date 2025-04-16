import { http } from "./Config";

export const usersServices = {
  getAllUser: () => {
    return http.get("/users/getAllUser");
  },
  getUserById: (id) => {
    return http.get(`/users/getUserById/${id}`);
  },
  addUser: (data) => {
    return http.post("/users/addUser", data);
  },
  updateUser: (id, data) => {
    return http.put(`/users/updateUser/${id}`, data);
  },
  deleteUser: (id) => {
    return http.delete(`/users/deleteUser/${id}`);
  },
};
