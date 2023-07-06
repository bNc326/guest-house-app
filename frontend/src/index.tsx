import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "animate.css/animate.min.css";
import App from "./App";
import BookingProvider from "context/BookingContextProvider";
import { HotelContextProvider } from "context/HotelContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HotelContextProvider>
      <BookingProvider>
        <App />
      </BookingProvider>
    </HotelContextProvider>
  </React.StrictMode>
);
