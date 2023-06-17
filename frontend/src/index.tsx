import App from "./App";
import { URLS } from "./constants/urls";
import ErrorPage from "./pages/ErrorPage";
import FavouritePlaces from "./pages/FavouritePlaces/FavouritePlaces";
import NewFavouritePlace from "./pages/NewFavouritePlace/NewFavouritePlace";
import PageTemplate from "./pages/PageTemplate";
import Route from "./pages/Route";
import SearchRoute from "./pages/SearchRoute";
import SearchTimetable from "./pages/SearchTimetable";
import Timetable from "./pages/Timetable";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <PageTemplate />,
        children: [
          { path: "", loader: () => redirect(URLS.SEARCH_ROUTE) },
          {
            path: URLS.SEARCH_ROUTE,
            element: <SearchRoute />,
          },
          {
            path: URLS.ROUTE,
            element: <Route />,
          },
          {
            path: URLS.SEARCH_TIMETABLE,
            element: <SearchTimetable />,
          },
          {
            path: URLS.TIMETABLE,
            element: <Timetable />,
          },
          {
            path: URLS.FAVOURITE_PLACES,
            element: <FavouritePlaces />,
          },
          {
            path: URLS.NEW_FAVOURITE_PLACE,
            element: <NewFavouritePlace />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
