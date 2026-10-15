'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Send } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 900);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-[32px] bg-[#F0EEEA]/70 border border-[#E5E1DA] p-8 sm:p-12 md:p-16 text-center shadow-xs">
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#171614] mb-3">
            Stay tuned
          </h2>
          <p className="text-xs sm:text-sm text-[#77736E] max-w-md mx-auto mb-10">
            Get thoughtful travel inspiration, distinctive stays, and new destination stories in your inbox.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto pt-4 border-t border-[#E5E1DA]/80">
            
            {/* Left: Via Email */}
            <div className="text-left md:border-r md:border-[#E5E1DA]/80 md:pr-8">
              <label htmlFor="newsletter-email" className="block text-xs font-semibold text-[#171614] mb-2">
                Via email
              </label>

              {status === 'success' ? (
                <div className="p-3 bg-white border border-[#287A55]/30 rounded-full flex items-center gap-2 text-xs text-[#287A55] font-medium">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span>Subscribed! Check your inbox for our latest dispatch.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative">
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your email address"
                    className="w-full bg-white border border-[#E5E1DA] rounded-full pl-5 pr-12 py-3 text-xs text-[#171614] placeholder-[#77736E] focus:outline-none focus:border-[#171614] shadow-xs"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#171614] text-white flex items-center justify-center hover:bg-[#2A2926] disabled:opacity-50 transition-colors shadow-xs"
                    aria-label="Submit newsletter email"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {status === 'error' && (
                <p className="text-[11px] text-[#B42318] mt-1.5 pl-3">
                  Please enter a valid email address.
                </p>
              )}

              <p className="text-[10px] text-[#77736E] mt-2 pl-3">
                By subscribing, you agree to our <Link href="/privacy" className="underline hover:text-[#171614]">Privacy Policy</Link>. Demonstration mode.
              </p>
            </div>

            {/* Right: Social Media */}
            <div className="text-center md:text-left md:pl-4">
              <span className="block text-xs font-semibold text-[#171614] mb-3">
                Follow us on social media
              </span>
              <div className="flex items-center justify-center md:justify-start gap-3">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-[#E5E1DA] flex items-center justify-center text-[#171614] hover:bg-[#171614] hover:text-white hover:border-[#171614] transition-all shadow-xs"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-[#E5E1DA] flex items-center justify-center text-[#171614] hover:bg-[#171614] hover:text-white hover:border-[#171614] transition-all shadow-xs"
                  aria-label="Twitter / X"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-[#E5E1DA] flex items-center justify-center text-[#171614] hover:bg-[#171614] hover:text-white hover:border-[#171614] transition-all shadow-xs"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42A2.5 2.5 0 0 0 2.42 7.19C2 8.75 2 12 2 12s0 3.25.42 4.81a2.5 2.5 0 0 0 1.76 1.77C5.74 19 12 19 12 19s6.26 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM9.75 15.02V8.98L15 12l-5.25 3.02z"/>
                  </svg>
                </a>

                {/* Telegram */}
                <a
                  href="https://telegram.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-[#E5E1DA] flex items-center justify-center text-[#171614] hover:bg-[#171614] hover:text-white hover:border-[#171614] transition-all shadow-xs"
                  aria-label="Telegram"
                >
                  <Send className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
