import { http } from "./Config";

export const usersServices = {
  getAllUser: () => {
    return http.get("/users/All-users");
  },
  getUserById: (id) => {
    return http.get(`/users/getUserById/${id}`);
  },
  addUser: (data) => {
    return http.post("/users/add-user", data);
  },
  updateUser: (id, data) => {
    return http.put(`/users/update-user/${id}`, data);
  },
  deleteUser: (id) => {
    return http.delete(`/users/delete-user/${id}`);
  },
};
