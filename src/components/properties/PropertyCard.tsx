'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, Users, Bed, Bath, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Property } from '@/types';
import { useIsFavorite, toggleFavorite } from '@/lib/favorites';
import { formatCurrency } from '@/lib/currency';

interface PropertyCardProps {
  property: Property;
  nights?: number;
}

export function PropertyCard({ property, nights = 6 }: PropertyCardProps) {
  const fav = useIsFavorite(property.id);
  const [isBouncing, setIsBouncing] = useState(false);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  const images = property.gallery && property.gallery.length > 0 ? property.gallery : [property.coverImage];

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBouncing(true);
    toggleFavorite(property.id);
    setTimeout(() => setIsBouncing(false), 500);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev + 1) % images.length);
  };

  const estimatedTotal = property.pricePerNight * nights;

  return (
    <div className="group rounded-3xl bg-white border border-[#E5E1DA] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between">
      <div>
        {/* Cover Image Container with Smooth Hover Zoom & Photo Carousel */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F0EEEA]">
          <Link href={`/stays/${property.slug}`} className="block w-full h-full">
            <Image
              src={images[currentPhotoIdx] || property.coverImage}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
            />
          </Link>

          {/* Carousel Arrows on Card Hover */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevPhoto}
                className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#171614] flex items-center justify-center transition-opacity shadow-md z-10 absolute left-2.5 top-1/2 -translate-y-1/2 active:scale-90 cursor-pointer"
                aria-label="Previous property photo"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNextPhoto}
                className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#171614] flex items-center justify-center transition-opacity shadow-md z-10 absolute right-2.5 top-1/2 -translate-y-1/2 active:scale-90 cursor-pointer"
                aria-label="Next property photo"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* Indicator Dots */}
              <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1 z-10 pointer-events-none">
                {images.slice(0, 5).map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentPhotoIdx === idx ? 'w-3.5 bg-white shadow-xs' : 'w-1.5 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Badges on top */}
          <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none z-10">
            <span className="bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-[#171614] shadow-xs">
              {property.typeName}
            </span>

            {/* Tactile Favorite Button with Elastic Micro-Bounce */}
            <button
              type="button"
              onClick={handleToggle}
              className={`pointer-events-auto w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-[#171614] hover:scale-110 active:scale-90 transition-all shadow-xs ${
                isBouncing ? 'animate-heart-bounce' : ''
              }`}
              aria-label={fav ? 'Remove from saved stays' : 'Save to favorites'}
            >
              <Heart
                className={`w-4 h-4 transition-colors duration-300 ${
                  fav ? 'fill-[#B9A17D] text-[#B9A17D]' : 'text-[#171614] group-hover:text-[#B9A17D]'
                }`}
              />
            </button>
          </div>

          {property.freeCancellation && (
            <div className="absolute bottom-3 left-3 bg-[#171614]/85 backdrop-blur-xs text-white text-[10px] px-2.5 py-0.5 rounded-md font-medium z-10">
              Free Cancellation
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-3">
          {/* Rating & Location */}
          <div className="flex items-center justify-between text-xs text-[#77736E]">
            <span className="truncate max-w-[200px]">{property.location}</span>
            <div className="flex items-center gap-1 font-semibold text-[#171614]">
              <Star className="w-3.5 h-3.5 fill-[#B9A17D] text-[#B9A17D]" />
              <span>{property.rating.toFixed(2)}</span>
              <span className="text-[#77736E] font-normal">({property.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/stays/${property.slug}`} className="block">
            <h3 className="text-xl font-serif font-medium text-[#171614] group-hover:text-[#B9A17D] transition-colors leading-snug line-clamp-1">
              {property.title}
            </h3>
            <p className="text-xs text-[#77736E] line-clamp-1 mt-0.5 font-sans font-light">
              {property.subtitle}
            </p>
          </Link>

          {/* Specs: Guests, Beds, Baths */}
          <div className="flex items-center gap-4 text-xs text-[#77736E] pt-2 border-t border-[#E5E1DA]/60">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#171614]" />
              {property.maxGuests} guests
            </span>
            <span className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-[#171614]" />
              {property.bedrooms} bed{property.bedrooms > 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-[#171614]" />
              {property.bathrooms} bath{property.bathrooms > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Price & Action */}
      <div className="p-5 sm:p-6 pt-0 flex items-end justify-between border-t border-[#E5E1DA]/40 mt-2">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-[#171614]">
              {formatCurrency(property.pricePerNight)}
            </span>
            <span className="text-xs text-[#77736E]">/ night</span>
          </div>
          <div className="text-[11px] text-[#77736E]">
            {formatCurrency(estimatedTotal)} est. {nights} nights
          </div>
        </div>

        <Link
          href={`/stays/${property.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#171614] group-hover:text-[#B9A17D] transition-colors"
        >
          <span>View Stay</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#B9A17D]" />
        </Link>
      </div>
    </div>
  );
}
