import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";

function AppLayout() {
  return (
    <div>
      <div className="background"></div>
      <main>
        <Outlet />
        <Header />
      </main>
      <footer className="relative z-10 p-2 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Promethix3D. All rights reserved.
      </footer>
    </div>
  );
}

export default AppLayout;
