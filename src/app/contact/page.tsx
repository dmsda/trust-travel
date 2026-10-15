'use client';

import React, { useState } from 'react';
import { Send, Check, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Guest Booking Assistance');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
    setTimeout(() => {
      // keep success feedback visible
    }, 500);
  };

  return (
    <div className="w-full pb-24">
      
      {/* Header */}
      <section className="bg-white border-b border-[#E5E1DA] pt-12 pb-14">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-[10px] font-bold tracking-wider uppercase text-[#B9A17D]">
              Direct Assistance & Curation
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-normal text-[#171614] tracking-tight">
              Get in Touch with TRUST.TRAVEL
            </h1>
            <p className="text-sm text-[#77736E] font-sans font-light leading-relaxed">
              Have a question about an upcoming itinerary, property curation submission, or partnership? Our team responds within 24 business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Form & Info Grid */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Form */}
          <div className="md:col-span-7 bg-white rounded-3xl border border-[#E5E1DA] p-7 sm:p-9 shadow-xs">
            {sent ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#287A55]/10 text-[#287A55] flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-normal text-[#171614]">
                  Message Dispatched
                </h3>
                <p className="text-xs text-[#77736E] max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>. In production, this inquiry would route directly to our concierge team. In demo mode, your message is validated client-side.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setMessage('');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#171614] text-white text-xs font-semibold"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#171614] uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full p-3 bg-[#FAF9F6] border border-[#E5E1DA] rounded-xl text-sm text-[#171614] focus:outline-none focus:border-[#B9A17D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#171614] uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena@example.com"
                    className="w-full p-3 bg-[#FAF9F6] border border-[#E5E1DA] rounded-xl text-sm text-[#171614] focus:outline-none focus:border-[#B9A17D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#171614] uppercase tracking-wider mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full p-3 bg-[#FAF9F6] border border-[#E5E1DA] rounded-xl text-sm text-[#171614] focus:outline-none"
                  >
                    <option value="Guest Booking Assistance">Guest Booking Assistance</option>
                    <option value="Host Property Submission">Host Property Submission</option>
                    <option value="Editorial & Press">Editorial & Press</option>
                    <option value="General Question">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#171614] uppercase tracking-wider mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How may our travel curators assist you?"
                    className="w-full p-3 bg-[#FAF9F6] border border-[#E5E1DA] rounded-xl text-sm text-[#171614] focus:outline-none focus:border-[#B9A17D]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#171614] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#2A2926] transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Info Side */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-[#E5E1DA] p-7 space-y-4">
              <h3 className="text-lg font-serif font-bold text-[#171614]">
                Concierge Desk
              </h3>
              <p className="text-xs text-[#77736E] leading-relaxed">
                Our support curators operate across European, Asian, and American time zones to assist with itinerary planning and property inquiries.
              </p>
              <div className="pt-2 border-t border-[#E5E1DA] text-xs text-[#171614] space-y-2">
                <div>Email: <strong>concierge@trust.travel</strong></div>
                <div>Hours: Monday – Sunday, 08:00 – 22:00 CET</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F0EEEA] border border-[#E5E1DA] flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#B9A17D] flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-[#77736E] leading-relaxed">
                <strong>Host Submissions:</strong> If you are the owner of a historic, sustainable, or architectural property and wish to be featured in the TRUST.TRAVEL catalog, select &ldquo;Host Property Submission&rdquo; above.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
