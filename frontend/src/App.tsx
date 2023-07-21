import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  RootPage,
  HomePage,
  ErrorPage,
  CalendarPage,
  DevelopmentPage,
  GalleryPage,
  GuestHousePage,
} from "./pages/Pages";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "galeria", element: <GalleryPage /> },
        {
          path: "vendeghazak",
          children: [
            {
              index: true,
              element: <GuestHousePage />,
              id: "guestHouses",
            },
          ],
        },
        { path: "rolunk", element: <DevelopmentPage /> },
        { path: "kapcsolat", element: <DevelopmentPage /> },
        {
          path: "naptar",
          element: <CalendarPage />,
          id: "calendar",
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
