import React from 'react';
import Link from 'next/link';
import { editorialArticles } from '@/data/articles';
import { ArticleCard } from './ArticleCard';
import { ArrowRight } from 'lucide-react';

export function StayUpToDateSection() {
  const articles = editorialArticles.slice(0, 3);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#171614] tracking-tight">
            Stay up to date
          </h2>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Bottom Link: SHOW ALL */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E5E1DA]/60">
          <Link
            href="/journal"
            className="text-xs font-bold tracking-widest text-[#171614] uppercase hover:text-[#B9A17D] transition-colors inline-flex items-center gap-1.5"
          >
            <span>SHOW ALL</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Minimalist slider line indicators */}
          <div className="flex items-center gap-2">
            <span className="w-6 h-0.5 bg-[#171614] rounded-full" />
            <span className="w-3 h-0.5 bg-[#E5E1DA] rounded-full" />
          </div>
        </div>

      </div>
    </section>
  );
}
