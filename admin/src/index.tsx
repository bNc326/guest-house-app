import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "animate.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { HotelContextProvider } from "./context/HotelContextProvider";
import { AuthProvider } from "react-auth-kit";
import refreshApi from "./refreshApi";
import RefreshContextProvider from "./context/RefreshContextProvider";
import SocketContextProvider from "./context/SocketContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SocketContextProvider>
      <RefreshContextProvider>
        <HotelContextProvider>
          <AuthProvider
            authType={"cookie"}
            authName={"_auth"}
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === "https:"}
            refresh={refreshApi}
          >
            <App />
          </AuthProvider>
        </HotelContextProvider>
      </RefreshContextProvider>
    </SocketContextProvider>
  </React.StrictMode>
);
