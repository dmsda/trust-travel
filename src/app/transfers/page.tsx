'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { transferOptions } from '@/data/transfers';
import { formatCurrency } from '@/lib/currency';
import { Car, Users, Luggage, ShieldCheck, Check, MapPin, Navigation, Sparkles, Loader2 } from 'lucide-react';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';

export default function TransfersPage() {
  const [pickup, setPickup] = useState('Milan Malpensa Airport (MXP)');
  const [dropoff, setDropoff] = useState('Via Fiori Chiari, Brera, Milan');
  const [date, setDate] = useState('2026-06-23');
  const [passengers, setPassengers] = useState(2);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('transfer-sedan');
  const [requestingId, setRequestingId] = useState<string | null>(null);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);

  const handleRequestQuote = (id: string) => {
    setRequestingId(id);
    setTimeout(() => {
      setRequestingId(null);
      setConfirmedId(id);
      setTimeout(() => setConfirmedId(null), 3500);
    }, 900);
  };

  const selectedVehicle = transferOptions.find((o) => o.id === selectedVehicleId) || transferOptions[0];

  return (
    <div className="w-full pb-24">
      {/* Transfers Hero */}
      <section className="pt-2 pb-12">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden min-h-[460px] md:min-h-[520px] flex flex-col justify-end p-8 sm:p-12 md:p-16 shadow-2xl">
            <Image
              src="/assets/images/hero/hero-travel.jpg"
              alt="Executive ground transfer scenic road"
              fill
              priority
              className="object-cover brightness-[0.82] transition-transform duration-1000 ease-out hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            <div className="relative z-10 text-white max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase border border-white/20">
                <Car className="w-3.5 h-3.5 text-[#CBB392]" />
                <span>Effortless Ground Mobility</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-white tracking-tight leading-[1.1]">
                Private Airport & Ground Transfers
              </h1>

              <p className="text-sm sm:text-base text-white/90 font-sans font-light leading-relaxed">
                Curated executive chauffeurs, first-class alpine rail reservations, and zero-emission luxury vehicle rentals directly to your sanctuary door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transfer Search / Interactive Route Form */}
      <section className="py-6">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll variant="fade-up">
            <div className="bg-white rounded-3xl border border-[#E5E1DA] p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E1DA] mb-6 gap-2">
                <div>
                  <h2 className="text-xl font-serif font-normal text-[#171614]">
                    Plan Your Transfer Route
                  </h2>
                  <p className="text-xs text-[#77736E] mt-0.5">Fixed rates with zero surge pricing and direct airport terminal greeting.</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#287A55]">
                  <Sparkles className="w-4 h-4 text-[#B9A17D]" />
                  <span>Complimentary Flight Tracking</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#77736E] uppercase mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B9A17D]" />
                    <span>Pick-up Location</span>
                  </label>
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Airport, station, or address"
                    className="w-full p-3 bg-[#FAF9F6] border border-[#E5E1DA] rounded-xl text-xs font-semibold text-[#171614] focus:outline-none focus:border-[#B9A17D] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#77736E] uppercase mb-1 flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5 text-[#B9A17D]" />
                    <span>Destination Address</span>
                  </label>
                  <input
                    type="text"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    placeholder="Hotel or villa address"
                    className="w-full p-3 bg-[#FAF9F6] border border-[#E5E1DA] rounded-xl text-xs font-semibold text-[#171614] focus:outline-none focus:border-[#B9A17D] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#77736E] uppercase mb-1">Travel Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 bg-[#FAF9F6] border border-[#E5E1DA] rounded-xl text-xs font-semibold text-[#171614] focus:outline-none focus:border-[#B9A17D] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#77736E] uppercase mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#B9A17D]" />
                    <span>Passengers</span>
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full p-3 bg-[#FAF9F6] border border-[#E5E1DA] rounded-xl text-xs font-semibold text-[#171614] focus:outline-none focus:border-[#B9A17D] transition-colors"
                  >
                    <option value={1}>1 Passenger</option>
                    <option value={2}>2 Passengers</option>
                    <option value={4}>4 Passengers</option>
                    <option value={7}>Up to 7 (Executive Van)</option>
                  </select>
                </div>
              </div>

              {/* Decorative Travel Route Illustration */}
              <div className="mt-6 pt-4 border-t border-[#E5E1DA]/60">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-[#77736E]">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#171614]" />
                    <span className="font-semibold text-[#171614]">{pickup}</span>
                    <span className="text-[#B9A17D] font-bold tracking-widest">········▶</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B9A17D]" />
                    <span className="font-semibold text-[#171614]">{dropoff}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[11px] font-semibold text-[#171614] bg-[#FAF9F6] border border-[#E5E1DA] px-2.5 py-0.5 rounded-full">
                      Tier: {selectedVehicle.name}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#287A55]" />
                      <span>Flight delay buffer & 60-min terminal wait included.</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Transfer Fleet Options */}
      <section className="py-10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#B9A17D]">
                Fleet & Mobility Tier
              </span>
              <h2 className="text-3xl font-serif font-normal text-[#171614] mt-1">
                Available Mobility Options
              </h2>
            </div>
            <div className="text-xs text-[#77736E] hidden sm:block">
              Click a vehicle to configure instant reservation
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transferOptions.map((opt, index) => {
              const isSelected = selectedVehicleId === opt.id;
              const isConfirmed = confirmedId === opt.id;
              const isRequesting = requestingId === opt.id;

              return (
                <RevealOnScroll key={opt.id} variant="fade-up" delay={index * 120}>
                  <div
                    onClick={() => setSelectedVehicleId(opt.id)}
                    className={`bg-white rounded-3xl border p-6 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer relative ${
                      isSelected ? 'border-[#B9A17D] ring-2 ring-[#B9A17D]/30' : 'border-[#E5E1DA]'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute -top-3 left-6 bg-[#B9A17D] text-white px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Selected Fleet</span>
                      </div>
                    )}

                    <div>
                      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#F0EEEA] mb-4">
                        <Image
                          src={opt.image}
                          alt={opt.name}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-106"
                        />
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#171614]">
                          {opt.category}
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-[#171614] leading-snug mb-2 group-hover:text-[#B9A17D] transition-colors">
                        {opt.name}
                      </h3>

                      <p className="text-xs text-[#77736E] leading-relaxed mb-4 font-light">
                        {opt.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-[#77736E] py-2 border-y border-[#E5E1DA]">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-[#171614]" />
                          {opt.capacityPassengers} seats
                        </span>
                        <span className="flex items-center gap-1">
                          <Luggage className="w-3.5 h-3.5 text-[#171614]" />
                          {opt.capacityLuggage} bags
                        </span>
                      </div>

                      <ul className="space-y-1.5 text-[11px] text-[#77736E] pt-3">
                        {opt.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-[#287A55]" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 mt-4 border-t border-[#E5E1DA] flex items-center justify-between">
                      <div>
                        <span className="text-xs text-[#77736E]">Estimated from</span>
                        <div className="text-lg font-bold text-[#171614]">
                          {formatCurrency(opt.estimatedPriceUsd)}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRequestQuote(opt.id);
                        }}
                        disabled={isRequesting}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 active:scale-95 ${
                          isConfirmed
                            ? 'bg-[#287A55] text-white shadow-sm'
                            : isSelected
                            ? 'bg-[#171614] text-white hover:bg-[#2A2926]'
                            : 'bg-[#F0EEEA] text-[#171614] hover:bg-[#E5E1DA]'
                        }`}
                      >
                        {isRequesting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Routing...</span>
                          </>
                        ) : isConfirmed ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Drafted</span>
                          </>
                        ) : (
                          <span>Reserve</span>
                        )}
                      </button>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
