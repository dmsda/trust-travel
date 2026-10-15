'use client';

import React from 'react';
import Link from 'next/link';
import { properties } from '@/data/properties';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { useFavorites } from '@/lib/favorites';
import { Heart, ArrowRight } from 'lucide-react';

export default function FavoritesPage() {
  const favoriteIds = useFavorites();
  const favoritedProperties = properties.filter((p) => favoriteIds.includes(p.id));

  return (
    <div className="w-full pb-24">
      
      {/* Header */}
      <section className="bg-white border-b border-[#E5E1DA] pt-12 pb-14">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E5E1DA] text-[11px] font-semibold tracking-wider uppercase text-[#171614]">
              <Heart className="w-3.5 h-3.5 fill-[#B9A17D] text-[#B9A17D]" />
              <span>Saved Accommodations</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-serif font-normal text-[#171614] tracking-tight">
              Your Curated Shortlist
            </h1>

            <p className="text-sm text-[#77736E] font-sans font-light leading-relaxed">
              Properties you have bookmarked are saved locally to your device session. Compare architectural details and reserve when you are ready.
            </p>
          </div>

        </div>
      </section>

      {/* Content Grid or Empty State */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {favoritedProperties.length > 0 ? (
          <div className="space-y-6">
            <div className="text-xs font-semibold text-[#171614]">
              {favoritedProperties.length} {favoritedProperties.length === 1 ? 'saved property' : 'saved properties'}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoritedProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-white rounded-3xl border border-[#E5E1DA] shadow-xs space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#FAF9F6] border border-[#E5E1DA] flex items-center justify-center mx-auto text-[#77736E]">
              <Heart className="w-6 h-6" />
            </div>

            <h2 className="text-2xl font-serif font-medium text-[#171614]">
              No saved stays yet
            </h2>

            <p className="text-xs text-[#77736E] leading-relaxed">
              Explore our collection of European lofts, highland loch cottages, and private villas. Tap the heart icon on any card to save it here.
            </p>

            <div className="pt-2">
              <Link
                href="/stays"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#171614] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#2A2926] transition-colors"
              >
                <span>Browse Stays</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
