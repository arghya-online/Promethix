import React, { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FullscreenImageViewer({
  images,
  activeIndex,
  onClose,
  onNavigate,
}) {
  const [touchStartX, setTouchStartX] = useState(0);

  useEffect(() => {
    if (activeIndex === -1 || !images.length) return;

    // Lock body scroll when open
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, images]);

  if (activeIndex === -1 || !images.length) return null;

  const currentImage = images[activeIndex];

  const handlePrev = () => {
    const nextIdx = (activeIndex - 1 + images.length) % images.length;
    onNavigate(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % images.length;
    onNavigate(nextIdx);
  };

  // Touch Swipe handlers for mobile
  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX;
    const swipeThreshold = 50; // Min px to trigger swipe

    if (diffX > swipeThreshold) {
      handlePrev(); // Swipe Right -> Prev
    } else if (diffX < -swipeThreshold) {
      handleNext(); // Swipe Left -> Next
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-xl no-print select-none"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Bar with counter & close button */}
        <div className="absolute top-0 left-0 right-0 h-20 px-6 flex items-center justify-between z-10 pointer-events-none">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
            {activeIndex + 1} / {images.length}
          </div>
          <button
            onClick={onClose}
            className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
            aria-label="Close fullscreen view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Previous Button (Desktop) */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Main Image Wrapper */}
        <div 
          className="relative max-w-[90vw] max-h-[80vh] md:max-w-[85vw] md:max-h-[85vh] flex items-center justify-center p-2"
          onClick={(e) => e.stopPropagation()} // Prevent close on image click
        >
          <motion.img
            key={currentImage.src}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-w-full max-h-full object-contain border border-white/10 shadow-2xl bg-slate-900/50"
          />
        </div>

        {/* Next Button (Desktop) */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Image Caption/Title at the bottom */}
        {currentImage.alt && (
          <div className="absolute bottom-6 left-6 right-6 text-center pointer-events-none z-10">
            <motion.p
              key={currentImage.alt}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-white text-xs md:text-sm font-heading font-semibold tracking-wider"
            >
              {currentImage.alt}
            </motion.p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
