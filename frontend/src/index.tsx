import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import PageTemplate from "./pages/PageTemplate";
import ErrorPage from "./pages/ErrorPage";
import { URLS } from "./constants/urls";
import SearchRoute from "./pages/SearchRoute";
import Route from "./pages/Route";
import SearchTimetable from "./pages/SearchTimetable";
import Timetable from "./pages/Timetable";

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
