import React, { useState, useRef, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";
import cadImage from "../assets/sliderCad/cadImage.png";
import realityImage from "../assets/sliderCad/realityImage.png";

export function ComparisonSlider() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    // Image to use (Geometric Vase works well for lines)
    const imageSrc = cadImage;
    const realityImageSrc = realityImage;

    const handleMove = (clientX) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
        setSliderPosition(percent);
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    };

    const onTouchMove = (e) => {
        if (!isDragging) return;
        handleMove(e.touches[0].clientX);
    };

    const handleInteractionStart = (clientX) => {
        setIsDragging(true);
        handleMove(clientX);
    };

    useEffect(() => {
        const handleUp = () => setIsDragging(false);
        window.addEventListener("mouseup", handleUp);
        window.addEventListener("touchend", handleUp);
        return () => {
            window.removeEventListener("mouseup", handleUp);
            window.removeEventListener("touchend", handleUp);
        };
    }, []);

    return (
        <div className="w-full max-w-5xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 mb-4">
                    FROM CAD TO REALITY
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                    See the precision. We bridge the gap between digital design and physical perfection.
                </p>
            </div>

            <div
                ref={containerRef}
                className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-none overflow-hidden cursor-ew-resize select-none shadow-2xl ring-1 ring-slate-900/5"
                onMouseDown={(e) => handleInteractionStart(e.clientX)}
                onTouchStart={(e) => handleInteractionStart(e.touches[0].clientX)}
                onMouseMove={onMouseMove}
                onTouchMove={onTouchMove}
            >
                {/* RIGHT IMAGE (REALITY - Full Color) */}
                {/* This acts as the background layer */}
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src={realityImageSrc}
                        alt="Reality"
                        className="w-full h-full object-contain"
                        draggable="false"
                    />
                    <div className="absolute top-6 right-6 bg-black/50 backdrop-blur text-white px-4 py-1 rounded-none text-xs font-bold tracking-widest uppercase">
                        Reality
                    </div>
                </div>

                {/* LEFT IMAGE (CAD - Filtered) */}
                {/* Clipped based on slider position */}
                <div
                    className="absolute inset-0 w-full h-full overflow-hidden bg-slate-100"
                    style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                >
                    {/* "CAD" Simulation */}
                    <div className="w-full h-full relative">
                        <img
                            src={cadImage}
                            alt="CAD Model"
                            className="w-full h-full object-contain"
                            draggable="false"
                        />
                        {/* NO Grid Overlay */}
                        <div className="absolute top-6 left-6 bg-blue-600 shadow-lg shadow-blue-600/20 text-white px-4 py-1 rounded-none text-xs font-bold tracking-widest uppercase z-10">
                            CAD Model
                        </div>
                    </div>
                </div>

                {/* SLIDER HANDLE */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-none flex items-center justify-center shadow-lg transform active:scale-95 transition-transform text-slate-900">
                        <MoveHorizontal className="w-5 h-5" />
                    </div>
                </div>

            </div>
        </div>
    );
}
