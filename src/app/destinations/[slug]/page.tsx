import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { destinations } from '@/data/destinations';
import { properties } from '@/data/properties';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { MapPin, Compass, ArrowRight, Sparkles } from 'lucide-react';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const destination = destinations.find((d) => d.slug === resolvedParams.slug);

  if (!destination) {
    notFound();
  }

  // Find accommodations matching this destination
  const destinationProperties = properties.filter(
    (p) => p.destinationSlug === destination.slug
  );

  return (
    <div className="w-full pb-24">
      
      {/* Hero Banner with Arched Framing */}
      <section className="pt-2 pb-12">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden min-h-[460px] md:min-h-[520px] flex flex-col justify-end p-8 sm:p-12 md:p-16 shadow-xl">
            <Image
              src={destination.heroImage}
              alt={destination.name}
              fill
              priority
              className="object-cover brightness-[0.88]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="relative z-10 text-white max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-bold tracking-wider uppercase">
                <Compass className="w-3.5 h-3.5 text-[#CBB392]" />
                <span>{destination.region} &bull; {destination.country}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-white tracking-tight">
                {destination.name}
              </h1>

              <p className="text-sm sm:text-lg text-white/90 font-sans font-light max-w-2xl">
                {destination.tagline}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Overview & Travel Advice */}
      <section className="py-8">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left 7 cols: Description & Highlights */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-normal text-[#171614]">
                  Destination Narrative
                </h2>
                <p className="text-sm sm:text-base text-[#171614]/80 leading-relaxed font-sans font-light">
                  {destination.description}
                </p>
              </div>

              {/* Best-known Areas */}
              <div className="space-y-4 pt-6 border-t border-[#E5E1DA]">
                <h3 className="text-xl font-serif font-normal text-[#171614]">
                  Featured Regions & Enclaves
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {destination.highlightAreas.map((area, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-white border border-[#E5E1DA] text-xs font-semibold text-[#171614] flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#B9A17D] flex-shrink-0" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curated Tips */}
              <div className="space-y-4 pt-6 border-t border-[#E5E1DA]">
                <h3 className="text-xl font-serif font-normal text-[#171614]">
                  Curator Travel Notes
                </h3>
                <ul className="space-y-2 text-xs text-[#77736E]">
                  {destination.travelTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#B9A17D] flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right 5 cols: Season & Fast Facts */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl border border-[#E5E1DA] p-7 shadow-xs space-y-5">
                <h3 className="text-lg font-serif font-bold text-[#171614] pb-2 border-b border-[#E5E1DA]">
                  Essential Information
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="block text-[10px] font-bold text-[#77736E] uppercase mb-1">Optimal Travel Season</span>
                    <p className="text-[#171614] font-medium leading-relaxed">{destination.bestSeason}</p>
                  </div>
                  <div className="pt-3 border-t border-[#E5E1DA]">
                    <span className="block text-[10px] font-bold text-[#77736E] uppercase mb-1">Registered Accommodations</span>
                    <p className="text-xl font-serif font-bold text-[#171614]">{destination.propertyCount.toLocaleString()} listings</p>
                  </div>
                </div>

                <Link
                  href={`/stays?destination=${encodeURIComponent(destination.name)}`}
                  className="w-full py-3.5 rounded-full bg-[#171614] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#2A2926] transition-colors flex items-center justify-center gap-2 mt-4"
                >
                  <span>Browse Stays in {destination.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Featured Accommodations in this Destination */}
      {destinationProperties.length > 0 && (
        <section className="py-12 border-t border-[#E5E1DA] mt-12">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-serif font-normal text-[#171614]">
                  Featured Stays in {destination.name}
                </h2>
                <p className="text-xs text-[#77736E] mt-1">
                  Hand-selected sanctuaries and design residences.
                </p>
              </div>

              <Link
                href={`/stays?destination=${encodeURIComponent(destination.name)}`}
                className="text-xs font-bold tracking-widest uppercase text-[#171614] hover:text-[#B9A17D] transition-colors flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinationProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
