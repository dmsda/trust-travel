import React from 'react';
import Link from 'next/link';
import { CompassIcon } from '@/components/brand/Logo';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        
        <div className="w-16 h-16 rounded-full bg-[#FAF9F6] border border-[#E5E1DA] flex items-center justify-center mx-auto shadow-xs">
          <CompassIcon className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#B9A17D]">
            404 &bull; Page Not Located
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-normal text-[#171614] tracking-tight">
            Lost in the Journey
          </h1>
          <p className="text-xs sm:text-sm text-[#77736E] font-sans leading-relaxed">
            The destination or editorial page you were seeking may have moved or is no longer listed in our directory.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#171614] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#2A2926] transition-colors"
          >
            Return to Homepage
          </Link>
          <Link
            href="/stays"
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#E5E1DA] bg-white text-xs font-semibold text-[#171614] hover:bg-[#F0EEEA] transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Explore Stays</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
