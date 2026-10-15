import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | TRUST.TRAVEL',
  description: 'Terms and conditions governing the use of the TRUST.TRAVEL website and template.'
};

export default function TermsPage() {
  return (
    <div className="w-full pb-24 pt-12">
      <div className="max-w-[780px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div>
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#B9A17D]">
            Legal Agreements
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#171614] tracking-tight mt-1">
            Terms of Service
          </h1>
          <p className="text-xs text-[#77736E] mt-2">
            Effective Date: October 2026 &bull; TRUST.TRAVEL Platform
          </p>
        </div>

        <div className="space-y-6 text-sm text-[#171614]/85 font-sans leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#171614]">1. Acceptance of Terms</h2>
            <p>
              By accessing and exploring TRUST.TRAVEL, you acknowledge and agree to these Terms of Service. If you are customizing this codebase as an open-source template or developer baseline, your usage is also subject to the MIT repository license.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#171614]">2. Simulation & Demonstration Disclaimer</h2>
            <p>
              All property inventories, room availability markers, guest counts, and monetary prices presented on TRUST.TRAVEL are realistic demonstration figures created for prototype fidelity. They do not constitute binding commercial offers or live reservations with actual property owners.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#171614]">3. Intellectual Property & Brand Assets</h2>
            <p>
              The original TRUST.TRAVEL brand identity, vector logos, layout compositions, and editorial prose are created specifically for this project. Media photography from Unsplash is governed by the Unsplash Commercial License as documented in our <Link href="/about" className="underline font-medium hover:text-[#B9A17D]">Asset Manifest</Link>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#171614]">4. Limitation of Liability</h2>
            <p>
              TRUST.TRAVEL is provided &ldquo;as is&rdquo; without warranties of any kind. Developers integrating third-party APIs (Stripe, PMS providers, GDS systems) are responsible for verifying their own security, PCI compliance, and data governance.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
