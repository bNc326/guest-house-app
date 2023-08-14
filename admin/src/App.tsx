import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Error from "./pages/Error";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Booking from "./pages/Booking/Booking";
import EditBooking, {
  loader as editBookingLoader,
} from "./pages/Booking/EditBooking";
import DisabledDays from "./pages/DisabledDays/DisabledDays";
import GuestHouses from "./pages/GuestHouses/GuestHouses";
import EditGuestHouses from "./pages/GuestHouses/EditGuestHouses";
import { loader as editHotelLoader } from "./pages/GuestHouses/EditGuestHouses";
import NewGuestHouses from "./pages/GuestHouses/NewGuestHouses";
import Logout from "./pages/Logout";
import Gallery from "./pages/Gallery/Gallery";
import { RequireAuth } from "react-auth-kit";
import Rating from "./pages/Rating/Rating";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RequireAuth loginPath="/login">
          <Root />
        </RequireAuth>
      ),
      errorElement: <Error />,
      children: [
        { index: true, element: <Admin /> },
        {
          path: "foglalasi-naptar",
          id: "booking",
          children: [
            { index: true, element: <Booking /> },
            {
              path: ":bookingId",
              element: <EditBooking />,
              id: "editBooking",
              loader: editBookingLoader,
            },
          ],
        },
        {
          path: "lezart-naptar",
          id: "disabled-days",
          element: <DisabledDays />,
        },
        {
          path: "vendeghaz",
          id: "guest-house",
          children: [
            { index: true, element: <GuestHouses /> },
            {
              path: ":guestHouseId",
              element: <EditGuestHouses />,
              id: "editGuestHouse",
              loader: editHotelLoader,
            },
            {
              path: "uj-vendeghaz",
              element: <NewGuestHouses />,
            },
          ],
        },
        {
          path: "galeria",
          id: "gallery",
          element: <Gallery />,
        },
        { path: "kapcsolat", element: <h1>kapcsolat</h1> },
        { path: "email", element: <h1>email</h1> },
        { path: "ertekeles", element: <Rating /> },
      ],
    },
    { path: "login", element: <Login /> },
    { path: "logout", element: <Logout /> },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
