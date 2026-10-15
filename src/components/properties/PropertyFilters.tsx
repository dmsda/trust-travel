'use client';

import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { propertyCategories } from '@/data/property-types';
import { SearchFilterCriteria } from '@/lib/search-utils';

interface PropertyFiltersProps {
  criteria: SearchFilterCriteria;
  onChange: (updated: SearchFilterCriteria) => void;
  onReset: () => void;
  totalResults: number;
}

export function PropertyFilters({ criteria, onChange, onReset, totalResults }: PropertyFiltersProps) {
  return (
    <div className="bg-white rounded-3xl border border-[#E5E1DA] p-6 space-y-6 shadow-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E5E1DA]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#B9A17D]" />
          <h3 className="text-sm font-bold tracking-wider uppercase text-[#171614]">
            Filter Stays
          </h3>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="text-xs text-[#77736E] hover:text-[#171614] flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Property Type Category */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#171614] uppercase tracking-wider">
          Property Type
        </label>
        <select
          value={criteria.category || 'all'}
          onChange={(e) => onChange({ ...criteria, category: e.target.value })}
          className="w-full p-2.5 bg-[#FAF9F6] border border-[#E5E1DA] rounded-xl text-xs font-medium text-[#171614] focus:outline-none focus:border-[#B9A17D]"
        >
          <option value="all">All Types</option>
          {propertyCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.pluralName}
            </option>
          ))}
        </select>
      </div>

      {/* Max Price Range */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-[#171614] uppercase tracking-wider">Max Price / Night</span>
          <span className="font-bold text-[#171614]">${criteria.maxPrice || 1000}</span>
        </div>
        <input
          type="range"
          min="150"
          max="1000"
          step="25"
          value={criteria.maxPrice || 1000}
          onChange={(e) => onChange({ ...criteria, maxPrice: Number(e.target.value) })}
          className="w-full accent-[#171614] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#77736E]">
          <span>$150</span>
          <span>$1,000+</span>
        </div>
      </div>

      {/* Bedrooms */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#171614] uppercase tracking-wider">
          Bedrooms
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {[0, 1, 2, 4].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => onChange({ ...criteria, bedrooms: num === 0 ? undefined : num })}
              className={`py-2 text-xs font-semibold rounded-xl border transition-colors ${
                (num === 0 && !criteria.bedrooms) || criteria.bedrooms === num
                  ? 'bg-[#171614] text-white border-[#171614]'
                  : 'bg-[#FAF9F6] text-[#77736E] border-[#E5E1DA] hover:border-[#171614]'
              }`}
            >
              {num === 0 ? 'Any' : `${num}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities & Perks Checkboxes */}
      <div className="space-y-3 pt-2 border-t border-[#E5E1DA]">
        <label className="block text-xs font-semibold text-[#171614] uppercase tracking-wider">
          Perks & Policies
        </label>

        <label className="flex items-center gap-2.5 text-xs text-[#171614] cursor-pointer">
          <input
            type="checkbox"
            checked={!!criteria.freeCancellationOnly}
            onChange={(e) => onChange({ ...criteria, freeCancellationOnly: e.target.checked })}
            className="w-4 h-4 rounded text-[#171614] accent-[#171614] border-[#E5E1DA]"
          />
          <span>Free Cancellation</span>
        </label>

        <label className="flex items-center gap-2.5 text-xs text-[#171614] cursor-pointer">
          <input
            type="checkbox"
            checked={!!criteria.breakfastOnly}
            onChange={(e) => onChange({ ...criteria, breakfastOnly: e.target.checked })}
            className="w-4 h-4 rounded text-[#171614] accent-[#171614] border-[#E5E1DA]"
          />
          <span>Breakfast Included</span>
        </label>
      </div>

      {/* Results badge */}
      <div className="pt-2 border-t border-[#E5E1DA] text-center text-xs text-[#77736E]">
        Showing <strong>{totalResults}</strong> available stays
      </div>

    </div>
  );
}
