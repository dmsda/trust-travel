import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { editorialArticles } from '@/data/articles';
import { ArticleCard } from '@/components/editorial/ArticleCard';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ReadingProgressBar } from '@/components/journal/ReadingProgressBar';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';

export function generateStaticParams() {
  return editorialArticles.map((a) => ({ slug: a.slug }));
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = editorialArticles.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const related = editorialArticles.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <article className="w-full pb-24">
      {/* Reading Progress Indicator */}
      <ReadingProgressBar />

      {/* Header Container */}
      <header className="pt-8 pb-12 bg-white border-b border-[#E5E1DA]">
        <div className="max-w-[840px] mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/journal"
            className="text-xs font-semibold text-[#77736E] hover:text-[#171614] inline-flex items-center gap-1.5 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Journal Archive</span>
          </Link>

          <div className="space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E5E1DA] text-[10px] font-bold tracking-wider uppercase text-[#B9A17D]">
              {article.category}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#171614] leading-[1.15] tracking-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-[#77736E] font-sans font-light leading-relaxed">
              {article.subtitle}
            </p>

            {/* Author & Read Time Meta */}
            <div className="pt-4 border-t border-[#E5E1DA] flex items-center justify-between text-xs text-[#77736E]">
              <div>
                <span className="font-semibold text-[#171614]">{article.author.name}</span>
                <span className="block text-[11px] text-[#77736E]">{article.author.role}</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#B9A17D]" />
                  {article.publishedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#B9A17D]" />
                  {article.readingTimeMinutes} min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Cover Image */}
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <RevealOnScroll variant="fade-up" duration={800}>
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-xl bg-[#F0EEEA]">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority
              className="object-cover transition-transform duration-1000 ease-out hover:scale-104"
            />
          </div>
        </RevealOnScroll>
      </div>

      {/* Article Body */}
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-base text-[#171614] font-sans font-light leading-relaxed">
        {article.content.map((block, i) => {
          if (block.type === 'h2') {
            return (
              <RevealOnScroll key={i} variant="fade-up" duration={600}>
                <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#171614] pt-6 pb-2">
                  {block.text}
                </h2>
              </RevealOnScroll>
            );
          }
          if (block.type === 'quote') {
            return (
              <RevealOnScroll key={i} variant="fade-up" duration={700}>
                <blockquote className="my-8 p-6 sm:p-8 rounded-2xl bg-[#FAF9F6] border-l-4 border-[#B9A17D] space-y-2 shadow-xs transition-shadow hover:shadow-md">
                  <p className="font-serif italic text-lg sm:text-xl text-[#171614] leading-snug">
                    &ldquo;{block.text}&rdquo;
                  </p>
                  {block.citation && (
                    <cite className="block text-xs font-sans not-italic font-bold tracking-wider uppercase text-[#77736E]">
                      — {block.citation}
                    </cite>
                  )}
                </blockquote>
              </RevealOnScroll>
            );
          }
          return (
            <p key={i} className="text-sm sm:text-base text-[#171614]/85 leading-relaxed font-light">
              {block.text}
            </p>
          );
        })}
      </div>

      {/* Related Stories */}
      {related.length > 0 && (
        <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 mt-16 border-t border-[#E5E1DA]">
          <RevealOnScroll variant="fade-up">
            <h3 className="text-2xl font-serif font-normal text-[#171614] mb-8">
              Related Dispatches
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {related.map((art) => (
                <ArticleCard key={art.id} article={art} />
              ))}
            </div>
          </RevealOnScroll>
        </section>
      )}
    </article>
  );
}
