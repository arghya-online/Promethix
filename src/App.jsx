import React, { useState, lazy, Suspense } from "react";
import "./App.css";
import { Toaster } from "sonner";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { CartProvider } from "./context/cart-context";
import { AuthProvider } from "./context/auth-context";
import AppLayout from "./layouts/app-layout.jsx";

// Lazy Load Pages
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Products = lazy(() => import("./pages/Products"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const About = lazy(() => import("./pages/About"));
const CustomProduct = lazy(() => import("./pages/CustomProduct"));
const OrderCart = lazy(() => import("./pages/OrderCart"));
const Orders = lazy(() => import("./pages/Orders"));
const Profile = lazy(() => import("./pages/Profile"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Support = lazy(() => import("./pages/Support"));
const HowWeWork = lazy(() => import("./pages/HowWeWork"));

// Loading Fallback Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<PageLoader />}>
              <LandingPage />
            </Suspense>
          ),
        },
        {
          path: "/about",
          element: (
            <Suspense fallback={<PageLoader />}>
              <About />
            </Suspense>
          ),
        },
        {
          path: "/products",
          element: (
            <Suspense fallback={<PageLoader />}>
              <Products />
            </Suspense>
          ),
        },
        {
          path: "/category/:slug",
          element: (
            <Suspense fallback={<PageLoader />}>
              <Products />
            </Suspense>
          ),
        },
        {
          path: "/product/:id",
          element: (
            <Suspense fallback={<PageLoader />}>
              <ProductDetail />
            </Suspense>
          ),
        },
        {
          path: "/custom",
          element: (
            <Suspense fallback={<PageLoader />}>
              <CustomProduct />
            </Suspense>
          ),
        },
        {
          path: "/support",
          element: (
            <Suspense fallback={<PageLoader />}>
              <Support />
            </Suspense>
          ),
        },
        {
          path: "/how-we-work",
          element: (
            <Suspense fallback={<PageLoader />}>
              <HowWeWork />
            </Suspense>
          ),
        },
        {
          path: "/cart",
          element: (
            <Suspense fallback={<PageLoader />}>
              <OrderCart />
            </Suspense>
          ),
        },
        {
          path: "/orders",
          element: (
            <Suspense fallback={<PageLoader />}>
              <Orders />
            </Suspense>
          ),
        },
        {
          path: "/profile",
          element: (
            <Suspense fallback={<PageLoader />}>
              <Profile />
            </Suspense>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <Suspense fallback={<PageLoader />}>
              <Wishlist />
            </Suspense>
          ),
        },
        {
          path: "/admin",
          element: (
            <Suspense fallback={<PageLoader />}>
              <AdminDashboard />
            </Suspense>
          ),
        },
      ],
    },
  ]);
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-center" />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
