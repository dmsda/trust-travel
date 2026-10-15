'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { propertyCategories } from '@/data/property-types';

export function PropertyTypeCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Controls */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-[#B9A17D]">
              Architectural Styles
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#171614] tracking-tight mt-1">
              Browse by property type
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-[#E5E1DA] bg-white flex items-center justify-center text-[#171614] hover:bg-[#F0EEEA] hover:border-[#171614] active:scale-90 transition-all cursor-pointer shadow-xs"
              aria-label="Previous property categories"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-[#E5E1DA] bg-white flex items-center justify-center text-[#171614] hover:bg-[#F0EEEA] hover:border-[#171614] active:scale-90 transition-all cursor-pointer shadow-xs"
              aria-label="Next property categories"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Container with smooth momentum scrolling */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-6 hide-scrollbar snap-x snap-mandatory"
        >
          {propertyCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/stays?category=${cat.id}`}
              className="group flex-shrink-0 w-[240px] sm:w-[260px] snap-start block"
            >
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#F0EEEA] mb-3 shadow-xs">
                <Image
                  src={cat.image}
                  alt={cat.pluralName}
                  fill
                  sizes="260px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-base font-semibold text-[#171614] group-hover:text-[#B9A17D] transition-colors">
                  {cat.pluralName}
                </h3>
                <p className="text-xs text-[#77736E] font-light">
                  {cat.sampleCount.toLocaleString()} {cat.pluralName.toLowerCase()}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Link: SHOW ALL with arrow hover translation */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E5E1DA]/60 mt-2">
          <Link
            href="/property-types"
            className="text-xs font-bold tracking-widest text-[#171614] uppercase hover:text-[#B9A17D] transition-colors inline-flex items-center gap-1.5 group"
          >
            <span>SHOW ALL PROPERTY TYPES</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#B9A17D]" />
          </Link>

          {/* Minimalist slider line indicators */}
          <div className="flex items-center gap-2">
            <span className="w-6 h-0.5 bg-[#171614] rounded-full" />
            <span className="w-3 h-0.5 bg-[#E5E1DA] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
