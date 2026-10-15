export interface AssetEntry {
  id: string;
  name: string;
  usage: string;
  localPath: string;
  altText: string;
  source: string;
  license: string;
  dimensions?: {
    width: number;
    height: number;
  };
}

export const assetManifest: Record<string, AssetEntry> = {
  // Brand
  'brand-logo': {
    id: 'brand-logo',
    name: 'TRUST.TRAVEL Primary Logo',
    usage: 'Header & navigation brand mark',
    localPath: '/assets/brand/logo.svg',
    altText: 'TRUST.TRAVEL wordmark with gold compass star',
    source: 'Original brand design for TRUST.TRAVEL',
    license: 'Custom Project Asset'
  },
  'brand-logo-dark': {
    id: 'brand-logo-dark',
    name: 'TRUST.TRAVEL Dark Logo',
    usage: 'Dark section promotional banner & footer',
    localPath: '/assets/brand/logo-dark.svg',
    altText: 'TRUST.TRAVEL dark wordmark with compass star',
    source: 'Original brand design for TRUST.TRAVEL',
    license: 'Custom Project Asset'
  },
  'brand-icon': {
    id: 'brand-icon',
    name: 'TRUST.TRAVEL Brand Icon',
    usage: 'Compass star badge and accents',
    localPath: '/assets/brand/logo-icon.svg',
    altText: 'TRUST.TRAVEL 8-point compass star emblem',
    source: 'Original brand design for TRUST.TRAVEL',
    license: 'Custom Project Asset'
  },
  'og-cover': {
    id: 'og-cover',
    name: 'OpenGraph Share Preview',
    usage: 'Social sharing and search preview meta image',
    localPath: '/assets/brand/og-cover.svg',
    altText: 'TRUST.TRAVEL editorial social card with tagline',
    source: 'Original brand design for TRUST.TRAVEL',
    license: 'Custom Project Asset'
  },

  // Hero
  'hero-main': {
    id: 'hero-main',
    name: 'Serene Highland Road',
    usage: 'Homepage Hero Banner',
    localPath: '/assets/images/hero/hero-travel.jpg',
    altText: 'Winding scenic country road through golden hills at sunrise',
    source: 'Unsplash (Free Commercial License)',
    license: 'Unsplash License'
  },

  // Destinations
  'dest-scotland': {
    id: 'dest-scotland',
    name: 'Eilean Donan Castle, Scotland',
    usage: 'Scotland Destination Card',
    localPath: '/assets/images/destinations/scotland.jpg',
    altText: 'Historic stone castle overlooking a misty loch in the Scottish Highlands',
    source: 'Unsplash (Free Commercial License)',
    license: 'Unsplash License'
  },
  'dest-germany': {
    id: 'dest-germany',
    name: 'Rothenburg Medieval Street, Germany',
    usage: 'Germany Destination Card',
    localPath: '/assets/images/destinations/germany.jpg',
    altText: 'Romantic medieval European cobblestone alleyway flanked by ancient stone walls',
    source: 'Unsplash (Free Commercial License)',
    license: 'Unsplash License'
  },
  'dest-nepal': {
    id: 'dest-nepal',
    name: 'Kathmandu Valley Pagoda, Nepal',
    usage: 'Nepal Destination Card',
    localPath: '/assets/images/destinations/nepal.jpg',
    altText: 'Ancient tiered pagoda temple in the Kathmandu Valley, Nepal',
    source: 'Unsplash (Free Commercial License)',
    license: 'Unsplash License'
  },
  'dest-italy': {
    id: 'dest-italy',
    name: 'Amalfi Coast Terraces, Italy',
    usage: 'Italy Destination Card',
    localPath: '/assets/images/destinations/italy.jpg',
    altText: 'Cinque Terre colorful coastal village perched along the Italian Riviera',
    source: 'Unsplash (Free Commercial License)',
    license: 'Unsplash License'
  },
  'dest-japan': {
    id: 'dest-japan',
    name: 'Kyoto Autumn Pagoda, Japan',
    usage: 'Japan Destination Card',
    localPath: '/assets/images/destinations/japan.jpg',
    altText: 'Traditional Japanese wooden pagoda rising above Kyoto gardens in autumn',
    source: 'Unsplash (Free Commercial License)',
    license: 'Unsplash License'
  },
  'dest-indonesia': {
    id: 'dest-indonesia',
    name: 'Ubud Rice Terraces, Bali, Indonesia',
    usage: 'Indonesia Destination Card',
    localPath: '/assets/images/destinations/indonesia.jpg',
    altText: 'Lush terraced rice fields and tropical sanctuary in Ubud, Bali',
    source: 'Unsplash (Free Commercial License)',
    license: 'Unsplash License'
  },

  // Properties
  'prop-hotel-01': {
    id: 'prop-hotel-01',
    name: 'The Brera Atelier Suite',
    usage: 'Milan Urban Boutique Hotel',
    localPath: '/assets/images/properties/hotel-01.jpg',
    altText: 'Serene contemporary hotel suite with warm lighting and king bed',
    source: 'Unsplash (Free Commercial License)',
    license: 'Unsplash License'
  },
  'prop-hotel-02': {
    id: 'prop-hotel-02',
    name: 'Mitte Heritage Grand',
    usage: 'Modern Grand Hotel Berlin',
    localPath: '/assets/images/properties/hotel-02.jpg',
    altText: 'Minimalist luxury hotel bedroom with plush pillows and soft architectural tones',
    source: 'Unsplash (Free Commercial License)',
    license: 'Unsplash License'
  },
  'prop-villa-01': {
    id: 'prop-villa-01',
    name: 'Villa Bellavista Chianti',
    usage: 'Tuscan Hillside Villa',
    localPath: '/assets/images/properties/villa-01.jpg',
    altText: 'Exclusive private villa with pristine swimming pool and landscaped gardens',
    source: 'Unsplash (Free Commercial License)',
    license: 'Unsplash License'
  },
  'prop-cabin-01': {
    id: 'prop-cabin-01',
    name: 'Nordic Pine Sanctuary',
    usage: 'Nordic Alpine Pine Retreat',
    localPath: '/assets/images/properties/cabin-01.jpg',
    altText: 'Architectural timber cabin nestled in dense evergreen forest',
    source: 'Unsplash (Free Commercial License)',
    license: 'Unsplash License'
  },
  'prop-resort-01': {
    id: 'prop-resort-01',
    name: 'Uluwatu Cliff Sanctuary',
    usage: 'Oceanview Luxury Resort in Bali',
    localPath: '/assets/images/properties/resort-01.jpg',
    altText: 'Tropical resort lounge area with ocean view and palm trees',
    source: 'Unsplash (Free Commercial License)',
    license: 'Unsplash License'
  },
  'prop-cottage-01': {
    id: 'prop-cottage-01',
    name: 'Loch Fyne Fisherman Cottage',
    usage: 'Highland Loch Cottage Scotland',
    localPath: '/assets/images/properties/cottage-01.jpg',
    altText: 'Traditional stone cottage with lush climbing ivy and peaceful meadow',
    source: 'Unsplash (Free Commercial License)',
    license: 'Unsplash License'
  },
  'prop-apartment-01': {
    id: 'prop-apartment-01',
    name: 'Le Marais Light Loft',
    usage: 'Artisan Parisian Apartment',
    localPath: '/assets/images/properties/apartment-01.jpg',
    altText: 'Light-filled Parisian apartment living space with wooden floors and high ceilings',
    source: 'Unsplash (Free Commercial License)',
    license: 'Unsplash License'
  },

  // Editorial Articles
  'article-01': {
    id: 'article-01',
    name: 'EU Hosts Annuity Income',
    usage: 'Journal Feature 1',
    localPath: '/assets/images/editorial/article-01.jpg',
    altText: 'Travelers sitting by an idyllic European canal with historic brick townhouses',
    source: 'Unsplash (Free Commercial License)',
    license: 'Unsplash License'
  },
  'article-02': {
    id: 'article-02',
    name: 'Energy Efficient Homes',
    usage: 'Journal Feature 2',
    localPath: '/assets/images/editorial/article-02.jpg',
    altText: 'Cozy living room with warm fireplace and comfortable seating',
    source: 'Unsplash (Free Commercial License)',
    license: 'Unsplash License'
  },
  'article-03': {
    id: 'article-03',
    name: 'Legendary Historic Stays',
    usage: 'Journal Feature 3',
    localPath: '/assets/images/editorial/article-03.jpg',
    altText: 'Historic coastal cedar shingle cottage with green trim and white picket fence',
    source: 'Unsplash (Free Commercial License)',
    license: 'Unsplash License'
  }
};
