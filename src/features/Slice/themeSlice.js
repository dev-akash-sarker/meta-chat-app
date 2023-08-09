import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeIn: localStorage.getItem("mode")
    ? JSON.parse(localStorage.getItem("mode"))
    : false,
};

export const themeSlice = createSlice({
  name: "Darkmode",
  initialState,
  reducers: {
    ThemeMode: (state, action) => {
      state.themeIn = action.payload;
    },
  },
});

export const { ThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
