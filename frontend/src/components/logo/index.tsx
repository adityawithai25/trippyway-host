import React from "react";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-10" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="TrippyWay Logo"
    >
      <defs>
        <linearGradient
          id="bagGradient"
          x1="30"
          y1="30"
          x2="70"
          y2="90"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FF9F5A" />
          <stop offset="100%" stopColor="#E65100" />
        </linearGradient>
        <linearGradient id="metalGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#999" />
          <stop offset="50%" stopColor="#EEE" />
          <stop offset="100%" stopColor="#999" />
        </linearGradient>
        <filter id="shadowBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
        <filter id="bagShine" x="0" y="0" width="100%" height="100%">
          <feSpecularLighting
            result="specOut"
            specularConstant="1.2"
            specularExponent="20"
            lightingColor="#ffffff"
          >
            <fePointLight x="20" y="20" z="40" />
          </feSpecularLighting>
          <feComposite
            in="SourceGraphic"
            in2="specOut"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
          />
        </filter>
      </defs>

      {/* 1. Background: Green Square with Radius 12px (scaled to 100x100 coord system, roughly rx=20 for 12px feel) */}
      <rect width="100" height="100" rx="20" fill="#0E3D2A" />

      {/* 2. Drop Shadow under the bag */}
      <ellipse
        cx="50"
        cy="88"
        rx="22"
        ry="4"
        fill="#000"
        fillOpacity="0.4"
        filter="url(#shadowBlur)"
      />

      {/* 3. Handle (Telescopic) */}
      <path
        d="M40 25 h20"
        stroke="#C7C7C7"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M42 25 v-8 a2 2 0 0 1 2 -2 h12 a2 2 0 0 1 2 2 v8"
        fill="none"
        stroke="url(#metalGradient)"
        strokeWidth="3"
      />

      {/* 4. Bag Body */}
      <rect
        x="28"
        y="28"
        width="44"
        height="58"
        rx="6"
        fill="url(#bagGradient)"
        stroke="#BD4200"
        strokeWidth="1"
      />

      {/* 5. Vertical Ribs (Hard shell texture) */}
      <path d="M39 29 v56" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
      <path d="M50 29 v56" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
      <path d="M61 29 v56" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />

      {/* 6. Top Gloss/Highlight */}
      <path
        d="M30 30 h40 a4 4 0 0 1 4 4 v10 c0 -10 -5 -12 -24 -12 s-24 2 -24 12 v-10 a4 4 0 0 1 4 -4"
        fill="white"
        fillOpacity="0.25"
      />

      {/* 7. Wheels */}
      <circle cx="34" cy="86" r="3.5" fill="#222" />
      <circle cx="66" cy="86" r="3.5" fill="#222" />
      <circle cx="34" cy="86" r="1.5" fill="#555" />
      <circle cx="66" cy="86" r="1.5" fill="#555" />

      {/* 8. Logo Badge on Bag */}
      <rect
        x="46"
        y="40"
        width="8"
        height="5"
        rx="1"
        fill="#0E3D2A"
        opacity="0.8"
      />
    </svg>
  );
};
