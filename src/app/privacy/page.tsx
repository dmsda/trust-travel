import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | TRUST.TRAVEL',
  description: 'Learn how TRUST.TRAVEL handles guest privacy, local data storage, and analytics.'
};

export default function PrivacyPage() {
  return (
    <div className="w-full pb-24 pt-12">
      <div className="max-w-[780px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div>
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#B9A17D]">
            Legal Disclosures
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#171614] tracking-tight mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#77736E] mt-2">
            Last updated: October 2026 &bull; TRUST.TRAVEL Editorial Platform
          </p>
        </div>

        <div className="space-y-6 text-sm text-[#171614]/85 font-sans leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#171614]">1. Prototype & Demonstration Scope</h2>
            <p>
              This website is an interactive travel product prototype designed for demonstration, portfolio, and open-source template purposes. It demonstrates client-side state handling, responsive design systems, and booking architecture. No genuine financial transactions or credit card captures are executed.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#171614]">2. Local Client Storage</h2>
            <p>
              To provide a realistic user experience without requiring external databases, certain user preferences—such as favorited properties and simulated booking references—are stored locally in your browser&apos;s <code>localStorage</code>. This data never leaves your device and can be cleared at any time via your browser settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#171614]">3. Form Inputs & Newsletter</h2>
            <p>
              Email addresses and guest details submitted through the newsletter or demo reservation flows are processed purely in client memory for UI simulation. We do not sell, rent, or distribute any information entered into demonstration inputs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#171614]">4. Cookies & Analytics</h2>
            <p>
              TRUST.TRAVEL uses no invasive third-party tracking cookies or ad networks. When deployed to production, standard anonymized performance analytics may be enabled to optimize page load speeds.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#171614]">5. Contact Information</h2>
            <p>
              For questions regarding this template or code architecture, please submit an inquiry via our <Link href="/contact" className="underline font-medium hover:text-[#B9A17D]">Contact Page</Link>.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
