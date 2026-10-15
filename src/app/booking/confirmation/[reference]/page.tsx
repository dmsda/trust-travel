'use client';

import React, { useState, use, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Printer, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { formatCurrency } from '@/lib/currency';
import { formatDateDisplay } from '@/lib/date-utils';

interface StoredReservation {
  reference: string;
  propertyTitle: string;
  propertyLocation: string;
  coverImage: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  pricing: {
    pricePerNight: number;
    baseTotal: number;
    cleaningFee: number;
    serviceFee: number;
    taxes: number;
    total: number;
  };
}

function ConfirmationContent({ reference }: { reference: string }) {
  const [booking] = useState<StoredReservation>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(`trust_booking_${reference}`);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch {
        // fallback
      }
    }
    return {
      reference,
      propertyTitle: 'The Brera Atelier Suite',
      propertyLocation: 'Via Fiori Chiari, Brera, Milan, Italy',
      coverImage: '/assets/images/properties/hotel-01.jpg',
      checkIn: '2026-06-23',
      checkOut: '2026-06-29',
      nights: 6,
      guests: 2,
      firstName: 'Julian',
      lastName: 'Sterling',
      email: 'traveler@sample.com',
      pricing: {
        pricePerNight: 380,
        baseTotal: 2280,
        cleaningFee: 95,
        serviceFee: 228,
        taxes: 182,
        total: 2785,
      },
    };
  });

  return (
    <div className="w-full pb-24 pt-8">
      <div className="max-w-[840px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Confirmation Success Header with celebratory checkmark reveal */}
        <div className="text-center space-y-4 mb-10 animate-in fade-in duration-500">
          <div className="w-18 h-18 rounded-full bg-[#287A55]/10 text-[#287A55] border-2 border-[#287A55]/30 flex items-center justify-center mx-auto shadow-sm animate-in zoom-in-75 duration-500">
            <Check className="w-9 h-9 stroke-[2.5]" />
          </div>

          <div className="inline-block px-3.5 py-1 rounded-full bg-[#F0EEEA] border border-[#E5E1DA] text-xs font-bold tracking-widest text-[#171614] uppercase">
            Reservation Ref: {booking.reference}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#171614]">
            Your Stay is Reserved
          </h1>

          <p className="text-sm text-[#77736E] max-w-md mx-auto font-light leading-relaxed">
            A confirmation dispatch has been prepared for <strong>{booking.email}</strong>. We look forward to welcoming you to {booking.propertyTitle}.
          </p>
        </div>

        {/* Prototype Notice Alert */}
        <div className="p-4 rounded-2xl bg-[#F0EEEA] border border-[#E5E1DA] flex items-start gap-3 mb-8 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-[#B9A17D] flex-shrink-0 mt-0.5" />
          <div className="text-xs text-[#77736E] leading-relaxed">
            <strong className="text-[#171614]">Prototype Booking Confirmation:</strong> This confirmation demonstrates the TRUST.TRAVEL guest reservation architecture. No actual bank transaction occurred, and no real hotel room has been locked in a live GDS or PMS system.
          </div>
        </div>

        {/* Print-friendly Card Container with subtle entrance slide */}
        <div className="bg-white rounded-3xl border border-[#E5E1DA] p-7 sm:p-10 shadow-lg space-y-8 print:shadow-none print:border-none animate-in fade-in slide-in-from-bottom-4 duration-600">
          {/* Property & Host block */}
          <div className="flex flex-col sm:flex-row gap-6 items-start pb-8 border-b border-[#E5E1DA]">
            <div className="relative w-full sm:w-44 h-32 rounded-2xl overflow-hidden bg-[#F0EEEA] flex-shrink-0">
              <Image
                src={booking.coverImage}
                alt={booking.propertyTitle}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-1.5 flex-1">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#B9A17D]">
                Confirmed Reservation
              </span>
              <h2 className="text-2xl font-serif font-normal text-[#171614]">
                {booking.propertyTitle}
              </h2>
              <p className="text-xs text-[#77736E] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#B9A17D]" />
                <span>{booking.propertyLocation}</span>
              </p>
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-8 border-b border-[#E5E1DA] text-xs">
            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E5E1DA]">
              <span className="block text-[10px] font-bold text-[#77736E] uppercase mb-1">Check-in</span>
              <div className="text-sm font-semibold text-[#171614]">{formatDateDisplay(booking.checkIn)}</div>
              <div className="text-[11px] text-[#77736E]">From 15:00</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E5E1DA]">
              <span className="block text-[10px] font-bold text-[#77736E] uppercase mb-1">Check-out</span>
              <div className="text-sm font-semibold text-[#171614]">{formatDateDisplay(booking.checkOut)}</div>
              <div className="text-[11px] text-[#77736E]">By 11:00</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E5E1DA]">
              <span className="block text-[10px] font-bold text-[#77736E] uppercase mb-1">Party</span>
              <div className="text-sm font-semibold text-[#171614]">{booking.guests} Guests</div>
              <div className="text-[11px] text-[#77736E]">{booking.nights} nights total</div>
            </div>
          </div>

          {/* Primary Guest Info */}
          <div className="space-y-2 pb-8 border-b border-[#E5E1DA] text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171614]">
              Lead Guest
            </h3>
            <div className="grid grid-cols-2 gap-4 text-[#77736E]">
              <div>Name: <strong className="text-[#171614]">{booking.firstName} {booking.lastName}</strong></div>
              <div>Email: <strong className="text-[#171614]">{booking.email}</strong></div>
              {booking.phone && <div>Phone: <strong className="text-[#171614]">{booking.phone}</strong></div>}
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-2.5 text-xs text-[#77736E]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171614] mb-3">
              Total Rate Summary
            </h3>
            <div className="flex justify-between">
              <span>Accommodation ({booking.nights} nights)</span>
              <span className="font-semibold text-[#171614]">{formatCurrency(booking.pricing.baseTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Cleaning & Service Fees</span>
              <span className="font-semibold text-[#171614]">{formatCurrency(booking.pricing.cleaningFee + booking.pricing.serviceFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & Tourism Levies</span>
              <span className="font-semibold text-[#171614]">{formatCurrency(booking.pricing.taxes)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-[#E5E1DA] text-base font-bold text-[#171614]">
              <span>Grand Total</span>
              <span>{formatCurrency(booking.pricing.total)}</span>
            </div>
          </div>

          {/* Actions: Print & Back with micro-interactions */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-full border border-[#E5E1DA] text-xs font-semibold text-[#171614] hover:bg-[#F0EEEA] active:scale-95 transition-all flex items-center gap-2 shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print Itinerary</span>
            </button>

            <Link
              href="/stays"
              className="px-6 py-2.5 rounded-full bg-[#171614] text-white text-xs font-semibold hover:bg-[#2A2926] active:scale-95 transition-all flex items-center gap-2 shadow-md group"
            >
              <span>Explore More Stays</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfirmationWrapper({ params }: { params: Promise<{ reference: string }> }) {
  const resolved = use(params);
  return <ConfirmationContent reference={resolved.reference} />;
}

export default function ConfirmationPage({ params }: { params: Promise<{ reference: string }> }) {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-[#77736E]">Loading confirmation...</div>}>
      <ConfirmationWrapper params={params} />
    </Suspense>
  );
}
