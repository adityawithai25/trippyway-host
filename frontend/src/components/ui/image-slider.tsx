"use client";

import React, { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  images: string[];
  alt: string;
  className?: string;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  alt,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const goToPrevious = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    },
    [images.length]
  );

  const goToNext = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    },
    [images.length]
  );

  const goToSlide = useCallback((e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  }, []);

  // Touch event handlers for swipe navigation
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    const swipeThreshold = 50; // Minimum swipe distance in pixels
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      e.preventDefault();
      e.stopPropagation();

      if (swipeDistance > 0) {
        // Swiped left - go to next image
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      } else {
        // Swiped right - go to previous image
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      }
    }

    // Reset values
    touchStartX.current = 0;
    touchEndX.current = 0;
  }, [images.length]);

  // If only one image, don't show slider controls
  if (images.length <= 1) {
    return (
      <Image
        src={images[0] || "/placeholder.svg"}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover ${className}`}
        quality={90}
      />
    );
  }

  return (
    <div 
      className="relative w-full h-full group/slider touch-pan-y"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Images */}
      {images.map((image, index) => (
        <div
          key={`${image}-${index}`}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={image}
            alt={`${alt} - Image ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover ${className}`}
            priority={index === 0}
            quality={90}
          />
        </div>
      ))}

      {/* Gradient overlays for better button visibility (desktop only) */}
      <div 
        className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/20 to-transparent z-15 transition-opacity duration-300 hidden md:block ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div 
        className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/20 to-transparent z-15 transition-opacity duration-300 hidden md:block ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Navigation Arrows - Enhanced (hidden on mobile, visible on desktop) */}
      <button
        onClick={goToPrevious}
        className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-md hover:bg-white p-2 rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-gray-200/50 hidden md:block ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
        }`}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5 text-gray-800" strokeWidth={2.5} />
      </button>
      <button
        onClick={goToNext}
        className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-md hover:bg-white p-2 rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-gray-200/50 hidden md:block ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5 text-gray-800" strokeWidth={2.5} />
      </button>

      {/* Dot Indicators - Enhanced with better visibility */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => goToSlide(e, index)}
            className={`transition-all duration-300 rounded-full hover:scale-110 ${
              index === currentIndex
                ? "w-7 h-2 bg-white shadow-lg"
                : "w-2 h-2 bg-white/60 hover:bg-white/90"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Image Counter - Enhanced badge */}
      <div className="absolute top-3 right-3 z-20 bg-black/70 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-semibold shadow-lg border border-white/10">
        {currentIndex + 1}/{images.length}
      </div>
    </div>
  );
};
