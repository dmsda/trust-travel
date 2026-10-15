'use client';

import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  as?: React.ElementType;
}

export function RevealOnScroll({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 650,
  className = '',
  threshold = 0.15,
  as: Component = 'div',
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      // Async frame fallback for older browsers
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentElem = elementRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [threshold]);

  // Variant transformations
  const getHiddenClasses = () => {
    switch (variant) {
      case 'fade-up':
        return 'opacity-0 translate-y-8';
      case 'fade-in':
        return 'opacity-0';
      case 'slide-left':
        return 'opacity-0 -translate-x-8';
      case 'slide-right':
        return 'opacity-0 translate-x-8';
      case 'scale-up':
        return 'opacity-0 scale-95';
      default:
        return 'opacity-0 translate-y-8';
    }
  };

  const visibleClasses = 'opacity-100 translate-y-0 translate-x-0 scale-100';

  return (
    <Component
      ref={elementRef}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className={`transition-all ${isVisible ? visibleClasses : getHiddenClasses()} ${className}`}
    >
      {children}
    </Component>
  );
}
