import React from "react";
import { Route, Switch } from "react-router";
import Login from "../../features/auth/Login";
import Register from "../../features/auth/Register";
import Messages from "../../features/messages/Messages";
import { useAppSelector } from "../store/hooks";
import { routes } from "./routes";

const SwitchRoute: React.FC = () => {
  const user = useAppSelector((s) => s.authSlice.user);

  return (
    <Switch>
      <Route path={routes.login}>
        <Login />
      </Route>
      <Route path={routes.register}>
        <Register />
      </Route>
      <Route path={routes.chat}>
        <Messages />
      </Route>
      <Route path={routes.home}>{user ? <Messages /> : <Login />}</Route>
    </Switch>
  );
};

export default SwitchRoute;
