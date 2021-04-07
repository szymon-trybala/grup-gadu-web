import { HubConnectionState } from "@microsoft/signalr";
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import SwitchRoute from "./core/router/SwitchRoute";
import { connection } from "./core/store/middlewares/signalr/signalrSlice";
import { alert } from "./common/alerts/alerts";
import { useAppSelector } from "./core/store/hooks";

function App() {
  const user = useAppSelector((s) => s.authSlice).user;

  useEffect(() => {
    if (user && connection.state !== HubConnectionState.Connected) {
      connection
        .start()
        .then(() => {
          console.log("Started connection via SignalR");
        })
        .catch((err) => {
          console.error(err);
          alert.error("Nie udało się nawiązać połączenia z serwerem");
        });
    }
  }, [user]);

  return (
    <BrowserRouter>
      <SwitchRoute />
    </BrowserRouter>
  );
}

export default App;
