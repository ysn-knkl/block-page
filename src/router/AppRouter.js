import React from "react";
import GeneralBlock from "../pages/GeneralBlock";
import Technology from "../pages/Technology";
import Camping from "../pages/Camping";
import Sports from "../pages/Sports";
import TheAnother from "../pages/TheAnother";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import AddItem from "../pages/AddItem";
import ForgotPassword from "../pages/ForgotPassword";
import DetailCard from "../pages/DetailCard";
import UpdateCard from "../pages/UpdateCard";
import Profile from "../pages/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../utils/AuthContext";
import PrivateRoute from "./PrivateRouter";

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute path="/addItem" component={AddItem} />
          <PrivateRoute path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/detail/:id" component={DetailCard} />
          <PrivateRoute path="/update-blog/:id" component={UpdateCard} />
          <Route path="/login" component={Login} />
          <Route path="/technology" component={Technology} />
          <Route path="/camping" component={Camping} />
          <Route path="/sports" component={Sports} />
          <Route path="/theanother" component={TheAnother} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/" component={GeneralBlock} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
