import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null,
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    handleUpdateUser: (state, action) => {
      state.userData = action.payload;
    },
    handleDeleteUser: (state) => {
      state.userData = null;
    },
  },
});

export const { handleUpdateUser, handleDeleteUser } = userSlice.actions;

export default userSlice.reducer;
