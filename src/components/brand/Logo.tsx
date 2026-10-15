import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
}

export function CompassIcon({ className = "w-6 h-6", color = "#B9A17D", secondaryColor = "#171614" }: { className?: string; color?: string; secondaryColor?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* 8-point compass star */}
      <path d="M14 0L15.6 10.4L26 12L15.6 13.6L14 24L12.4 13.6L2 12L12.4 10.4L14 0Z" fill={color} />
      <path d="M14 4.5L15.2 11.2L21.5 12L15.2 12.8L14 19.5L12.8 12.8L6.5 12L12.8 11.2L14 4.5Z" fill={secondaryColor} opacity="0.3" />
      <circle cx="14" cy="12" r="2.2" fill="#FAF9F6" />
      <circle cx="14" cy="12" r="1.1" fill={color} />
    </svg>
  );
}

export function Logo({ variant = 'light', className = '', showTagline = false }: LogoProps) {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-white' : 'text-[#171614]';
  const dotColor = isDark ? 'text-[#CBB392]' : 'text-[#B9A17D]';
  const iconColor = isDark ? '#CBB392' : '#B9A17D';
  const iconSecondary = isDark ? '#FFFFFF' : '#171614';

  return (
    <Link 
      href="/" 
      className={`inline-flex items-center gap-2.5 group select-none transition-opacity hover:opacity-90 ${className}`}
      aria-label="TRUST.TRAVEL Home"
    >
      <div className="relative flex items-center justify-center">
        <CompassIcon
          className="w-5 h-5 flex-shrink-0 transition-transform duration-700 ease-out group-hover:rotate-90 group-hover:scale-110"
          color={iconColor}
          secondaryColor={iconSecondary}
        />
      </div>
      <div className="flex flex-col">
        <span className={`text-[15px] font-bold tracking-[0.2em] uppercase leading-none font-sans ${textColor}`}>
          TRUST<span className={`${dotColor} inline-block transition-transform duration-300 group-hover:scale-125`}>.</span>TRAVEL
        </span>
        {showTagline && (
          <span className="text-[9px] tracking-wider text-[#77736E] uppercase mt-0.5">
            Effortless Stays
          </span>
        )}
      </div>
    </Link>
  );
}
