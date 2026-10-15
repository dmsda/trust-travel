'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { editorialArticles } from '@/data/articles';
import { ArticleCard } from '@/components/editorial/ArticleCard';
import { BookOpen, ArrowUpRight } from 'lucide-react';

export default function JournalPage() {
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Hospitality Economics', 'Sustainable Living', 'Design & Heritage'];
  const featuredArticle = editorialArticles[0];

  const filtered = editorialArticles.filter(
    (a) => selectedCat === 'All' || a.category === selectedCat
  );

  return (
    <div className="w-full pb-24">
      
      {/* Editorial Header */}
      <section className="bg-white border-b border-[#E5E1DA] pt-12 pb-14">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E5E1DA] text-[11px] font-semibold tracking-wider uppercase text-[#171614]">
              <BookOpen className="w-3.5 h-3.5 text-[#B9A17D]" />
              <span>TRUST Editorial Journal</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-[#171614] tracking-tight">
              Stories on Architecture, Hospitality & Living
            </h1>

            <p className="text-sm sm:text-base text-[#77736E] font-sans font-light leading-relaxed">
              Thoughtful essays exploring the custodians behind historical restorations, sustainable passive home retrofits, and the economics of independent hospitality.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCat === c
                    ? 'bg-[#171614] text-white'
                    : 'bg-[#FAF9F6] text-[#77736E] border border-[#E5E1DA] hover:text-[#171614]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Featured Lead Story */}
      <section className="py-12">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link
            href={`/journal/${featuredArticle.slug}`}
            className="group block rounded-3xl bg-white border border-[#E5E1DA] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
              
              <div className="lg:col-span-7 relative h-72 sm:h-96 w-full overflow-hidden bg-[#F0EEEA]">
                <Image
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 space-y-4">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#B9A17D]">
                  Featured Dispatch &bull; {featuredArticle.category}
                </span>

                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#171614] group-hover:text-[#B9A17D] transition-colors leading-snug">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#77736E] font-sans leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                <div className="pt-4 border-t border-[#E5E1DA] flex items-center justify-between text-xs text-[#77736E]">
                  <span>By {featuredArticle.author.name}</span>
                  <span className="flex items-center gap-1 font-semibold text-[#171614]">
                    {featuredArticle.readingTimeMinutes} min read
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

            </div>
          </Link>

        </div>
      </section>

      {/* 3-Column Publications Grid */}
      <section className="py-6">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filtered.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
