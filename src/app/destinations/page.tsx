'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { destinations } from '@/data/destinations';
import { Search, ArrowRight, Compass } from 'lucide-react';

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const regions = ['All', 'Western Europe', 'Central Europe', 'Southern Europe', 'South Asia', 'East Asia', 'Southeast Asia'];

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchesSearch = 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === 'All' || d.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  return (
    <div className="w-full pb-24">
      
      {/* Editorial Intro Banner */}
      <section className="bg-white border-b border-[#E5E1DA] pt-12 pb-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E5E1DA] text-[11px] font-semibold tracking-wider uppercase text-[#171614]">
              <Compass className="w-3.5 h-3.5 text-[#B9A17D]" />
              <span>Global Destination Archive</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-[#171614] tracking-tight leading-tight">
              Curated Destinations of Extraordinary Character
            </h1>

            <p className="text-sm sm:text-base text-[#77736E] font-sans font-light max-w-2xl leading-relaxed">
              From misty Scottish highlands to sacred Himalayan ridges and sun-warmed Tuscan vineyards, explore environments where landscape, architecture, and mindful hospitality converge.
            </p>
          </div>

          {/* Search & Region Filters */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77736E]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or region..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F6] border border-[#E5E1DA] rounded-full text-xs text-[#171614] focus:outline-none focus:border-[#171614]"
              />
            </div>

            {/* Region Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
              {regions.map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedRegion === reg
                      ? 'bg-[#171614] text-white'
                      : 'bg-[#FAF9F6] text-[#77736E] border border-[#E5E1DA] hover:text-[#171614]'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Destination Grid */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.slug}`}
              className="group block rounded-3xl bg-white border border-[#E5E1DA] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Image Container with editorial arch aspect */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F0EEEA]">
                <Image
                  src={dest.cardImage}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#171614]">
                  {dest.region}
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-serif font-medium text-white group-hover:translate-x-1 transition-transform">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-white/80 font-sans">
                    {dest.propertyCount.toLocaleString()} properties available
                  </p>
                </div>
              </div>

              {/* Card Meta & Excerpt */}
              <div className="p-6 space-y-3">
                <p className="text-xs text-[#77736E] line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>

                <div className="pt-3 border-t border-[#E5E1DA]/60 flex items-center justify-between text-xs font-semibold text-[#171614] group-hover:text-[#B9A17D] transition-colors">
                  <span>Explore Destination Guide</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
