import { Property } from '@/types';

export interface SearchFilterCriteria {
  destination?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
  bedrooms?: number;
  amenities?: string[];
  minRating?: number;
  freeCancellationOnly?: boolean;
  breakfastOnly?: boolean;
  sortBy?: 'recommended' | 'price-asc' | 'price-desc' | 'rating-desc';
}

export function filterAndSortProperties(
  allProperties: Property[],
  criteria: SearchFilterCriteria
): Property[] {
  let results = [...allProperties];

  // Destination filter (matches destinationSlug, name, city, country, or location text)
  if (criteria.destination && criteria.destination.trim() !== '') {
    const q = criteria.destination.toLowerCase().trim();
    results = results.filter(p => 
      p.destinationSlug.toLowerCase().includes(q) ||
      p.destinationName.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q)
    );
  }

  // Category / Property type filter
  if (criteria.category && criteria.category !== 'all') {
    const cat = criteria.category.toLowerCase();
    results = results.filter(p => p.type.toLowerCase() === cat);
  }

  // Price range
  if (criteria.minPrice !== undefined && criteria.minPrice > 0) {
    results = results.filter(p => p.pricePerNight >= (criteria.minPrice ?? 0));
  }
  if (criteria.maxPrice !== undefined && criteria.maxPrice > 0) {
    results = results.filter(p => p.pricePerNight <= (criteria.maxPrice ?? 10000));
  }

  // Guests capacity
  if (criteria.guests && criteria.guests > 1) {
    results = results.filter(p => p.maxGuests >= (criteria.guests ?? 1));
  }

  // Bedrooms
  if (criteria.bedrooms && criteria.bedrooms > 0) {
    results = results.filter(p => p.bedrooms >= (criteria.bedrooms ?? 1));
  }

  // Rating
  if (criteria.minRating && criteria.minRating > 0) {
    results = results.filter(p => p.rating >= (criteria.minRating ?? 0));
  }

  // Amenities
  if (criteria.amenities && criteria.amenities.length > 0) {
    results = results.filter(p => 
      criteria.amenities!.every(aId => p.amenityIds.includes(aId))
    );
  }

  // Free cancellation
  if (criteria.freeCancellationOnly) {
    results = results.filter(p => p.freeCancellation);
  }

  // Breakfast
  if (criteria.breakfastOnly) {
    results = results.filter(p => p.breakfastIncluded);
  }

  // Sorting
  switch (criteria.sortBy) {
    case 'price-asc':
      results.sort((a, b) => a.pricePerNight - b.pricePerNight);
      break;
    case 'price-desc':
      results.sort((a, b) => b.pricePerNight - a.pricePerNight);
      break;
    case 'rating-desc':
      results.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      break;
    case 'recommended':
    default:
      // Featured first, then highest rating
      results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
      break;
  }

  return results;
}
