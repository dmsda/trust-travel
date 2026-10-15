import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CompassIcon } from '@/components/brand/Logo';
import { ShieldCheck, Sparkles, Award, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Our Philosophy & Curatorial Mission | TRUST.TRAVEL',
  description: 'Learn about TRUST.TRAVEL, our commitment to architectural integrity, honest hospitality, and effortless travel discovery.'
};

export default function AboutPage() {
  return (
    <div className="w-full pb-24">
      
      {/* Editorial Hero */}
      <section className="bg-white border-b border-[#E5E1DA] pt-14 pb-20">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF9F6] border border-[#E5E1DA] text-[11px] font-semibold tracking-wider uppercase text-[#171614]">
            <CompassIcon className="w-4 h-4" />
            <span>The Brand Philosophy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-[#171614] tracking-tight leading-[1.12]">
            Restoring Calm, Beauty, and Clarity to the Act of Travel
          </h1>

          <p className="text-base sm:text-lg text-[#77736E] font-sans font-light max-w-2xl mx-auto leading-relaxed">
            TRUST.TRAVEL was founded on a simple observation: modern booking platforms have become cluttered with noisy urgency alerts, generic algorithms, and disposable architecture. We believe a stay should feel inspiring before you even arrive.
          </p>
        </div>
      </section>

      {/* Narrative Section with Editorial Layout */}
      <section className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg bg-[#F0EEEA]">
            <Image
              src="/assets/images/destinations/scotland.jpg"
              alt="Highland sanctuary retreat"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <span className="text-[10px] font-bold tracking-wider uppercase text-[#B9A17D]">
              Our Curation Standard
            </span>
            <h2 className="text-3xl font-serif font-normal text-[#171614]">
              Architecture with Provenance
            </h2>
            <p className="text-sm text-[#77736E] leading-relaxed">
              Every address on TRUST.TRAVEL is vetted for architectural character, honest craftsmanship, and respect for its local surroundings. We prioritize properties restored with breathable lime plasters, local stones, hand-hewn timbers, and tactile interior textiles.
            </p>
            <p className="text-sm text-[#77736E] leading-relaxed">
              Whether an intimate atelier apartment in Milan’s Brera quarter or an off-grid timber cabin nestled high in the Bavarian Alps, each residence offers authentic quietude.
            </p>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="pt-12 border-t border-[#E5E1DA]">
          <h2 className="text-2xl font-serif font-normal text-center text-[#171614] mb-12">
            The Three Principles of TRUST.TRAVEL
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 rounded-3xl bg-white border border-[#E5E1DA] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#E5E1DA] flex items-center justify-center text-[#B9A17D]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#171614]">Transparent Certainty</h3>
              <p className="text-xs text-[#77736E] leading-relaxed">
                No hidden cleaning surprises at checkout. Complete fee breakdowns, verified high-resolution photography, and guaranteed check-in protocols.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-[#E5E1DA] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#E5E1DA] flex items-center justify-center text-[#B9A17D]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#171614]">Editorial Integrity</h3>
              <p className="text-xs text-[#77736E] leading-relaxed">
                We reject generic listings. Every stay in our directory must have a distinctive story, attentive custodian, and thoughtful design identity.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-[#E5E1DA] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#E5E1DA] flex items-center justify-center text-[#B9A17D]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#171614]">Custodian Respect</h3>
              <p className="text-xs text-[#77736E] leading-relaxed">
                We empower hosts to preserve historic architecture with fair economic terms, sustainable guest education, and community integration.
              </p>
            </div>
          </div>
        </div>

        {/* Explore CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#191815] text-white text-center space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-serif font-normal">
            Ready to find your next stay?
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF9F6]/80 max-w-md mx-auto">
            Discover destinations across Scotland, Germany, Nepal, Italy, Japan, and Indonesia.
          </p>
          <div className="pt-2">
            <Link
              href="/stays"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#171614] text-xs font-bold uppercase tracking-wider hover:bg-[#FAF9F6] transition-all"
            >
              <span>Explore Stays</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </section>

    </div>
  );
}
