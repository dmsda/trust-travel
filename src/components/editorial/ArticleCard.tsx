import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EditorialArticle } from '@/types';
import { ArrowUpRight } from 'lucide-react';

interface ArticleCardProps {
  article: EditorialArticle;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group flex flex-col h-full">
      <Link href={`/journal/${article.slug}`} className="block relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#F0EEEA] mb-4 shadow-xs">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-[#171614]">
          {article.category}
        </div>
      </Link>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <Link href={`/journal/${article.slug}`} className="block">
            <h3 className="text-lg md:text-xl font-serif font-medium text-[#171614] leading-snug group-hover:text-[#B9A17D] transition-colors line-clamp-2">
              {article.title}
            </h3>
          </Link>
          <p className="text-xs text-[#77736E] line-clamp-2 font-sans leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-4 flex items-center justify-between text-[11px] text-[#77736E] border-t border-[#E5E1DA]/50 mt-4">
          <span>{article.publishedDate}</span>
          <span className="flex items-center gap-1 font-medium text-[#171614] group-hover:text-[#B9A17D] transition-colors">
            {article.readingTimeMinutes} min read
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
