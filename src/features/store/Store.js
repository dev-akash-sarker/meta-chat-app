import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Slice/LoginSlice";
// const reducers = combineReducers({
//   logins: authSlice,
// read: authRead
// });

const store = configureStore({
  reducer: {
    login: authSlice,
  },
});

export default store;
