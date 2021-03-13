import React from "react";
import { Route, Switch } from "react-router";
import MainLayout from "../../common/mainLayout/MainLayout";
import Login from "../../features/auth/Login";
import Register from "../../features/auth/Register";
import { routes } from "./routes";

const SwitchRoute: React.FC = () => {
  return (
    <Switch>
      <Route path={routes.login}>
        <Login />
      </Route>
      <Route path={routes.register}>
        <Register />
      </Route>
      <Route path={routes.conversation}>
        <MainLayout />
      </Route>
      <Route path={routes.home}>
        <Login />
      </Route>
    </Switch>
  );
};

export default SwitchRoute;
