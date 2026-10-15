import React from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/hero/HeroSection';
import { destinations } from '@/data/destinations';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { ConnectorLines } from '@/components/destinations/ConnectorLines';
import { PropertyTypeCarousel } from '@/components/properties/PropertyTypeCarousel';
import { ExperienceBanner } from '@/components/editorial/ExperienceBanner';
import { StayUpToDateSection } from '@/components/editorial/StayUpToDateSection';
import { NewsletterSection } from '@/components/newsletter/NewsletterSection';
import { CompassIcon } from '@/components/brand/Logo';
import { ArrowRight } from 'lucide-react';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';

export default function HomePage() {
  // Take the 3 signature destinations for Section C: Scotland, Germany, Nepal
  const featuredDestinations = [
    destinations.find((d) => d.slug === 'scotland') || destinations[0],
    destinations.find((d) => d.slug === 'germany') || destinations[1],
    destinations.find((d) => d.slug === 'nepal') || destinations[2],
  ];

  return (
    <div className="w-full">
      {/* SECTION B: HERO BOOKING SEARCH */}
      <HeroSection />

      {/* SECTION C: DISCOVER NEW PLACES */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header: Title on Left, Sunburst + Editorial Statement on Right */}
          <RevealOnScroll variant="fade-up" duration={700}>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-16 relative z-10">
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-normal text-[#171614] leading-[1.08] tracking-tight">
                  Discover <br />
                  <span className="relative inline-block">
                    new places
                    <span className="absolute left-0 bottom-1 w-full h-[2px] bg-[#B9A17D]/40 rounded-full" />
                  </span>
                </h2>
              </div>

              <div className="max-w-xs flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <CompassIcon className="w-5 h-5 transition-transform duration-700 hover:rotate-90" color="#B9A17D" />
                </div>
                <p className="text-xs sm:text-[13px] text-[#77736E] leading-relaxed font-sans font-light">
                  Embark on an Unforgettable Journey. Experience Unique Cultures, and Create Lifetime Memories. Your Adventure Starts Here!
                </p>
              </div>
            </div>
          </RevealOnScroll>

          {/* Cards Container with Curved Connector Lines */}
          <div className="relative z-10">
            <ConnectorLines />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-10 items-center">
              {featuredDestinations.map((dest, index) => (
                <RevealOnScroll
                  key={dest.id}
                  variant="fade-up"
                  delay={index * 150}
                  duration={750}
                >
                  <DestinationCard destination={dest} index={index} />
                </RevealOnScroll>
              ))}
            </div>
          </div>

          {/* Slider Pagination Indicators & Link */}
          <RevealOnScroll variant="fade-in" delay={300}>
            <div className="flex items-center justify-between pt-16 mt-8 border-t border-[#E5E1DA]/60 relative z-10">
              <Link
                href="/destinations"
                className="text-xs font-bold tracking-widest text-[#171614] uppercase hover:text-[#B9A17D] transition-colors inline-flex items-center gap-1.5 group"
              >
                <span>EXPLORE ALL DESTINATIONS</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>

              <div className="flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#171614] rounded-full transition-all" />
                <span className="w-3 h-0.5 bg-[#E5E1DA] rounded-full" />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* SECTION D: BROWSE BY PROPERTY TYPE */}
      <RevealOnScroll variant="fade-up" duration={700}>
        <PropertyTypeCarousel />
      </RevealOnScroll>

      {/* SECTION E: EDITORIAL EXPERIENCE BANNER */}
      <RevealOnScroll variant="fade-up" duration={800}>
        <ExperienceBanner />
      </RevealOnScroll>

      {/* SECTION F: STAY UP TO DATE */}
      <RevealOnScroll variant="fade-up" duration={700}>
        <StayUpToDateSection />
      </RevealOnScroll>

      {/* SECTION G: NEWSLETTER SUBSCRIPTION */}
      <RevealOnScroll variant="fade-up" duration={700}>
        <NewsletterSection />
      </RevealOnScroll>
    </div>
  );
}
