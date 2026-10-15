import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { propertyCategories } from '@/data/property-types';
import { ArrowRight, Home } from 'lucide-react';

export const metadata = {
  title: 'Property Types & Architectural Categories | TRUST.TRAVEL',
  description: 'Browse luxury hotels, private villas, coastal cottages, alpine cabins, and designer apartments worldwide.'
};

export default function PropertyTypesPage() {
  return (
    <div className="w-full pb-24">
      
      {/* Intro Header */}
      <section className="bg-white border-b border-[#E5E1DA] pt-12 pb-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E5E1DA] text-[11px] font-semibold tracking-wider uppercase text-[#171614]">
              <Home className="w-3.5 h-3.5 text-[#B9A17D]" />
              <span>Architectural Typologies</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-[#171614] tracking-tight">
              Browse by Property Type
            </h1>

            <p className="text-sm sm:text-base text-[#77736E] font-sans font-light leading-relaxed">
              Explore stays characterized by their distinct architectural forms, from traditional loch cottages and secluded pine cabins to sprawling cliffside estates.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propertyCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/stays?category=${cat.id}`}
              className="group block bg-white rounded-3xl border border-[#E5E1DA] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F0EEEA]">
                <Image
                  src={cat.image}
                  alt={cat.pluralName}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-serif font-medium text-white group-hover:translate-x-1 transition-transform">
                    {cat.pluralName}
                  </h3>
                  <p className="text-xs text-white/80 font-sans">
                    {cat.sampleCount.toLocaleString()} curated listings
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-xs text-[#77736E] leading-relaxed">
                  {cat.description}
                </p>

                <div className="pt-3 border-t border-[#E5E1DA]/60 flex items-center justify-between text-xs font-bold text-[#171614] uppercase tracking-wider group-hover:text-[#B9A17D] transition-colors">
                  <span>Explore {cat.pluralName}</span>
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
