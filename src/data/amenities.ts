import { Amenity } from '@/types';

export const amenitiesList: Amenity[] = [
  { id: 'wifi', name: 'High-speed Fiber WiFi', icon: 'Wifi', category: 'essentials' },
  { id: 'workspace', name: 'Dedicated Work Studio', icon: 'Laptop', category: 'essentials' },
  { id: 'air-conditioning', name: 'Climate Control AC', icon: 'Wind', category: 'essentials' },
  { id: 'breakfast', name: 'Artisan Breakfast Included', icon: 'Coffee', category: 'dining' },
  { id: 'kitchen', name: 'Chef’s Gourmet Kitchen', icon: 'Utensils', category: 'dining' },
  { id: 'espresso', name: 'Espresso Bar', icon: 'CupSoda', category: 'dining' },
  { id: 'pool', name: 'Private Heated Pool', icon: 'Waves', category: 'wellness' },
  { id: 'spa', name: 'Sauna & Steam Bath', icon: 'Sparkles', category: 'wellness' },
  { id: 'fireplace', name: 'Stone Wood Fireplace', icon: 'Flame', category: 'luxury' },
  { id: 'terrace', name: 'Panoramic Sun Terrace', icon: 'Sun', category: 'outdoor' },
  { id: 'garden', name: 'Landscaped Botanical Garden', icon: 'Flower2', category: 'outdoor' },
  { id: 'parking', name: 'Private Valet Parking', icon: 'Car', category: 'essentials' },
  { id: 'cancellation', name: 'Flexible Free Cancellation', icon: 'ShieldCheck', category: 'luxury' },
  { id: 'concierge', name: '24/7 Dedicated Concierge', icon: 'Bell', category: 'luxury' },
  { id: 'pet-friendly', name: 'Curated Pet Hospitality', icon: 'Heart', category: 'luxury' }
];
