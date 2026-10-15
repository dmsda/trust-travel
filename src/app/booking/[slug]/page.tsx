'use client';

import React, { useState, use, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { properties } from '@/data/properties';
import { calculatePricingBreakdown, generateBookingReference } from '@/lib/booking-utils';
import { formatCurrency } from '@/lib/currency';
import { calculateNights, formatDateDisplay, getDefaultDemoDates } from '@/lib/date-utils';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';

function BookingFlowContent({ slug }: { slug: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const property = properties.find((p) => p.slug === slug);
  if (!property) {
    notFound();
  }

  const defaultDates = getDefaultDemoDates();
  const checkIn = searchParams.get('checkIn') || defaultDates.checkIn;
  const checkOut = searchParams.get('checkOut') || defaultDates.checkOut;
  const guests = Number(searchParams.get('guests')) || 2;

  const nights = calculateNights(checkIn, checkOut);
  const pricing = calculatePricingBreakdown(property.pricePerNight, nights);

  // Guest Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!firstName.trim()) errs.firstName = 'First name is required';
    if (!lastName.trim()) errs.lastName = 'Last name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    if (!agreed) errs.agreed = 'You must agree to the reservation terms to proceed';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const reference = generateBookingReference();
    const reservationData = {
      reference,
      propertySlug: property.slug,
      propertyTitle: property.title,
      propertyLocation: property.location,
      coverImage: property.coverImage,
      checkIn,
      checkOut,
      nights,
      guests,
      firstName,
      lastName,
      email,
      phone,
      specialRequests,
      pricing,
      createdAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(`trust_booking_${reference}`, JSON.stringify(reservationData));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }

    setTimeout(() => {
      router.push(`/booking/confirmation/${reference}`);
    }, 700);
  };

  return (
    <div className="w-full pb-24 pt-8">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb */}
        <div className="mb-8">
          <Link
            href={`/stays/${property.slug}`}
            className="text-xs font-semibold text-[#77736E] hover:text-[#171614] inline-flex items-center gap-1.5 transition-colors mb-2"
          >
            ← Back to accommodation details
          </Link>
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-[#171614]">
            Review Reservation & Guest Details
          </h1>
        </div>

        {/* 2-Column Booking Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Guest Form */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Prototype notice banner */}
            <div className="p-4 rounded-2xl bg-[#F0EEEA] border border-[#E5E1DA] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#B9A17D] flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[#77736E] leading-relaxed">
                <strong className="text-[#171614]">Demonstration Reservation Mode:</strong> This booking simulates a live reservation workflow. No payment card details are collected or processed.
              </div>
            </div>

            <form onSubmit={handleConfirmReservation} className="space-y-6 bg-white p-7 sm:p-9 rounded-3xl border border-[#E5E1DA] shadow-xs">
              
              <h2 className="text-xl font-serif font-normal text-[#171614] pb-2 border-b border-[#E5E1DA]">
                1. Primary Guest Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#171614] uppercase tracking-wider mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Julian"
                    className={`w-full p-3 bg-[#FAF9F6] border rounded-xl text-sm text-[#171614] focus:outline-none ${
                      errors.firstName ? 'border-[#B42318]' : 'border-[#E5E1DA] focus:border-[#B9A17D]'
                    }`}
                  />
                  {errors.firstName && <p className="text-[11px] text-[#B42318] mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#171614] uppercase tracking-wider mb-1.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Sterling"
                    className={`w-full p-3 bg-[#FAF9F6] border rounded-xl text-sm text-[#171614] focus:outline-none ${
                      errors.lastName ? 'border-[#B42318]' : 'border-[#E5E1DA] focus:border-[#B9A17D]'
                    }`}
                  />
                  {errors.lastName && <p className="text-[11px] text-[#B42318] mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#171614] uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="julian@sample.com"
                    className={`w-full p-3 bg-[#FAF9F6] border rounded-xl text-sm text-[#171614] focus:outline-none ${
                      errors.email ? 'border-[#B42318]' : 'border-[#E5E1DA] focus:border-[#B9A17D]'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-[#B42318] mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#171614] uppercase tracking-wider mb-1.5">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full p-3 bg-[#FAF9F6] border border-[#E5E1DA] rounded-xl text-sm text-[#171614] focus:outline-none focus:border-[#B9A17D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171614] uppercase tracking-wider mb-1.5">
                  Special Requests or Dietary Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Late flight arrival, vegan breakfast preference, fragrance-free linens..."
                  className="w-full p-3 bg-[#FAF9F6] border border-[#E5E1DA] rounded-xl text-sm text-[#171614] focus:outline-none focus:border-[#B9A17D]"
                />
              </div>

              <div className="pt-4 border-t border-[#E5E1DA]">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-[#171614] rounded border-[#E5E1DA]"
                  />
                  <span className="text-xs text-[#77736E] leading-relaxed">
                    I acknowledge the accommodation house rules, check-in window ({property.checkInTime}), and cancellation policy. I understand this is a demonstration booking confirmation.
                  </span>
                </label>
                {errors.agreed && <p className="text-[11px] text-[#B42318] mt-1">{errors.agreed}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-full bg-[#171614] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#2A2926] disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg group"
              >
                <span>{submitting ? 'Confirming Demo Reservation...' : 'Complete Demo Reservation'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>

          </div>

          {/* Right Column: Reservation Summary Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#E5E1DA] rounded-3xl p-7 shadow-lg space-y-6 sticky top-28">
              
              <h2 className="text-lg font-serif font-bold text-[#171614] pb-2 border-b border-[#E5E1DA]">
                Reservation Summary
              </h2>

              {/* Property mini card */}
              <div className="flex gap-4 items-center">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#F0EEEA] flex-shrink-0">
                  <Image
                    src={property.coverImage}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#B9A17D] uppercase tracking-wider">
                    {property.typeName}
                  </div>
                  <h3 className="text-sm font-bold text-[#171614] leading-tight">
                    {property.title}
                  </h3>
                  <p className="text-xs text-[#77736E] mt-0.5">{property.location}</p>
                </div>
              </div>

              {/* Stay Dates & Guests */}
              <div className="rounded-2xl bg-[#FAF9F6] border border-[#E5E1DA] p-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#77736E]">Dates:</span>
                  <span className="font-semibold text-[#171614]">
                    {formatDateDisplay(checkIn)} — {formatDateDisplay(checkOut)} ({nights} nights)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#77736E]">Guests:</span>
                  <span className="font-semibold text-[#171614]">{guests} guests</span>
                </div>
              </div>

              {/* Detailed Price Breakdown */}
              <div className="space-y-2.5 text-xs text-[#77736E] pt-2 border-t border-[#E5E1DA]">
                <div className="flex justify-between">
                  <span>{formatCurrency(property.pricePerNight)} × {nights} nights</span>
                  <span className="font-medium text-[#171614]">{formatCurrency(pricing.baseTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning & Linen Service</span>
                  <span className="font-medium text-[#171614]">{formatCurrency(pricing.cleaningFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Curator Service Fee</span>
                  <span className="font-medium text-[#171614]">{formatCurrency(pricing.serviceFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Occupancy Taxes</span>
                  <span className="font-medium text-[#171614]">{formatCurrency(pricing.taxes)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#E5E1DA] text-base font-bold text-[#171614]">
                  <span>Total Amount</span>
                  <span>{formatCurrency(pricing.total)}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function BookingWrapper({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  return <BookingFlowContent slug={resolvedParams.slug} />;
}

export default function BookingPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-[#77736E]">Loading booking details...</div>}>
      <BookingWrapper params={params} />
    </Suspense>
  );
}
