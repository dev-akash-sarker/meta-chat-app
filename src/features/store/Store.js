import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Slice/LoginSlice";
import activeSlice from "../Slice/ActiveuserSlice";
import searchSlice from "../Slice/SearchSlice";
// const reducers = combineReducers({
//   logins: authSlice,
// read: authRead
// });

const store = configureStore({
  reducer: {
    login: authSlice,
    active: activeSlice,
    search: searchSlice,
  },
});

export default store;
