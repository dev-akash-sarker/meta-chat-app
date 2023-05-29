import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeChat: null,
};

export const ActiveuserSlice = createSlice({
  name: "active",
  initialState,
  reducers: {
    Activeusers: (state, action) => {
      state.activeChat = action.payload;
    },
  },
});

export const { Activeuser } = ActiveuserSlice.actions;
export default ActiveuserSlice.reducer;
