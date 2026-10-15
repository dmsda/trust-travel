import { TransferOption } from '@/types';

export const transferOptions: TransferOption[] = [
  {
    id: 'tr-airport-exec',
    name: 'Executive Mercedes E/S Class Chauffeur',
    category: 'Private Chauffeur',
    description: 'Bespoke curbside meet-and-greet with flight tracking, chilled mineral water, and Wi-Fi.',
    capacityPassengers: 3,
    capacityLuggage: 3,
    estimatedPriceUsd: 110,
    features: ['Flight tracking included', '60-min complimentary wait time', 'Professional licensed chauffeur', 'Complimentary bottled water & Wi-Fi'],
    image: '/assets/images/properties/hotel-01.jpg'
  },
  {
    id: 'tr-van-luxury',
    name: 'Luxury Mercedes V-Class Van',
    category: 'Private Chauffeur',
    description: 'Spacious leather conference seating for families or executive groups with abundant luggage space.',
    capacityPassengers: 7,
    capacityLuggage: 7,
    estimatedPriceUsd: 165,
    features: ['Up to 7 passengers', 'Spacious executive cabin', 'Child seats on request', 'Dedicated luggage assistance'],
    image: '/assets/images/properties/villa-01.jpg'
  },
  {
    id: 'tr-highspeed-rail',
    name: 'First-Class Scenic High-Speed Rail Transfer',
    category: 'High-Speed Rail',
    description: 'Seamless station connections with reserved quiet car seats, power outlets, and panoramic mountain or coastal views.',
    capacityPassengers: 4,
    capacityLuggage: 4,
    estimatedPriceUsd: 65,
    features: ['Instant digital QR ticketing', 'Priority boarding', 'Bespoke lounge access at major stations', 'Eco-conscious low-carbon transit'],
    image: '/assets/images/destinations/germany.jpg'
  },
  {
    id: 'tr-electric-suv',
    name: 'Porsche Taycan / Audi e-tron Clean Rental',
    category: 'Luxury Rental',
    description: 'Zero-emission performance for scenic highland drives and winding coastal routes.',
    capacityPassengers: 4,
    capacityLuggage: 3,
    estimatedPriceUsd: 195,
    features: ['Unlimited fast charging network access', 'Comprehensive premium insurance', 'Contactless app unlock', 'Curated scenic road trip navigation GPS'],
    image: '/assets/images/hero/hero-travel.jpg'
  }
];
