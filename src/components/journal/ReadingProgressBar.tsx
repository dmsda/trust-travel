'use client';

import React, { useEffect, useState } from 'react';

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;

    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const currentProgress = (window.scrollY / scrollHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#E5E1DA]/40 z-50 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-[#B9A17D] transition-[width] duration-100 ease-out shadow-xs"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
