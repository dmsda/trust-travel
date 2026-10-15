'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { leisureExperiences } from '@/data/leisure';
import { formatCurrency } from '@/lib/currency';
import { Clock, Users, Star, ArrowRight, Check, Sparkles, X, Loader2 } from 'lucide-react';
import { LeisureExperience } from '@/types';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';

export default function LeisurePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeExp, setActiveExp] = useState<LeisureExperience | null>(null);
  const [inquired, setInquired] = useState(false);
  const [inquireSuccess, setInquireSuccess] = useState(false);

  const categories = ['All', 'Cultural', 'Gastronomic', 'Adventure', 'Wellness'];

  const filtered = leisureExperiences.filter(
    (e) => selectedCategory === 'All' || e.category === selectedCategory
  );

  const handleInquire = () => {
    setInquired(true);
    setTimeout(() => {
      setInquired(false);
      setInquireSuccess(true);
      setTimeout(() => {
        setInquireSuccess(false);
        setActiveExp(null);
      }, 1800);
    }, 850);
  };

  return (
    <div className="w-full pb-24">
      {/* Experience Details Modal with backdrop blur and smooth entrance */}
      {activeExp && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-xl w-full p-7 sm:p-9 border border-[#E5E1DA] shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveExp(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#FAF9F6] border border-[#E5E1DA] flex items-center justify-center text-[#77736E] hover:text-[#171614] hover:bg-[#F0EEEA] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#F0EEEA] mb-5">
              <Image
                src={activeExp.coverImage}
                alt={activeExp.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E5E1DA] text-[10px] font-bold uppercase tracking-wider text-[#B9A17D]">
                {activeExp.category} &bull; {activeExp.destinationName}
              </span>

              <h2 className="text-2xl font-serif font-normal text-[#171614]">
                {activeExp.title}
              </h2>

              <p className="text-xs text-[#77736E] leading-relaxed font-light">
                {activeExp.overview}
              </p>

              <div className="space-y-2 pt-2 border-t border-[#E5E1DA]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#171614]">Experience Inclusions</h4>
                <ul className="space-y-1.5 text-xs text-[#77736E]">
                  {activeExp.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#287A55]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#E5E1DA] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#77736E]">Per person rate</span>
                  <div className="text-xl font-bold text-[#171614]">
                    {formatCurrency(activeExp.pricePerPersonUsd)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleInquire}
                  disabled={inquired || inquireSuccess}
                  className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                    inquireSuccess
                      ? 'bg-[#287A55] text-white'
                      : 'bg-[#171614] text-white hover:bg-[#2A2926] active:scale-95'
                  }`}
                >
                  {inquired ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Requesting...</span>
                    </>
                  ) : inquireSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Request Confirmed</span>
                    </>
                  ) : (
                    <span>Reserve Experience</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <section className="bg-white border-b border-[#E5E1DA] pt-12 pb-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E5E1DA] text-[11px] font-semibold tracking-wider uppercase text-[#171614]">
              <Sparkles className="w-3.5 h-3.5 text-[#B9A17D]" />
              <span>Artisan & Cultural Leisure</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-[#171614] tracking-tight">
              Immersive Travel Experiences
            </h1>

            <p className="text-sm sm:text-base text-[#77736E] font-sans font-light leading-relaxed">
              Step beyond conventional tourism. Partake in private tea ceremonies with Kyoto masters, hunt truffles in centuries-old Tuscan oak woods, and paddle secluded highland sea lochs.
            </p>
          </div>

          {/* Category Filter Pills with smooth transition */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-[#171614] text-white shadow-xs scale-105'
                    : 'bg-[#FAF9F6] text-[#77736E] border border-[#E5E1DA] hover:text-[#171614] hover:bg-[#F0EEEA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((exp, index) => (
            <RevealOnScroll key={exp.id} variant="fade-up" delay={index * 100}>
              <div
                onClick={() => setActiveExp(exp)}
                className="group cursor-pointer bg-white rounded-3xl border border-[#E5E1DA] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F0EEEA]">
                    <Image
                      src={exp.coverImage}
                      alt={exp.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#171614]">
                      {exp.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#77736E]">
                      <span>{exp.destinationName}</span>
                      <div className="flex items-center gap-1 font-semibold text-[#171614]">
                        <Star className="w-3.5 h-3.5 fill-[#B9A17D] text-[#B9A17D]" />
                        <span>{exp.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-serif font-medium text-[#171614] leading-snug group-hover:text-[#B9A17D] transition-colors line-clamp-2">
                      {exp.title}
                    </h3>

                    <div className="flex items-center gap-4 text-[11px] text-[#77736E] pt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#171614]" />
                        {exp.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#171614]" />
                        {exp.groupSize}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#E5E1DA]/60 mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#77736E]">From</span>
                    <div className="text-base font-bold text-[#171614]">
                      {formatCurrency(exp.pricePerPersonUsd)} <span className="text-xs font-normal text-[#77736E]">/ person</span>
                    </div>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-[#171614] group-hover:text-[#B9A17D] transition-colors inline-flex items-center gap-1">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}
