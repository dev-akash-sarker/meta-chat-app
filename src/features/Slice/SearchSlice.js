import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchIn: "",
};

export const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    SearchAll: (state, action) => {
      state.searchIn = action.payload;
    },
  },
});

export const { SearchAll } = SearchSlice.actions;
export default SearchSlice.reducer;
