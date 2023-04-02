import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : null,
};

export const userSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    Loginusers: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

export const { Loginusers } = userSlice.actions;
export default userSlice.reducer;
