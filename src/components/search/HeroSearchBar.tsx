'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Plus, Minus, X, Loader2 } from 'lucide-react';
import { getDefaultDemoDates, formatDateDisplay } from '@/lib/date-utils';

interface HeroSearchBarProps {
  initialDestination?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  initialRooms?: number;
  compact?: boolean;
}

const suggestedDestinations = [
  { name: 'Milan, Italy', sub: 'Lombardy, Italy' },
  { name: 'Scotland', sub: 'Highlands & Isle of Skye' },
  { name: 'Germany', sub: 'Bavaria & Berlin' },
  { name: 'Nepal', sub: 'Kathmandu Valley' },
  { name: 'Tuscany, Italy', sub: 'Chianti Wine Country' },
  { name: 'Bali, Indonesia', sub: 'Uluwatu & Ubud' },
  { name: 'Kyoto, Japan', sub: 'Historic Arashiyama' },
];

export function HeroSearchBar({
  initialDestination = 'Milan, Italy',
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
  initialRooms = 1,
  compact = false,
}: HeroSearchBarProps) {
  const router = useRouter();
  const defaultDates = getDefaultDemoDates();

  const [destination, setDestination] = useState(initialDestination);
  const [checkIn, setCheckIn] = useState(initialCheckIn || defaultDates.checkIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut || defaultDates.checkOut);
  const [adults, setAdults] = useState(initialGuests);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(initialRooms);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Active popovers & keyboard selection
  const [openDropdown, setOpenDropdown] = useState<'destination' | 'dates' | 'guests' | null>(null);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const totalGuests = adults + children;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (totalGuests) params.set('guests', totalGuests.toString());
    if (rooms) params.set('rooms', rooms.toString());

    setOpenDropdown(null);
    setTimeout(() => {
      router.push(`/stays?${params.toString()}`);
      setIsSubmitting(false);
    }, 250);
  };

  const handleDestinationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (openDropdown !== 'destination') return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev + 1) % suggestedDestinations.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev - 1 + suggestedDestinations.length) % suggestedDestinations.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = suggestedDestinations[activeSuggestionIndex];
      if (selected) {
        setDestination(selected.name);
        setOpenDropdown('dates');
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto z-20">
      {/* Desktop Search Bar (Pill shape) */}
      <form
        onSubmit={handleSearch}
        className={`hidden md:flex items-center bg-white rounded-full transition-shadow duration-300 ${
          compact ? 'p-1.5 pl-6 pr-2.5 shadow-sm' : 'p-2 pl-7 pr-3 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.18)]'
        } border border-[#E5E1DA] divide-x divide-[#E5E1DA]/80`}
      >
        {/* Field 1: Destination */}
        <div
          className={`relative flex-1 pr-4 rounded-full transition-colors duration-200 ${
            openDropdown === 'destination' ? 'bg-[#FAF9F6]' : ''
          }`}
        >
          <div
            className="cursor-pointer py-1 px-3"
            onClick={() => setOpenDropdown(openDropdown === 'destination' ? null : 'destination')}
          >
            <div className="text-[11px] font-medium text-[#77736E] uppercase tracking-wider mb-0.5">
              Places, hotels, leisure...
            </div>
            <input
              type="text"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setOpenDropdown('destination');
              }}
              onFocus={() => setOpenDropdown('destination')}
              onKeyDown={handleDestinationKeyDown}
              placeholder="Where to next?"
              className="w-full text-base font-semibold text-[#171614] focus:outline-none bg-transparent truncate"
            />
          </div>

          {/* Destination Suggestions Popover */}
          {openDropdown === 'destination' && (
            <div
              className="absolute top-full left-0 mt-3 w-80 bg-white border border-[#E5E1DA] rounded-2xl shadow-2xl p-3 z-50 transition-all duration-200 animate-in fade-in zoom-in-95"
              role="listbox"
              aria-label="Destination suggestions"
            >
              <div className="text-[10px] font-bold text-[#77736E] uppercase tracking-wider px-3 py-1.5 flex items-center justify-between">
                <span>Suggested Destinations</span>
                <span className="text-[9px] text-[#77736E]/70 font-normal">↑↓ to navigate</span>
              </div>
              <div className="space-y-1 mt-1">
                {suggestedDestinations.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setDestination(item.name);
                      setOpenDropdown('dates');
                    }}
                    onMouseEnter={() => setActiveSuggestionIndex(index)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all duration-150 flex items-center gap-3 group ${
                      activeSuggestionIndex === index ? 'bg-[#F0EEEA] scale-[1.01]' : 'hover:bg-[#FAF9F6]'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        activeSuggestionIndex === index
                          ? 'bg-[#171614] text-white'
                          : 'bg-[#F0EEEA] text-[#77736E] group-hover:bg-white group-hover:text-[#171614]'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#171614]">{item.name}</div>
                      <div className="text-[11px] text-[#77736E]">{item.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Field 2 & 3: Check-in / Check-out */}
        <div
          className={`relative px-6 flex items-center gap-6 rounded-full transition-colors duration-200 ${
            openDropdown === 'dates' ? 'bg-[#FAF9F6]' : ''
          }`}
        >
          <div
            className="cursor-pointer py-1"
            onClick={() => setOpenDropdown(openDropdown === 'dates' ? null : 'dates')}
          >
            <div className="text-[11px] font-medium text-[#77736E] uppercase tracking-wider mb-0.5">
              Check in
            </div>
            <div className="text-base font-semibold text-[#171614] whitespace-nowrap">
              {formatDateDisplay(checkIn) || 'Select date'}
            </div>
          </div>

          <span className="text-[#E5E1DA] font-light">—</span>

          <div
            className="cursor-pointer py-1"
            onClick={() => setOpenDropdown(openDropdown === 'dates' ? null : 'dates')}
          >
            <div className="text-[11px] font-medium text-[#77736E] uppercase tracking-wider mb-0.5">
              Check out
            </div>
            <div className="text-base font-semibold text-[#171614] whitespace-nowrap">
              {formatDateDisplay(checkOut) || 'Select date'}
            </div>
          </div>

          {/* Date Picker Popover */}
          {openDropdown === 'dates' && (
            <div className="absolute top-full left-0 mt-3 w-80 bg-white border border-[#E5E1DA] rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E1DA] mb-3">
                <span className="text-xs font-bold text-[#171614] uppercase tracking-wider">Select Dates</span>
                <button
                  type="button"
                  onClick={() => setOpenDropdown(null)}
                  className="text-[#77736E] hover:text-[#171614] p-1 rounded-full hover:bg-[#F0EEEA] transition-colors"
                  aria-label="Close date picker"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#77736E] mb-1">Check-in date</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (e.target.value > checkOut) {
                        setCheckOut(e.target.value);
                      }
                    }}
                    className="w-full p-2.5 bg-[#FAF9F6] border border-[#E5E1DA] rounded-xl text-sm font-semibold text-[#171614] focus:outline-none focus:border-[#B9A17D] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#77736E] mb-1">Check-out date</label>
                  <input
                    type="date"
                    min={checkIn}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF9F6] border border-[#E5E1DA] rounded-xl text-sm font-semibold text-[#171614] focus:outline-none focus:border-[#B9A17D] transition-colors"
                  />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(null)}
                    className="flex-1 py-2.5 bg-[#F0EEEA] text-[#171614] text-xs font-semibold rounded-xl hover:bg-[#E5E1DA] active:scale-[0.98] transition-all"
                  >
                    Done
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown('guests')}
                    className="flex-1 py-2.5 bg-[#171614] text-white text-xs font-semibold rounded-xl hover:bg-[#2A2926] active:scale-[0.98] transition-all"
                  >
                    Guests →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Field 4: Guests & Rooms */}
        <div
          className={`relative px-6 rounded-full transition-colors duration-200 ${
            openDropdown === 'guests' ? 'bg-[#FAF9F6]' : ''
          }`}
        >
          <div
            className="cursor-pointer py-1"
            onClick={() => setOpenDropdown(openDropdown === 'guests' ? null : 'guests')}
          >
            <div className="text-[11px] font-medium text-[#77736E] uppercase tracking-wider mb-0.5">
              Guests
            </div>
            <div className="text-base font-semibold text-[#171614] whitespace-nowrap">
              {totalGuests} {totalGuests === 1 ? 'guest' : 'guests'}
            </div>
          </div>

          {/* Guests Popover */}
          {openDropdown === 'guests' && (
            <div className="absolute top-full right-0 mt-3 w-80 bg-white border border-[#E5E1DA] rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200 space-y-4">
              {/* Adults */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-[#171614]">Adults</div>
                  <div className="text-[11px] text-[#77736E]">Ages 13 or above</div>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    disabled={adults <= 1}
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-8 h-8 rounded-full border border-[#E5E1DA] flex items-center justify-center text-[#171614] disabled:opacity-30 hover:bg-[#F0EEEA] active:scale-90 transition-transform"
                    aria-label="Decrease adult count"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-5 text-center text-sm font-bold transition-all">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults(adults + 1)}
                    className="w-8 h-8 rounded-full border border-[#E5E1DA] flex items-center justify-center text-[#171614] hover:bg-[#F0EEEA] active:scale-90 transition-transform"
                    aria-label="Increase adult count"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between pt-3 border-t border-[#E5E1DA]/60">
                <div>
                  <div className="text-sm font-semibold text-[#171614]">Children</div>
                  <div className="text-[11px] text-[#77736E]">Ages 0–12</div>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    disabled={children <= 0}
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-8 h-8 rounded-full border border-[#E5E1DA] flex items-center justify-center text-[#171614] disabled:opacity-30 hover:bg-[#F0EEEA] active:scale-90 transition-transform"
                    aria-label="Decrease children count"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-5 text-center text-sm font-bold transition-all">{children}</span>
                  <button
                    type="button"
                    onClick={() => setChildren(children + 1)}
                    className="w-8 h-8 rounded-full border border-[#E5E1DA] flex items-center justify-center text-[#171614] hover:bg-[#F0EEEA] active:scale-90 transition-transform"
                    aria-label="Increase children count"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Rooms */}
              <div className="flex items-center justify-between pt-3 border-t border-[#E5E1DA]/60">
                <div>
                  <div className="text-sm font-semibold text-[#171614]">Rooms</div>
                  <div className="text-[11px] text-[#77736E]">Separate accommodations</div>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    disabled={rooms <= 1}
                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                    className="w-8 h-8 rounded-full border border-[#E5E1DA] flex items-center justify-center text-[#171614] disabled:opacity-30 hover:bg-[#F0EEEA] active:scale-90 transition-transform"
                    aria-label="Decrease room count"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-5 text-center text-sm font-bold transition-all">{rooms}</span>
                  <button
                    type="button"
                    onClick={() => setRooms(rooms + 1)}
                    className="w-8 h-8 rounded-full border border-[#E5E1DA] flex items-center justify-center text-[#171614] hover:bg-[#F0EEEA] active:scale-90 transition-transform"
                    aria-label="Increase room count"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpenDropdown(null)}
                className="w-full py-2.5 bg-[#171614] text-white text-xs font-semibold rounded-xl hover:bg-[#2A2926] active:scale-[0.98] transition-all"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Search Round Icon Button */}
        <div className="pl-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-12 h-12 rounded-full bg-[#171614] text-white flex items-center justify-center hover:bg-[#2A2926] hover:scale-105 active:scale-95 transition-all shadow-md group disabled:opacity-80"
            aria-label="Search accommodations"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin text-[#B9A17D]" />
            ) : (
              <Search className="w-5 h-5 transition-transform group-hover:scale-110" />
            )}
          </button>
        </div>
      </form>

      {/* Mobile Form Layout */}
      <form
        onSubmit={handleSearch}
        className="md:hidden bg-white rounded-3xl p-5 shadow-xl border border-[#E5E1DA] space-y-4"
      >
        <div>
          <label className="block text-[11px] font-semibold text-[#77736E] uppercase tracking-wider mb-1">
            Destination or Hotel
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77736E]" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Milan, Scotland, Bali..."
              className="w-full pl-9 pr-3 py-2.5 bg-[#FAF9F6] border border-[#E5E1DA] rounded-xl text-sm font-semibold text-[#171614] focus:outline-none focus:border-[#B9A17D] transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-[#77736E] uppercase tracking-wider mb-1">
              Check in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E5E1DA] rounded-xl text-xs font-semibold text-[#171614] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#77736E] uppercase tracking-wider mb-1">
              Check out
            </label>
            <input
              type="date"
              min={checkIn}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E5E1DA] rounded-xl text-xs font-semibold text-[#171614] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between py-2 border-t border-[#E5E1DA]/60">
          <div>
            <div className="text-xs font-semibold text-[#171614]">Travelers</div>
            <div className="text-[11px] text-[#77736E]">{totalGuests} guests, {rooms} room</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={adults <= 1}
              onClick={() => setAdults(Math.max(1, adults - 1))}
              className="w-7 h-7 rounded-full border border-[#E5E1DA] flex items-center justify-center text-xs disabled:opacity-30 active:scale-90 transition-transform"
            >
              -
            </button>
            <span className="text-xs font-bold w-4 text-center">{adults}</span>
            <button
              type="button"
              onClick={() => setAdults(adults + 1)}
              className="w-7 h-7 rounded-full border border-[#E5E1DA] flex items-center justify-center text-xs active:scale-90 transition-transform"
            >
              +
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-full bg-[#171614] text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#2A2926] active:scale-[0.98] transition-all"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#B9A17D]" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          <span>{isSubmitting ? 'Searching...' : 'Search Available Stays'}</span>
        </button>
      </form>
    </div>
  );
}
