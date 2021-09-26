import { CssBaseline } from "@mui/material";
import React from "react";
import AppRouter from "./router/AppRouter";
import reducer from "./redux/reducer.js";
import {initialState} from "./utils/constant";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./App.css"
import { ToastContainer } from "react-toastify";


const store = createStore(reducer, initialState);

const App = () => {
  return (
    <Provider className="provider" store={store}>
      <CssBaseline />
      <AppRouter />
      <ToastContainer />
    </Provider>
  );
};

export default App;
