import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { ScrollToTop } from "../components/ScrollToTop.jsx";
import { CartDrawer } from "../components/CartDrawer.jsx";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { FullscreenImageViewer } from "../components/FullscreenImageViewer.jsx";

function AppLayout() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [zoomableImages, setZoomableImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(-1);

  useEffect(() => {
    const handleGlobalClick = (e) => {
      const img = e.target.closest("img");
      if (!img) return;

      // Filter out elements that should not trigger zoom (e.g. logo, icons, dropdowns)
      const isHeaderLogo = img.closest("header") || img.src.includes("PromethixLogo");
      const isDropdownItem = img.closest(".dropdown-menu") || img.closest("[role='menu']");
      const isExcluded = img.closest(".no-zoom") || img.classList.contains("no-zoom");
      
      // Calculate sizes to filter out small icons/decorations
      const isTooSmall = (img.naturalWidth > 0 && img.naturalWidth < 80) || (img.clientWidth > 0 && img.clientWidth < 80);
      
      if (isHeaderLogo || isDropdownItem || isExcluded || isTooSmall) return;

      // Stop default link navigation/bubble events when clicking content images to zoom
      e.preventDefault();
      e.stopPropagation();

      // Find all zoomable images in the main content container to populate the gallery
      const mainContainer = document.querySelector("main");
      if (!mainContainer) return;

      const allImages = Array.from(mainContainer.querySelectorAll("img"));
      const filtered = allImages.filter((el) => {
        const elHeaderLogo = el.closest("header") || el.src.includes("PromethixLogo");
        const elDropdownItem = el.closest(".dropdown-menu") || el.closest("[role='menu']");
        const elExcluded = el.closest(".no-zoom") || el.classList.contains("no-zoom");
        const elTooSmall = (el.naturalWidth > 0 && el.naturalWidth < 80) || (el.clientWidth > 0 && el.clientWidth < 80);
        return !elHeaderLogo && !elDropdownItem && !elExcluded && !elTooSmall;
      });

      const index = filtered.indexOf(img);
      if (index !== -1) {
        setZoomableImages(
          filtered.map((el) => ({
            src: el.src,
            alt: el.alt || el.getAttribute("data-alt") || "PROMETHIX3D Creation",
          }))
        );
        setActiveImageIndex(index);
      } else {
        setZoomableImages([
          {
            src: img.src,
            alt: img.alt || "PROMETHIX3D Creation",
          },
        ]);
        setActiveImageIndex(0);
      }
    };

    // Attach to capturing phase of document to intercept before react-router Link clicks bubble up
    document.addEventListener("click", handleGlobalClick, true);
    return () => {
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, []);

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

      {/* Global Fullscreen Lightbox Image Viewer */}
      <FullscreenImageViewer
        images={zoomableImages}
        activeIndex={activeImageIndex}
        onClose={() => setActiveImageIndex(-1)}
        onNavigate={(index) => setActiveImageIndex(index)}
      />
    </div>
  );
}

export default AppLayout;
