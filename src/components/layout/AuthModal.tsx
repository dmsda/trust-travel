'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { Logo } from '../brand/Logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [demoLoggedIn, setDemoLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDemoLoggedIn(true);
    setTimeout(() => {
      setDemoLoggedIn(false);
      onClose();
    }, 1800);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div 
        className="relative w-full max-w-md bg-[#FAF9F6] border border-[#E5E1DA] rounded-3xl p-7 md:p-9 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-[#E5E1DA] flex items-center justify-center text-[#77736E] hover:text-[#171614] hover:bg-[#F0EEEA] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <Logo className="justify-center mb-4" />
          <h2 id="auth-modal-title" className="text-2xl font-serif text-[#171614] mb-1.5">
            {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-xs text-[#77736E] leading-relaxed max-w-xs mx-auto">
            {mode === 'login' 
              ? 'Access saved stays, itineraries, and past reservations across all your devices.' 
              : 'Join TRUST.TRAVEL to unlock curated recommendations and private bookings.'}
          </p>
        </div>

        {/* Demo status alert badge */}
        <div className="mb-5 p-3 rounded-xl bg-[#F0EEEA] border border-[#E5E1DA] flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#B9A17D] flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#77736E] leading-tight">
            <strong>Prototype Demo Mode:</strong> Enter any demonstration email. No live password or credentials are required or stored.
          </p>
        </div>

        {demoLoggedIn ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#287A55]/10 text-[#287A55] flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-[#171614]">
              Authenticated as Guest Traveler
            </p>
            <p className="text-xs text-[#77736E]">Welcome to your TRUST.TRAVEL session.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="auth-email" className="block text-xs font-semibold text-[#171614] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77736E]" />
                <input
                  id="auth-email"
                  type="email"
                  required
                  placeholder="traveler@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E1DA] rounded-xl text-sm text-[#171614] placeholder-[#77736E]/60 focus:outline-none focus:border-[#B9A17D] transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="auth-pass" className="block text-xs font-semibold text-[#171614] uppercase tracking-wider">
                  Passkey or Password
                </label>
                {mode === 'login' && (
                  <span className="text-[11px] text-[#B9A17D] hover:underline cursor-pointer">
                    Forgot?
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77736E]" />
                <input
                  id="auth-pass"
                  type="password"
                  defaultValue="demo-secure-pass"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E1DA] rounded-xl text-sm text-[#171614] focus:outline-none focus:border-[#B9A17D] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 bg-[#171614] text-white rounded-full text-sm font-medium hover:bg-[#2A2926] transition-colors flex items-center justify-center gap-2 group"
            >
              <span>{mode === 'login' ? 'Sign In to Demo' : 'Create Demo Account'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        )}

        {/* Toggle mode */}
        <div className="mt-6 pt-5 border-t border-[#E5E1DA] text-center text-xs text-[#77736E]">
          {mode === 'login' ? (
            <>
              Don&apos;t have an account yet?{' '}
              <button 
                type="button" 
                onClick={() => setMode('signup')}
                className="text-[#171614] font-semibold underline underline-offset-4 hover:text-[#B9A17D]"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already registered?{' '}
              <button 
                type="button" 
                onClick={() => setMode('login')}
                className="text-[#171614] font-semibold underline underline-offset-4 hover:text-[#B9A17D]"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
