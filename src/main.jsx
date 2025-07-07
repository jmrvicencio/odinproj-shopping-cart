import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App";
import Store from "./components/Store";

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
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Navigate to="1" />,
          },
          {
            path: ":page",
            element: <Store />,
          },
        ],
      },
      // {
      //   path: "*",
      //   element: <Navigate to="/home" />,
      // },
    ],
  },
];

const queryClient = new QueryClient();
const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
