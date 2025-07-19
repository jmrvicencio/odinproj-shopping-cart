import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App";
import Store from "./components/Store";
import StoreRedirect from "./components/StoreRedirect";
// import GamePage from "./components/GamePage";
import Home from "./Home";
import Cart from "./Cart";

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
        element: <Home />,
      },
      {
        path: "store",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Store />,
          },
          {
            path: ":game",
            lazy: async () => {
              let module = await import("./Game");
              console.log(module);
              return { Component: module.default };
            },
          },
        ],
      },
      {
        path: "cart",
        element: <Cart />,
      },
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
