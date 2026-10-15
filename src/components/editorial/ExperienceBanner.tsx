'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export function ExperienceBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [lightPos, setLightPos] = useState({ x: 75, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!bannerRef.current) return;

    const rect = bannerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setLightPos({ x, y });
  };

  const vignettes = [
    { src: '/assets/images/vignettes/vignette-1.jpg', size: 'w-24 h-24 sm:w-28 sm:h-28', pos: 'top-2 right-12 sm:right-24', anim: 'float-slow' },
    { src: '/assets/images/vignettes/vignette-2.jpg', size: 'w-16 h-16 sm:w-20 sm:h-20', pos: 'top-16 right-4 sm:right-6', anim: 'float-med' },
    { src: '/assets/images/vignettes/vignette-3.jpg', size: 'w-20 h-20 sm:w-24 sm:h-24', pos: 'top-28 right-32 sm:right-48', anim: 'float-slow' },
    { src: '/assets/images/vignettes/vignette-4.jpg', size: 'w-14 h-14 sm:w-16 sm:h-16', pos: 'top-32 right-16 sm:right-24', anim: 'float-med' },
    { src: '/assets/images/vignettes/vignette-5.jpg', size: 'w-16 h-16 sm:w-18 sm:h-18', pos: 'bottom-6 right-36 sm:right-56', anim: 'float-slow' },
    { src: '/assets/images/vignettes/vignette-6.jpg', size: 'w-12 h-12 sm:w-14 sm:h-14', pos: 'bottom-4 right-20 sm:right-28', anim: 'float-med' },
    { src: '/assets/images/vignettes/vignette-7.jpg', size: 'w-20 h-20 sm:w-24 sm:h-24', pos: 'bottom-2 right-2 sm:right-4', anim: 'float-slow' },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={bannerRef}
          onMouseMove={handleMouseMove}
          className="relative overflow-hidden rounded-[28px] md:rounded-[36px] bg-[#191815] text-white p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl transition-all"
        >
          {/* Interactive ambient radial illumination following cursor */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
            style={{
              background: `radial-gradient(circle 500px at ${lightPos.x}% ${lightPos.y}%, rgba(185, 161, 125, 0.16), transparent 70%)`,
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-serif font-normal leading-[1.1] tracking-tight text-white">
                Discover a new unique <br className="hidden sm:inline" />
                living experience
              </h2>

              <p className="text-sm sm:text-base text-[#FAF9F6]/75 font-sans leading-relaxed max-w-xl font-light">
                Take a step into the extraordinary by immersing yourself in a unique life experience. Your home away from everyone is waiting for you!
              </p>

              <div className="pt-2">
                <Link
                  href="/leisure"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#171614] text-xs font-bold tracking-widest uppercase hover:bg-[#FAF9F6] hover:scale-105 active:scale-95 transition-all shadow-xl group"
                >
                  <span>DISCOVER</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[#B9A17D]" />
                </Link>
              </div>
            </div>

            {/* Right: Constellation of Circular Image Vignettes with gentle floating motion */}
            <div className="lg:col-span-5 relative h-64 sm:h-72 md:h-80 w-full">
              {vignettes.map((v, i) => (
                <div
                  key={i}
                  className={`absolute ${v.pos} ${v.size} ${v.anim} rounded-full overflow-hidden border-2 border-white/20 shadow-xl transition-all duration-500 hover:scale-120 hover:border-white/70 hover:z-20 cursor-pointer`}
                >
                  <Image
                    src={v.src}
                    alt="Living experience preview vignette"
                    fill
                    sizes="120px"
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
