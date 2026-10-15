'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '../brand/Logo';

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full bg-[#FAF9F6] border-t border-[#E5E1DA] pt-16 pb-12 mt-20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Multi-column links + App Badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-14 border-b border-[#E5E1DA]">
          
          {/* Column 1: Places */}
          <div>
            <h4 className="text-sm font-serif font-bold text-[#171614] mb-4">Places</h4>
            <ul className="space-y-2.5 text-xs text-[#77736E]">
              <li><Link href="/destinations" className="hover:text-[#171614] transition-colors">Countries</Link></li>
              <li><Link href="/destinations" className="hover:text-[#171614] transition-colors">Regions</Link></li>
              <li><Link href="/stays?destination=milan" className="hover:text-[#171614] transition-colors">Cities</Link></li>
              <li><Link href="/transfers" className="hover:text-[#171614] transition-colors">Airports</Link></li>
              <li><Link href="/destinations" className="hover:text-[#171614] transition-colors">Places of interest</Link></li>
            </ul>
          </div>

          {/* Column 2: Stays */}
          <div>
            <h4 className="text-sm font-serif font-bold text-[#171614] mb-4">Stays</h4>
            <ul className="space-y-2.5 text-xs text-[#77736E]">
              <li><Link href="/stays?category=hotels" className="hover:text-[#171614] transition-colors">Hotels</Link></li>
              <li><Link href="/stays?category=apartments" className="hover:text-[#171614] transition-colors">Apartments</Link></li>
              <li><Link href="/stays?category=resorts" className="hover:text-[#171614] transition-colors">Resorts</Link></li>
              <li><Link href="/stays?category=villas" className="hover:text-[#171614] transition-colors">Villas</Link></li>
              <li><Link href="/property-types" className="hover:text-[#171614] transition-colors">Hostels & Lodges</Link></li>
              <li><Link href="/stays?category=cabins" className="hover:text-[#171614] transition-colors">Cabins</Link></li>
            </ul>
          </div>

          {/* Column 3: Transfer */}
          <div>
            <h4 className="text-sm font-serif font-bold text-[#171614] mb-4">Transfer</h4>
            <ul className="space-y-2.5 text-xs text-[#77736E]">
              <li><Link href="/transfers" className="hover:text-[#171614] transition-colors">Airport transfers</Link></li>
              <li><Link href="/transfers" className="hover:text-[#171614] transition-colors">Private transfers</Link></li>
              <li><Link href="/transfers" className="hover:text-[#171614] transition-colors">Trains</Link></li>
              <li><Link href="/transfers" className="hover:text-[#171614] transition-colors">Car rentals</Link></li>
            </ul>
          </div>

          {/* Column 4: Leisure */}
          <div>
            <h4 className="text-sm font-serif font-bold text-[#171614] mb-4">Leisure</h4>
            <ul className="space-y-2.5 text-xs text-[#77736E]">
              <li><Link href="/leisure" className="hover:text-[#171614] transition-colors">Adventures</Link></li>
              <li><Link href="/leisure" className="hover:text-[#171614] transition-colors">Cultural experiences</Link></li>
              <li><Link href="/leisure" className="hover:text-[#171614] transition-colors">Gastronomic</Link></li>
              <li><Link href="/leisure" className="hover:text-[#171614] transition-colors">Outdoor</Link></li>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div>
            <h4 className="text-sm font-serif font-bold text-[#171614] mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs text-[#77736E]">
              <li><Link href="/about" className="hover:text-[#171614] transition-colors">About</Link></li>
              <li><Link href="/journal" className="hover:text-[#171614] transition-colors">Journal</Link></li>
              <li><Link href="/about" className="hover:text-[#171614] transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-[#171614] transition-colors">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-[#171614] transition-colors">Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-[#171614] transition-colors">Privacy</Link></li>
            </ul>
          </div>

          {/* Column 6: Mobile Experience */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold text-[#171614] mb-4">Mobile App</h4>
            <div className="p-3.5 rounded-2xl bg-white border border-[#E5E1DA] space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B9A17D] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#171614]">Private Beta</span>
              </div>
              <p className="text-[11px] text-[#77736E] leading-relaxed">
                Native iOS & Android mobile editions currently in preview for verified hosts.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Brand Wordmark, Tagline, Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#77736E]">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <Logo showTagline={false} />
            <span className="hidden sm:inline text-[#E5E1DA]">|</span>
            <span>Effortless bookings for leisure travel or business.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/privacy" className="hover:text-[#171614] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#171614] transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-[#171614] transition-colors">Support & Inquiries</Link>
            <span className="text-[#171614] font-medium">Trust.Travel {currentYear}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
