'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Destination } from '@/types';

interface DestinationCardProps {
  destination: Destination;
  index: number;
}

export function DestinationCard({ destination, index }: DestinationCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const isTouchDevice = () => {
    return typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouchDevice() || !cardRef.current) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Subtle restrained tilt: max ±4 degrees
    setTilt({
      x: Math.max(-1, Math.min(1, x)) * 5,
      y: Math.max(-1, Math.min(1, y)) * -5,
    });
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice()) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Specific editorial arched contours based on reference
  let shapeClass = 'rounded-[28px]';
  let heightClass = 'h-[360px] md:h-[400px]';
  let offsetClass = '';

  if (index === 0) {
    // Scotland: Arched top, balanced height
    shapeClass = 'rounded-t-[140px] rounded-b-[28px]';
    heightClass = 'h-[360px] md:h-[420px]';
    offsetClass = 'md:translate-y-8';
  } else if (index === 1) {
    // Germany: Tall vertical arched card, elevated
    shapeClass = 'rounded-t-[160px] rounded-b-[32px]';
    heightClass = 'h-[400px] md:h-[480px]';
    offsetClass = 'md:-translate-y-6';
  } else if (index === 2) {
    // Nepal: Arched top, resting right
    shapeClass = 'rounded-t-[150px] rounded-b-[28px]';
    heightClass = 'h-[380px] md:h-[440px]';
    offsetClass = 'md:translate-y-12';
  }

  return (
    <div className="perspective-container w-full">
      <Link
        ref={cardRef}
        href={`/destinations/${destination.slug}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-8px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease',
        }}
        className={`group relative block w-full overflow-hidden ${shapeClass} ${heightClass} ${offsetClass} shadow-[0_20px_40px_-15px_rgba(23,22,20,0.12)] hover:shadow-[0_32px_60px_-18px_rgba(23,22,20,0.25)] tilt-card`}
      >
        {/* Background Image with organic zoom & contrast */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src={destination.cardImage}
            alt={destination.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-105"
          />
          {/* Editorial vignette gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
        </div>

        {/* Secondary Info Tag (Reveals smoothly on hover) */}
        <div className="absolute top-5 right-5 z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider text-[#171614] shadow-md">
            <span>Explore</span>
            <ArrowUpRight className="w-3 h-3 text-[#B9A17D]" />
          </span>
        </div>

        {/* Card Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-white z-10">
          <h3 className="text-2xl md:text-3xl font-serif font-medium tracking-tight mb-1 text-white group-hover:translate-x-1.5 transition-transform duration-300">
            {destination.name}
          </h3>
          <p className="text-xs text-[#FAF9F6]/85 font-sans tracking-wide flex items-center justify-between">
            <span>{destination.propertyCount.toLocaleString()} curated sanctuaries</span>
          </p>
        </div>

        {/* Subtle border outline with glow transition */}
        <div className={`absolute inset-0 ${shapeClass} border border-white/15 group-hover:border-white/35 transition-colors duration-500 pointer-events-none`} />
      </Link>
    </div>
  );
}
