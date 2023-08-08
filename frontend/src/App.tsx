import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  RootPage,
  HomePage,
  ErrorPage,
  CalendarPage,
  DevelopmentPage,
  GalleryPage,
  GuestHousePage,
  RatingPage,
  NewRatingPage,
} from "./pages/Pages";
import { loader as RatingLoader } from "./pages/Ratings";

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
            {
              path: "ertekeles",
              children: [
                {
                  index: true,
                  element: <RatingPage />,
                  loader: RatingLoader,
                  id: "rating",
                },
                {
                  path: "uj",
                  element: <NewRatingPage />,
                },
              ],
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
