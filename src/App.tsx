import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import SwitchRoute from "./core/router/SwitchRoute";
import { connectToHub } from "./core/store/middlewares/signalr/signalrSlice";

function App() {
  useEffect(() => {
    connectToHub();
  });

  return (
    <BrowserRouter>
      <SwitchRoute />
    </BrowserRouter>
  );
}

export default App;
