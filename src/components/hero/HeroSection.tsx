'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { HeroSearchBar } from '@/components/search/HeroSearchBar';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Small clamped movement range
    setParallax({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  return (
    <section className="pt-2 pb-12 md:pb-20 relative z-30">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative rounded-[28px] sm:rounded-[36px] md:rounded-[44px] min-h-[560px] md:min-h-[640px] flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 shadow-2xl transition-all"
        >
          {/* Background Hero Image with subtle parallax safely clipped to rounded hero bounds */}
          <div className="absolute inset-0 rounded-[28px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden z-0 pointer-events-none">
            <div
              className="absolute inset-[-18px] transition-transform duration-700 ease-out"
              style={{
                transform: `translate3d(${parallax.x * -12}px, ${parallax.y * -10}px, 0)`,
                transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <Image
                src="/assets/images/hero/hero-travel.jpg"
                alt="Panoramic sunrise road through golden countryside"
                fill
                priority
                sizes="(max-width: 1400px) 100vw, 1320px"
                className="object-cover object-center filter brightness-[0.92]"
              />
              {/* Cinematic dark gradient overlays for flawless typography contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/80" />
            </div>
          </div>

          {/* Staggered Editorial Headline with subtle upward mask reveal */}
          <div
            className="relative z-10 text-center max-w-3xl mx-auto pt-8 sm:pt-14 md:pt-16 transition-transform duration-500 ease-out"
            style={{
              transform: `translate3d(${parallax.x * 6}px, ${parallax.y * 5}px, 0)`,
            }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-serif font-normal text-white leading-[1.08] tracking-tight drop-shadow-md">
              <span className="block animate-hero-line-1">
                Effortless bookings
              </span>
              <span className="block animate-hero-line-2">
                for <span className="font-serif italic font-normal text-[#CBB392]">leisure</span> travel or{' '}
                <span className="font-serif italic font-normal text-[#CBB392]">business</span>
              </span>
            </h1>
          </div>

          {/* Floating Pill Search Bar with sequenced entrance */}
          <div className="relative z-10 w-full pt-8 pb-4 animate-hero-search">
            <HeroSearchBar />
          </div>
        </div>
      </div>
    </section>
  );
}
