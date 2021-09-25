import { CssBaseline } from "@mui/material";
import React from "react";
import AppRouter from "./router/AppRouter";
import reducer from "./redux/reducer.js";
import {initialState} from "./utils/constant";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./App.css"

const store = createStore(reducer, initialState);

const App = () => {
  return (
    <Provider className="provider" store={store}>
      <CssBaseline />
      <AppRouter />
    </Provider>
  );
};

export default App;
