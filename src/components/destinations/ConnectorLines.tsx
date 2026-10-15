import React from 'react';

export function ConnectorLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 hidden md:block">
      <svg
        className="w-full h-full text-[#171614]/15"
        viewBox="0 0 1200 600"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Main graceful arch connecting left card, over center, down to right */}
        <path
          d="M 50 420 C 180 200, 320 180, 480 320 C 620 440, 780 240, 920 180 C 1040 140, 1150 280, 1200 360"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          className="animate-draw-line"
        />

        {/* Lower harmonic looping curve */}
        <path
          d="M 20 480 C 160 480, 240 540, 420 500 C 580 470, 720 540, 880 510 C 1020 480, 1140 520, 1200 490"
          stroke="currentColor"
          strokeWidth="0.85"
          strokeDasharray="4 4"
          opacity="0.4"
        />
        
        {/* Left side decorative oval ring */}
        <ellipse
          cx="90"
          cy="510"
          rx="28"
          ry="10"
          stroke="currentColor"
          strokeWidth="1"
          transform="rotate(-15 90 510)"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
