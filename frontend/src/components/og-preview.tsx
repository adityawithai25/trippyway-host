"use client";

import { OgImage } from "@/components/og-image";
import { useEffect, useRef, useState } from "react";

export function OgPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.offsetWidth;
        setScale(parentWidth / 1200);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">OG Image Preview</h2>
      <div 
        ref={containerRef}
        className="relative overflow-hidden border shadow-xl rounded-xl bg-white"
        style={{
            width: "100%",
            aspectRatio: "1200/630",
        }}
      >
        <div 
            style={{
                width: "1200px",
                height: "630px",
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                position: "absolute",
                top: 0,
                left: 0,
            }}
        >
            <OgImage 
                title="TrippyWay - Your Travel Companion"
                description="Plan, customise, and book hyper-personalised India trips with local expertise."
                logoSrc="/logo.png"
            />
        </div>
      </div>
    </div>
  );
}
