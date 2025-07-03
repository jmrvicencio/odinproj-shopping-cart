import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <p>404, This page was not found!</p>,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: "home",
        element: <p>This is home!</p>,
      },
      {
        path: "store",
        element: <p>This is the store!</p>,
      },
      {
        path: "*",
        element: <Navigate to="/home" />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
