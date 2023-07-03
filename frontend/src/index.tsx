import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "animate.css";
import App from "./App";
import BookingProvider from "context/BookingContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BookingProvider>
      <App />
    </BookingProvider>
  </React.StrictMode>
);
