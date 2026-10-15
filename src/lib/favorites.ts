'use client';

import { useSyncExternalStore } from 'react';

const FAVORITES_STORAGE_KEY = 'trust_travel_favorites';

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('LocalStorage error reading favorites', e);
    return [];
  }
}

export function isFavorite(propertyId: string): boolean {
  const list = getFavorites();
  return list.includes(propertyId);
}

export function toggleFavorite(propertyId: string): { isFav: boolean; count: number } {
  if (typeof window === 'undefined') return { isFav: false, count: 0 };
  try {
    const list = getFavorites();
    const index = list.indexOf(propertyId);
    let updated: string[];
    let isFav = false;
    
    if (index >= 0) {
      updated = list.filter(id => id !== propertyId);
      isFav = false;
    } else {
      updated = [...list, propertyId];
      isFav = true;
    }
    
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('trust_travel_favorites_changed', { detail: updated }));
    return { isFav, count: updated.length };
  } catch (e) {
    console.warn('LocalStorage error toggling favorite', e);
    return { isFav: false, count: 0 };
  }
}

// React 18/19 external store integration
function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('trust_travel_favorites_changed', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('trust_travel_favorites_changed', callback);
    window.removeEventListener('storage', callback);
  };
}

let cachedFavorites: string[] = [];
let cachedRaw: string | null = null;

function getSnapshot(): string[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedFavorites = raw ? JSON.parse(raw) : [];
    } catch {
      cachedFavorites = [];
    }
  }
  return cachedFavorites;
}

const emptyServerSnapshot: string[] = [];
function getServerSnapshot(): string[] {
  return emptyServerSnapshot;
}

export function useFavorites(): string[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useIsFavorite(propertyId: string): boolean {
  const favs = useFavorites();
  return favs.includes(propertyId);
}
