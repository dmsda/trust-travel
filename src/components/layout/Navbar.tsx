'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../brand/Logo';
import { AuthModal } from './AuthModal';
import { Heart, Menu, X, ChevronDown } from 'lucide-react';
import { useFavorites } from '@/lib/favorites';
import { SupportedCurrency, CURRENCY_RATES } from '@/lib/currency';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const favs = useFavorites();
  const favCount = favs.length;

  // Currency & Language dropdown states
  const [currency, setCurrency] = useState<SupportedCurrency>('USD');
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [language, setLanguage] = useState<'English' | 'Français' | 'Deutsch' | 'Italiano'>('English');
  const [languageOpen, setLanguageOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape key closes open dropdowns
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCurrencyOpen(false);
        setLanguageOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: 'Stays', href: '/stays' },
    { name: 'Transfer', href: '/transfers' },
    { name: 'Leisure', href: '/leisure' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Journal', href: '/journal' }
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAF9F6]/92 backdrop-blur-md border-b border-[#E5E1DA] py-3.5 shadow-xs'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Center: Desktop Navigation Links with animated active indicator */}
          <nav className="hidden md:flex items-center space-x-9">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-[13.5px] tracking-wide transition-colors py-1 group ${
                    isActive ? 'text-[#171614] font-semibold' : 'text-[#77736E] hover:text-[#171614]'
                  }`}
                >
                  <span>{link.name}</span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#171614] transition-all duration-300 origin-left ${
                      isActive
                        ? 'scale-x-100 opacity-100'
                        : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-40'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right: Selectors, Favorites & Auth */}
          <div className="hidden lg:flex items-center space-x-5 text-xs text-[#171614]">
            {/* Currency Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setCurrencyOpen(!currencyOpen);
                  setLanguageOpen(false);
                }}
                className="flex items-center gap-1 font-medium hover:text-[#B9A17D] transition-colors py-1 cursor-pointer"
                aria-expanded={currencyOpen}
                aria-haspopup="true"
              >
                <span>{currency}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#77736E] transition-transform duration-200 ${currencyOpen ? 'rotate-180' : ''}`} />
              </button>
              {currencyOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white border border-[#E5E1DA] rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {(Object.keys(CURRENCY_RATES) as SupportedCurrency[]).map((cur) => (
                    <button
                      key={cur}
                      type="button"
                      onClick={() => {
                        setCurrency(cur);
                        setCurrencyOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#F0EEEA] transition-colors flex items-center justify-between ${
                        currency === cur ? 'font-bold text-[#171614]' : 'text-[#77736E]'
                      }`}
                    >
                      <span>{cur}</span>
                      <span className="text-[10px] text-[#77736E]">{CURRENCY_RATES[cur].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-[#E5E1DA]">|</span>

            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLanguageOpen(!languageOpen);
                  setCurrencyOpen(false);
                }}
                className="flex items-center gap-1 font-medium hover:text-[#B9A17D] transition-colors py-1 cursor-pointer"
                aria-expanded={languageOpen}
                aria-haspopup="true"
              >
                <span>{language}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#77736E] transition-transform duration-200 ${languageOpen ? 'rotate-180' : ''}`} />
              </button>
              {languageOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-[#E5E1DA] rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {(['English', 'Français', 'Deutsch', 'Italiano'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        setLanguage(lang);
                        setLanguageOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#F0EEEA] transition-colors ${
                        language === lang ? 'font-bold text-[#171614]' : 'text-[#77736E]'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Favorites Icon with Badge */}
            <Link
              href="/favorites"
              className="relative p-2 text-[#171614] hover:text-[#B9A17D] transition-colors group"
              aria-label={`Saved favorites (${favCount} items)`}
            >
              <Heart className={`w-4 h-4 transition-transform group-hover:scale-110 ${favCount > 0 ? 'fill-[#B9A17D] text-[#B9A17D]' : ''}`} />
              {favCount > 0 && (
                <span className="absolute top-1 right-0.5 w-4 h-4 rounded-full bg-[#171614] text-white text-[9px] flex items-center justify-center font-bold animate-in zoom-in-75 duration-200">
                  {favCount}
                </span>
              )}
            </Link>

            {/* Log In Button */}
            <button
              type="button"
              onClick={() => setAuthModalOpen(true)}
              className="px-5 py-2 rounded-full bg-[#171614] text-white text-[11px] font-semibold tracking-wider uppercase hover:bg-[#2A2926] transition-all hover:scale-[1.03] active:scale-[0.97] shadow-xs cursor-pointer"
            >
              LOG IN
            </button>
          </div>

          {/* Mobile Right Controls: Fav + Hamburger */}
          <div className="flex items-center space-x-3 lg:hidden">
            <Link
              href="/favorites"
              className="relative p-1.5 text-[#171614]"
              aria-label="Favorites"
            >
              <Heart className={`w-5 h-5 ${favCount > 0 ? 'fill-[#B9A17D] text-[#B9A17D]' : ''}`} />
              {favCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#171614] text-white text-[9px] flex items-center justify-center font-bold animate-in zoom-in-75 duration-200">
                  {favCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-[#171614] hover:bg-[#F0EEEA] transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation with smooth entrance */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 top-[65px] z-30 bg-[#FAF9F6] border-t border-[#E5E1DA] lg:hidden flex flex-col p-6 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
          role="dialog"
          aria-label="Mobile Navigation"
        >
          <div className="space-y-4 mb-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xl font-serif text-[#171614] py-2 border-b border-[#E5E1DA]/60 hover:text-[#B9A17D] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/property-types"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xl font-serif text-[#171614] py-2 border-b border-[#E5E1DA]/60 hover:text-[#B9A17D] transition-colors"
            >
              Property Types
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xl font-serif text-[#171614] py-2 border-b border-[#E5E1DA]/60 hover:text-[#B9A17D] transition-colors"
            >
              About TRUST.TRAVEL
            </Link>
          </div>

          <div className="mt-auto space-y-4 pt-6 border-t border-[#E5E1DA]">
            <div className="flex items-center justify-between text-sm text-[#77736E]">
              <span>Currency: <strong>{currency}</strong></span>
              <span>Language: <strong>{language}</strong></span>
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setAuthModalOpen(true);
              }}
              className="w-full py-3.5 rounded-full bg-[#171614] text-white text-xs font-semibold tracking-wider uppercase active:scale-95 transition-transform"
            >
              LOG IN / SIGN UP
            </button>
          </div>
        </div>
      )}

      {/* Authentication Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
