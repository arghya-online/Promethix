import React, { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Products from "./pages/Products";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import CustomProduct from "./pages/CustomProduct";
import OrderCart from "./pages/OrderCart";
import AppLayout from "./layouts/app-layout";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/customproduct",
          element: <CustomProduct />,
        },
        {
          path: "/ordercart",
          element: <OrderCart />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
