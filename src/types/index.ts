export type PropertyType = 
  | 'hotels'
  | 'apartments'
  | 'cabins'
  | 'cottages'
  | 'villas'
  | 'resorts'
  | 'boutique'
  | 'guesthouses'
  | 'beach-houses';

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: string;
  tagline: string;
  description: string;
  heroImage: string;
  cardImage: string;
  cardShape?: 'arch-left' | 'tall-arch' | 'arch-right' | 'rounded';
  propertyCount: number;
  highlightAreas: string[];
  bestSeason: string;
  travelTips: string[];
  featuredPropertyIds: string[];
  editorialSlug?: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: 'essentials' | 'luxury' | 'wellness' | 'dining' | 'outdoor';
}

export interface PropertyReview {
  id: string;
  author: string;
  authorLocation: string;
  authorAvatar?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  type: PropertyType;
  typeName: string;
  destinationSlug: string;
  destinationName: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  pricePerNight: number;
  currency: string;
  rating: number;
  reviewCount: number;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  coverImage: string;
  gallery: string[];
  featured: boolean;
  freeCancellation: boolean;
  breakfastIncluded: boolean;
  amenityIds: string[];
  overview: string;
  rules: string[];
  cancellationPolicy: string;
  checkInTime: string;
  checkOutTime: string;
  reviews: PropertyReview[];
}

export interface PropertyCategory {
  id: PropertyType;
  name: string;
  pluralName: string;
  slug: string;
  sampleCount: number;
  description: string;
  image: string;
}

export interface EditorialArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  excerpt: string;
  publishedDate: string;
  readingTimeMinutes: number;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  coverImage: string;
  content: {
    type: 'p' | 'h2' | 'quote' | 'image' | 'callout';
    text?: string;
    citation?: string;
    imageUrl?: string;
    caption?: string;
  }[];
  relatedSlugs: string[];
}

export interface TransferOption {
  id: string;
  name: string;
  category: 'Airport Express' | 'Private Chauffeur' | 'High-Speed Rail' | 'Luxury Rental';
  description: string;
  capacityPassengers: number;
  capacityLuggage: number;
  estimatedPriceUsd: number;
  features: string[];
  image: string;
}

export interface LeisureExperience {
  id: string;
  slug: string;
  title: string;
  category: 'Adventure' | 'Cultural' | 'Gastronomic' | 'Wellness' | 'Private Tour';
  destinationSlug: string;
  destinationName: string;
  duration: string;
  groupSize: string;
  pricePerPersonUsd: number;
  rating: number;
  reviewCount: number;
  coverImage: string;
  overview: string;
  highlights: string[];
}

export interface BookingState {
  propertyId: string;
  checkInDate: string;
  checkOutDate: string;
  guests: {
    adults: number;
    children: number;
    rooms: number;
  };
  pricing: {
    pricePerNight: number;
    nights: number;
    baseTotal: number;
    serviceFee: number;
    cleaningFee: number;
    taxes: number;
    total: number;
  };
}

export interface GuestReservationDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  specialRequests?: string;
  agreedToTerms: boolean;
}

export interface BookingConfirmation {
  reference: string;
  property: Property;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guests: {
    adults: number;
    children: number;
    rooms: number;
  };
  guestDetails: GuestReservationDetails;
  pricing: {
    pricePerNight: number;
    baseTotal: number;
    serviceFee: number;
    cleaningFee: number;
    taxes: number;
    total: number;
  };
  createdAt: string;
}
