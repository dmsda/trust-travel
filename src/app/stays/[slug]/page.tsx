'use client';

import React, { useState, use, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Heart, Share2, Star, Users, Bed, Bath, Clock, 
  ShieldCheck, MapPin, ChevronLeft, ChevronRight, X, 
  ArrowRight, Check, Sparkles, LayoutGrid 
} from 'lucide-react';
import { properties } from '@/data/properties';
import { amenitiesList } from '@/data/amenities';
import { useIsFavorite, toggleFavorite } from '@/lib/favorites';
import { calculatePricingBreakdown } from '@/lib/booking-utils';
import { formatCurrency } from '@/lib/currency';
import { getDefaultDemoDates, calculateNights } from '@/lib/date-utils';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';

function StayDetailContent({ slug }: { slug: string }) {
  const router = useRouter();

  const property = properties.find((p) => p.slug === slug);

  if (!property) {
    notFound();
  }

  const defaultDates = getDefaultDemoDates();
  const [checkIn, setCheckIn] = useState(defaultDates.checkIn);
  const [checkOut, setCheckOut] = useState(defaultDates.checkOut);
  const [guests, setGuests] = useState(2);
  const fav = useIsFavorite(property.id);
  const [favBouncing, setFavBouncing] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);
  const nights = calculateNights(checkIn, checkOut);
  const pricing = calculatePricingBreakdown(property.pricePerNight, nights);

  // Keyboard navigation & body scroll lock for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    // Lock body scroll while lightbox is active
    document.body.style.overflow = 'hidden';

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + property.gallery.length) % property.gallery.length : 0));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % property.gallery.length : 0));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex, property.gallery.length]);

  const handleToggleFav = () => {
    setFavBouncing(true);
    toggleFavorite(property.id);
    setTimeout(() => setFavBouncing(false), 500);
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleProceedBooking = () => {
    const query = new URLSearchParams({
      checkIn,
      checkOut,
      guests: guests.toString()
    });
    router.push(`/booking/${property.slug}?${query.toString()}`);
  };

  // Find amenities for this property
  const propertyAmenities = amenitiesList.filter((a) => property.amenityIds.includes(a.id));

  // Similar accommodations
  const similarStays = properties
    .filter((p) => p.id !== property.id)
    .slice(0, 2);

  return (
    <div className="w-full pb-24">
      {/* Lightbox Modal with smooth scale/fade, thumbnails & photo counter */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-in fade-in duration-200"
          role="dialog"
          aria-label="Image gallery lightbox"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxIndex(null);
          }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between w-full max-w-7xl mx-auto z-20 pb-2">
            <div className="text-white">
              <span className="text-sm sm:text-base font-serif font-medium">{property.title}</span>
              <span className="text-xs text-white/60 ml-3">
                {lightboxIndex + 1} / {property.gallery.length}
              </span>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Main Image Container with Navigation Arrows */}
          <div className="relative flex-1 flex items-center justify-center w-full max-w-6xl mx-auto my-auto min-h-0">
            <button
              onClick={() => setLightboxIndex((lightboxIndex - 1 + property.gallery.length) % property.gallery.length)}
              className="absolute left-2 sm:left-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all active:scale-95 border border-white/20 cursor-pointer shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[70vh] rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <Image
                src={property.gallery[lightboxIndex]}
                alt={`${property.title} gallery photo ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            <button
              onClick={() => setLightboxIndex((lightboxIndex + 1) % property.gallery.length)}
              className="absolute right-2 sm:right-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all active:scale-95 border border-white/20 cursor-pointer shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="w-full max-w-4xl mx-auto pt-3 z-20">
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 px-4 hide-scrollbar">
              {property.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all cursor-pointer ${
                    lightboxIndex === idx ? 'ring-2 ring-[#B9A17D] scale-105 opacity-100' : 'opacity-40 hover:opacity-80'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-[#77736E] flex items-center gap-2 mb-6">
          <Link href="/" className="hover:text-[#171614] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/stays" className="hover:text-[#171614] transition-colors">Stays</Link>
          <span>/</span>
          <Link href={`/destinations/${property.destinationSlug}`} className="hover:text-[#171614] transition-colors">
            {property.destinationName}
          </Link>
          <span>/</span>
          <span className="text-[#171614] font-medium truncate max-w-xs">{property.title}</span>
        </nav>

        {/* Header Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-[#F0EEEA] border border-[#E5E1DA] text-[10px] font-bold uppercase tracking-wider text-[#171614]">
                {property.typeName}
              </span>
              <div className="flex items-center gap-1 text-xs font-semibold text-[#171614]">
                <Star className="w-3.5 h-3.5 fill-[#B9A17D] text-[#B9A17D]" />
                <span>{property.rating.toFixed(2)}</span>
                <span className="text-[#77736E] font-normal">({property.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#171614] tracking-tight">
              {property.title}
            </h1>
            <p className="text-sm text-[#77736E] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#B9A17D] flex-shrink-0" />
              <span>{property.location}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Share */}
            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-full border border-[#E5E1DA] bg-white text-xs font-medium text-[#171614] flex items-center gap-1.5 hover:bg-[#F0EEEA] transition-colors shadow-xs active:scale-95"
              aria-label="Share property link"
            >
              {copiedShare ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#287A55]" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>

            {/* Favorite with Micro-Bounce */}
            <button
              onClick={handleToggleFav}
              className={`px-4 py-2 rounded-full border border-[#E5E1DA] bg-white text-xs font-medium flex items-center gap-1.5 hover:bg-[#F0EEEA] transition-all shadow-xs active:scale-95 ${
                fav ? 'text-[#B9A17D]' : 'text-[#171614]'
              } ${favBouncing ? 'animate-heart-bounce' : ''}`}
              aria-label={fav ? 'Saved to favorites' : 'Save to favorites'}
            >
              <Heart className={`w-3.5 h-3.5 transition-colors ${fav ? 'fill-[#B9A17D]' : ''}`} />
              <span>{fav ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <RevealOnScroll variant="fade-up" duration={700}>
          <div className="relative rounded-3xl overflow-hidden mb-12 shadow-lg border border-[#E5E1DA]/80 bg-[#F0EEEA]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Main Large Image */}
              <div 
                onClick={() => setLightboxIndex(0)}
                className="md:col-span-2 relative aspect-[4/3] md:aspect-auto md:h-[480px] cursor-pointer group overflow-hidden bg-[#F0EEEA]"
              >
                <Image
                  src={property.gallery[0]}
                  alt={property.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-white/95 backdrop-blur-xs text-[#171614] text-xs font-bold px-4 py-2 rounded-full transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                    View Full Gallery
                  </span>
                </div>
              </div>

              {/* Supporting Images: 2x2 Grid with matching 480px total height */}
              <div className="md:col-span-2 grid grid-cols-2 gap-3">
                {property.gallery.slice(1, 5).map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setLightboxIndex(i + 1)}
                    className="relative h-[180px] sm:h-[210px] md:h-[234px] cursor-pointer group overflow-hidden bg-[#F0EEEA]"
                  >
                    <Image
                      src={img}
                      alt={`${property.title} view ${i + 2}`}
                      fill
                      sizes="25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* "Show All Photos" Floating Pill Badge */}
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="absolute bottom-4 right-4 z-10 px-4 py-2 rounded-full bg-white/95 hover:bg-white text-[#171614] text-xs font-semibold flex items-center gap-2 shadow-lg backdrop-blur-xs hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#E5E1DA]/80"
              aria-label={`Show all ${property.gallery.length} photos`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-[#B9A17D]" />
              <span>Show all {property.gallery.length} photos</span>
            </button>
          </div>
        </RevealOnScroll>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-7 space-y-10">
            {/* Overview */}
            <RevealOnScroll variant="fade-up">
              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-normal text-[#171614]">
                  The Sanctuary Overview
                </h2>
                <p className="text-sm sm:text-base text-[#171614]/85 leading-relaxed font-sans font-light">
                  {property.overview}
                </p>

                {/* Quick specs */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E5E1DA]">
                  <div className="p-4 rounded-2xl bg-white border border-[#E5E1DA] text-center hover:shadow-sm transition-shadow">
                    <Users className="w-5 h-5 mx-auto text-[#B9A17D] mb-1" />
                    <div className="text-xs font-bold text-[#171614]">{property.maxGuests} Guests</div>
                    <div className="text-[10px] text-[#77736E]">Maximum capacity</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-[#E5E1DA] text-center hover:shadow-sm transition-shadow">
                    <Bed className="w-5 h-5 mx-auto text-[#B9A17D] mb-1" />
                    <div className="text-xs font-bold text-[#171614]">{property.bedrooms} Bedroom{property.bedrooms > 1 ? 's' : ''}</div>
                    <div className="text-[10px] text-[#77736E]">{property.beds} luxury beds</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-[#E5E1DA] text-center hover:shadow-sm transition-shadow">
                    <Bath className="w-5 h-5 mx-auto text-[#B9A17D] mb-1" />
                    <div className="text-xs font-bold text-[#171614]">{property.bathrooms} Bathroom{property.bathrooms > 1 ? 's' : ''}</div>
                    <div className="text-[10px] text-[#77736E]">En-suite facilities</div>
                  </div>
                </div>
              </section>
            </RevealOnScroll>

            {/* Amenities */}
            <RevealOnScroll variant="fade-up">
              <section className="space-y-4 pt-6 border-t border-[#E5E1DA]">
                <h2 className="text-2xl font-serif font-normal text-[#171614]">
                  Curated Amenities & Inclusions
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {propertyAmenities.map((amenity) => (
                    <div
                      key={amenity.id}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E5E1DA] text-xs font-medium text-[#171614] hover:border-[#B9A17D]/60 transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-[#B9A17D] flex-shrink-0" />
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            </RevealOnScroll>

            {/* Policies & Rules */}
            <RevealOnScroll variant="fade-up">
              <section className="space-y-4 pt-6 border-t border-[#E5E1DA]">
                <h2 className="text-2xl font-serif font-normal text-[#171614]">
                  House Rules & Policies
                </h2>
                
                <div className="space-y-3 text-xs text-[#77736E]">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#171614]" />
                    <span>Check-in: <strong>{property.checkInTime}</strong> | Check-out: <strong>{property.checkOutTime}</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#287A55]" />
                    <span>{property.cancellationPolicy}</span>
                  </div>
                </div>

                <ul className="list-disc list-inside space-y-1.5 text-xs text-[#77736E] pt-2">
                  {property.rules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </section>
            </RevealOnScroll>

            {/* Guest Reviews */}
            <RevealOnScroll variant="fade-up">
              <section className="space-y-6 pt-6 border-t border-[#E5E1DA]">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-serif font-normal text-[#171614]">
                    Guest Stories & Reviews
                  </h2>
                  <div className="flex items-center gap-1 font-bold text-sm text-[#171614]">
                    <Star className="w-4 h-4 fill-[#B9A17D] text-[#B9A17D]" />
                    <span>{property.rating.toFixed(2)} rating</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {property.reviews.map((rev) => (
                    <div key={rev.id} className="p-6 rounded-2xl bg-white border border-[#E5E1DA] space-y-2 hover:shadow-xs transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-bold text-[#171614]">{rev.author}</div>
                          <div className="text-[11px] text-[#77736E]">{rev.authorLocation}</div>
                        </div>
                        <div className="text-[11px] text-[#77736E]">{rev.date}</div>
                      </div>
                      <p className="text-xs text-[#171614]/80 leading-relaxed font-sans italic font-light">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </RevealOnScroll>
          </div>

          {/* Right Column: Sticky Booking Panel */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-white border border-[#E5E1DA] rounded-3xl p-7 shadow-xl space-y-6 transition-all duration-300">
              {/* Price header */}
              <div className="flex items-baseline justify-between pb-4 border-b border-[#E5E1DA]">
                <div>
                  <span
                    key={`nightly-${property.pricePerNight}`}
                    className="text-3xl font-bold font-serif text-[#171614] inline-block animate-price-update"
                  >
                    {formatCurrency(property.pricePerNight)}
                  </span>
                  <span className="text-xs text-[#77736E]"> / night</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-[#171614]">
                  <Star className="w-3.5 h-3.5 fill-[#B9A17D] text-[#B9A17D]" />
                  <span>{property.rating.toFixed(2)}</span>
                </div>
              </div>

              {/* Date & Guests Selector Form */}
              <div className="rounded-2xl border border-[#E5E1DA] divide-y divide-[#E5E1DA] overflow-hidden text-xs">
                <div className="grid grid-cols-2 divide-x divide-[#E5E1DA]">
                  <div className="p-3">
                    <label className="block text-[10px] font-bold text-[#77736E] uppercase">Check-in</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full mt-1 font-semibold text-[#171614] focus:outline-none bg-transparent cursor-pointer"
                    />
                  </div>
                  <div className="p-3">
                    <label className="block text-[10px] font-bold text-[#77736E] uppercase">Check-out</label>
                    <input
                      type="date"
                      min={checkIn}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full mt-1 font-semibold text-[#171614] focus:outline-none bg-transparent cursor-pointer"
                    />
                  </div>
                </div>

                <div className="p-3 flex items-center justify-between">
                  <div>
                    <label className="block text-[10px] font-bold text-[#77736E] uppercase">Guests</label>
                    <span className="font-semibold text-[#171614]">{guests} guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={guests <= 1}
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-7 h-7 rounded-full border border-[#E5E1DA] flex items-center justify-center text-xs disabled:opacity-30 active:scale-90 transition-transform"
                      aria-label="Decrease guest count"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{guests}</span>
                    <button
                      type="button"
                      disabled={guests >= property.maxGuests}
                      onClick={() => setGuests(Math.min(property.maxGuests, guests + 1))}
                      className="w-7 h-7 rounded-full border border-[#E5E1DA] flex items-center justify-center text-xs disabled:opacity-30 active:scale-90 transition-transform"
                      aria-label="Increase guest count"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Calculation Breakdown with smooth numeric transitions */}
              <div className="space-y-2.5 text-xs text-[#77736E] pt-2">
                <div className="flex justify-between">
                  <span>{formatCurrency(property.pricePerNight)} × {nights} nights</span>
                  <span className="font-medium text-[#171614]">{formatCurrency(pricing.baseTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Artisanal Cleaning Fee</span>
                  <span className="font-medium text-[#171614]">{formatCurrency(pricing.cleaningFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Curator Service Fee</span>
                  <span className="font-medium text-[#171614]">{formatCurrency(pricing.serviceFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Regional Occupancy Taxes</span>
                  <span className="font-medium text-[#171614]">{formatCurrency(pricing.taxes)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#E5E1DA] text-sm font-bold text-[#171614]">
                  <span>Estimated Total</span>
                  <span
                    key={`total-${pricing.total}`}
                    className="text-[#171614] inline-block animate-price-update"
                  >
                    {formatCurrency(pricing.total)}
                  </span>
                </div>
              </div>

              {/* Reserve Button with hover motion */}
              <button
                type="button"
                onClick={handleProceedBooking}
                className="w-full py-4 rounded-full bg-[#171614] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#2A2926] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg group"
              >
                <span>Reserve Stay</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#B9A17D]" />
              </button>

              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E5E1DA] flex items-start gap-2.5 text-[11px] text-[#77736E] leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-[#B9A17D] flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Simulated Demo Booking:</strong> No credit card or genuine payment is processed. You will be able to review reservation policies in the next step.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Stays Section */}
        {similarStays.length > 0 && (
          <RevealOnScroll variant="fade-up">
            <div className="mt-20 pt-12 border-t border-[#E5E1DA]">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#B9A17D]">
                    Curated Recommendations
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#171614] mt-1">
                    Similar Stays You May Love
                  </h2>
                </div>
                <Link
                  href="/stays"
                  className="text-xs font-bold uppercase tracking-wider text-[#171614] hover:text-[#B9A17D] transition-colors"
                >
                  Browse All
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {similarStays.map((s) => (
                  <PropertyCard key={s.id} property={s} />
                ))}
              </div>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </div>
  );
}

function StayDetailWrapper({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = use(params);
  return <StayDetailContent slug={resolved.slug} />;
}

export default function StayDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-[#77736E]">Loading stay details...</div>}>
      <StayDetailWrapper params={params} />
    </Suspense>
  );
}
