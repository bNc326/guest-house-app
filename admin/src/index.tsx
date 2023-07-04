import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "animate.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { HotelContextProvider } from "./context/HotelContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HotelContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </HotelContextProvider>
  </React.StrictMode>
);
