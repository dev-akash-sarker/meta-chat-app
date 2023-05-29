import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// eslint-disable-next-line no-unused-vars
import firebaseConfig from "./database/firebaseConfig";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./features/store/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
