import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { ScrollToTop } from "../components/ScrollToTop.jsx";
import { CartDrawer } from "../components/CartDrawer.jsx";
import { useState } from "react";
import { X } from "lucide-react";

function AppLayout() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <div className="min-h-screen flex flex-col font-body">
      <ScrollToTop />

      {/* Announcement Bar */}
      {showAnnouncement && (
        <div className="bg-slate-900 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest py-2 px-4 text-center relative z-50">
          <span>Free Shipping on All Orders Above ₹999</span>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <Header />
      <CartDrawer />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
