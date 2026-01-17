import React, { useState } from "react";
import "./App.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "sonner";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { CartProvider } from "./context/cart-context";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import CustomProduct from "./pages/CustomProduct";
import OrderCart from "./pages/OrderCart";
import AppLayout from "./layouts/app-layout.jsx";
import Support from "./pages/Support";
import HowWeWork from "./pages/HowWeWork";

function App() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Clerk publishable key");
  }
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
          path: "/category/:slug",
          element: <Products />,
        },
        {
          path: "/product/:id",
          element: <ProductDetail />,
        },
        {
          path: "/custom",
          element: <CustomProduct />,
        },
        {
          path: "/support",
          element: <Support />,
        },
        {
          path: "/how-we-work",
          element: <HowWeWork />,
        },
        {
          path: "/cart",
          element: <OrderCart />,
        },
      ],
    },
  ]);
  return (
    <ClerkProvider
      appearance={{ theme: "simple" }}
      publishableKey={PUBLISHABLE_KEY}
    >
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-center" />
      </CartProvider>
    </ClerkProvider>
  );
}

export default App;
