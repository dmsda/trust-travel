'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { properties } from '@/data/properties';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { PropertyFilters } from '@/components/properties/PropertyFilters';
import { HeroSearchBar } from '@/components/search/HeroSearchBar';
import { filterAndSortProperties, SearchFilterCriteria } from '@/lib/search-utils';
import { calculateNights } from '@/lib/date-utils';
import { SlidersHorizontal, ArrowUpDown, Sparkles, X } from 'lucide-react';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';

function StaysContent() {
  const searchParams = useSearchParams();

  const destinationParam = searchParams.get('destination') || '';
  const checkInParam = searchParams.get('checkIn') || '';
  const checkOutParam = searchParams.get('checkOut') || '';
  const guestsParam = searchParams.get('guests') ? Number(searchParams.get('guests')) : 2;
  const categoryParam = searchParams.get('category') || 'all';

  const [criteria, setCriteria] = useState<SearchFilterCriteria>({
    destination: destinationParam,
    category: categoryParam,
    minPrice: 0,
    maxPrice: 1000,
    guests: guestsParam,
    bedrooms: undefined,
    freeCancellationOnly: false,
    breakfastOnly: false,
    sortBy: 'recommended'
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Compute calculated nights
  const nights = useMemo(() => {
    return calculateNights(checkInParam, checkOutParam);
  }, [checkInParam, checkOutParam]);

  // Filter properties
  const filteredProperties = useMemo(() => {
    return filterAndSortProperties(properties, criteria);
  }, [criteria]);

  const handleReset = () => {
    setCriteria({
      destination: '',
      category: 'all',
      minPrice: 0,
      maxPrice: 1000,
      guests: 1,
      bedrooms: undefined,
      freeCancellationOnly: false,
      breakfastOnly: false,
      sortBy: 'recommended'
    });
  };

  return (
    <div className="w-full pb-20">
      {/* Top Search & Filter Summary Banner */}
      <section className="bg-white border-b border-[#E5E1DA] pt-8 pb-10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E5E1DA] text-[11px] font-semibold tracking-wider uppercase text-[#171614] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#B9A17D]" />
              <span>Curated Accommodations</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#171614] tracking-tight">
              Find your perfect stay
            </h1>
            <p className="text-xs sm:text-sm text-[#77736E] mt-2 font-sans font-light">
              Discover handpicked boutique suites, historic loch cottages, and architectural villas designed for effortless comfort.
            </p>
          </div>

          {/* Compact / Inline Search Form */}
          <HeroSearchBar
            initialDestination={destinationParam}
            initialCheckIn={checkInParam}
            initialCheckOut={checkOutParam}
            initialGuests={guestsParam}
            compact
          />
        </div>
      </section>

      {/* Main Results Section */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Results Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E1DA]/80 mb-8">
          <div>
            <span className="text-sm font-semibold text-[#171614] transition-all">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'Stay' : 'Stays'} available
            </span>
            {criteria.destination && (
              <span className="text-xs text-[#77736E] ml-2">
                in &ldquo;{criteria.destination}&rdquo;
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Trigger Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-4 py-2 bg-white border border-[#E5E1DA] rounded-full text-xs font-semibold text-[#171614] flex items-center gap-2 hover:bg-[#F0EEEA] active:scale-95 transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#77736E]" />
              <label htmlFor="sort-by" className="text-[#77736E] hidden sm:inline">Sort by:</label>
              <select
                id="sort-by"
                value={criteria.sortBy}
                onChange={(e) => setCriteria({ ...criteria, sortBy: e.target.value as SearchFilterCriteria['sortBy'] })}
                className="bg-white border border-[#E5E1DA] rounded-full px-3.5 py-1.5 text-xs font-medium text-[#171614] focus:outline-none focus:border-[#B9A17D] transition-colors cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Guest Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <PropertyFilters
                criteria={criteria}
                onChange={setCriteria}
                onReset={handleReset}
                totalResults={filteredProperties.length}
              />
            </div>
          </aside>

          {/* Mobile Filter Drawer / Bottom Sheet */}
          {mobileFilterOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end lg:hidden p-4 animate-in fade-in duration-200">
              <div className="w-full max-h-[85vh] bg-white rounded-t-3xl p-6 overflow-y-auto animate-in slide-in-from-bottom duration-300 shadow-2xl">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#E5E1DA]">
                  <h3 className="font-serif text-lg font-bold text-[#171614]">Filter Stays</h3>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 rounded-full text-[#77736E] hover:text-[#171614]"
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <PropertyFilters
                  criteria={criteria}
                  onChange={setCriteria}
                  onReset={handleReset}
                  totalResults={filteredProperties.length}
                />
              </div>
            </div>
          )}

          {/* Results Grid */}
          <main className="lg:col-span-3">
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProperties.map((prop, idx) => (
                  <RevealOnScroll key={prop.id} variant="fade-up" delay={idx * 60} duration={600}>
                    <PropertyCard property={prop} nights={nights} />
                  </RevealOnScroll>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-[#E5E1DA] p-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-[#E5E1DA] flex items-center justify-center mx-auto text-[#77736E]">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif font-medium text-[#171614]">
                  No properties matched your criteria
                </h3>
                <p className="text-xs text-[#77736E] max-w-sm mx-auto font-light leading-relaxed">
                  Try adjusting or resetting your destination, dates, price limits, or perk filters.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-[#171614] text-white text-xs font-semibold hover:bg-[#2A2926] active:scale-95 transition-all shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function StaysPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-[#77736E]">Loading stays...</div>}>
      <StaysContent />
    </Suspense>
  );
}
