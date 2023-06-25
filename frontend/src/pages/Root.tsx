import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import BookingProvider from "context/BookingContextProvider";
const Root = () => {
  return (
    <>
      <Navigation />
      <BookingProvider>
        <main className="w-full relative">
          <Outlet />
        </main>
      </BookingProvider>
    </>
  );
};

export default Root;
