import { Destination } from '@/types';

export const destinations: Destination[] = [
  {
    id: 'dest-scotland',
    slug: 'scotland',
    name: 'Scotland',
    country: 'United Kingdom',
    region: 'Western Europe',
    tagline: 'Untamed Highlands, ancient lochs, and historic castle retreats.',
    description: 'From the dramatic crags of the Isle of Skye to the tranquil shores of Loch Fyne, Scotland invites travelers to experience wild natural beauty paired with world-class heritage estates and cozy stone cottages.',
    heroImage: '/assets/images/destinations/scotland.jpg',
    cardImage: '/assets/images/destinations/scotland.jpg',
    cardShape: 'arch-left',
    propertyCount: 1742,
    highlightAreas: ['Highlands & Glencoe', 'Isle of Skye', 'Edinburgh New Town', 'Loch Lomond'],
    bestSeason: 'May to September for mild daylight; October to December for dramatic fireside retreats.',
    travelTips: [
      'Pack versatile layered clothing and waterproof footwear for shifting highland weather.',
      'Consider scenic rail travel via the West Highland Line for panoramic valley views.',
      'Reserve heritage castle stays well in advance during the late summer fringe season.'
    ],
    featuredPropertyIds: ['cottage-loch-fyne', 'highland-estate-retreat'],
    editorialSlug: 'historic-homes-legendary-stays'
  },
  {
    id: 'dest-germany',
    slug: 'germany',
    name: 'Germany',
    country: 'Germany',
    region: 'Central Europe',
    tagline: 'Cobblestone medieval towns, Bavarian alpine valleys, and avant-garde design capitals.',
    description: 'Immerse yourself in centuries of architectural storytelling. Wander through timbered fairy-tale villages along the Romantic Road, or unwind in sleek modernist residences in Berlin and Munich.',
    heroImage: '/assets/images/destinations/germany.jpg',
    cardImage: '/assets/images/destinations/germany.jpg',
    cardShape: 'tall-arch',
    propertyCount: 452,
    highlightAreas: ['Rothenburg ob der Tauber', 'Bavarian Alps', 'Berlin Mitte', 'Black Forest'],
    bestSeason: 'May to October for vineyard walks; December for festive artisan winter markets.',
    travelTips: [
      'Regional train connections are exceptionally punctual and connect smaller historical hamlets directly.',
      'Explore local artisan bakeries and traditional gasthäuser in historical town squares.',
      'Boutique accommodations often occupy restored guild houses with unique architectural layouts.'
    ],
    featuredPropertyIds: ['mitte-heritage-grand', 'bavarian-forest-chalet'],
    editorialSlug: 'helping-hosts-energy-efficient'
  },
  {
    id: 'dest-nepal',
    slug: 'nepal',
    name: 'Nepal',
    country: 'Nepal',
    region: 'South Asia',
    tagline: 'Sacred mountain sanctuaries, pagoda courtyards, and Himalayan serenity.',
    description: 'Cradled in the shadows of the world’s highest peaks, Nepal blends ancient Buddhist and Hindu architectural heritage with peaceful hillside lodges designed for contemplation and trekking adventures.',
    heroImage: '/assets/images/destinations/nepal.jpg',
    cardImage: '/assets/images/destinations/nepal.jpg',
    cardShape: 'arch-right',
    propertyCount: 278,
    highlightAreas: ['Kathmandu Durbar Square', 'Pokhara Valley', 'Nagarkot Ridge', 'Bhaktapur'],
    bestSeason: 'October to December for crystalline mountain views; March to April for blooming rhododendrons.',
    travelTips: [
      'Early morning hours offer the most lucid views of snow-dusted Himalayan horizons.',
      'Honor sacred cultural customs by removing footwear before entering courtyard temples.',
      'Eco-lodges on the ridges often feature organic farm-to-table breakfast and tea service.'
    ],
    featuredPropertyIds: ['nagarkot-peak-sanctuary', 'patan-heritage-residence'],
    editorialSlug: 'eu-hosts-annuity-income'
  },
  {
    id: 'dest-italy',
    slug: 'italy',
    name: 'Italy',
    country: 'Italy',
    region: 'Southern Europe',
    tagline: 'Sun-drenched olive groves, Renaissance palazzos, and dramatic Mediterranean cliffs.',
    description: 'Savor the art of slow living. From Milanese atelier design suites to rolling Chianti wine estates and cliffside coastal hideaways in Positano, Italy offers timeless sensory indulgence.',
    heroImage: '/assets/images/destinations/italy.jpg',
    cardImage: '/assets/images/destinations/italy.jpg',
    cardShape: 'rounded',
    propertyCount: 1120,
    highlightAreas: ['Milan Arts District', 'Chianti Hills', 'Amalfi Coast', 'Lake Como'],
    bestSeason: 'April to June and September to October for golden light and comfortable warmth.',
    travelTips: [
      'Midday rest hours (riposo) are customary in regional villages; schedule outings thoughtfully.',
      'Rent an electric vehicle or arrange private transfer to traverse hillside wine roads with ease.'
    ],
    featuredPropertyIds: ['brera-atelier-suite', 'villa-bellavista-chianti']
  },
  {
    id: 'dest-japan',
    slug: 'japan',
    name: 'Japan',
    country: 'Japan',
    region: 'East Asia',
    tagline: 'Zen temple gardens, cedar onsen retreats, and refined minimalist hospitality.',
    description: 'Experience omotenashi—unconditional mindful hospitality. Retreat to wooden ryokans surrounded by bamboo groves or admire Tokyo’s elevated architectural penthouses overlooking the neon skyline.',
    heroImage: '/assets/images/destinations/japan.jpg',
    cardImage: '/assets/images/destinations/japan.jpg',
    cardShape: 'rounded',
    propertyCount: 845,
    highlightAreas: ['Kyoto Gion & Arashiyama', 'Hakone Hot Springs', 'Tokyo Ginza', 'Takayama'],
    bestSeason: 'March to May for cherry blossoms; October to November for radiant maple foliage.',
    travelTips: [
      'Ryokan bookings frequently include kaiseki multi-course dinners prepared with seasonal local produce.',
      'Quiet voices and mindful etiquette are deeply appreciated in public transportation and historic quarters.'
    ],
    featuredPropertyIds: ['arashiyama-cedar-ryokan', 'ginza-skyline-penthouse']
  },
  {
    id: 'dest-indonesia',
    slug: 'indonesia',
    name: 'Indonesia',
    country: 'Indonesia',
    region: 'Southeast Asia',
    tagline: 'Emerald rice terraces, clifftop ocean sanctuaries, and island tranquility.',
    description: 'A spiritual tropical haven. Discover secluded open-air villas overlooking river gorges in Ubud, or retreat to panoramic limestone cliffs perched high above the azure Indian Ocean in Uluwatu.',
    heroImage: '/assets/images/destinations/indonesia.jpg',
    cardImage: '/assets/images/destinations/indonesia.jpg',
    cardShape: 'rounded',
    propertyCount: 960,
    highlightAreas: ['Ubud Valley', 'Uluwatu Cliffs', 'Seminyak', 'Lombok Coast'],
    bestSeason: 'May to September for dry tropical sunshine and gentle sea breezes.',
    travelTips: [
      'Private drivers are convenient, affordable, and knowledgeable guides for exploring island temples.',
      'Respect ceremonial temple dress codes by wearing a traditional sarong and sash.'
    ],
    featuredPropertyIds: ['uluwatu-cliff-sanctuary', 'ubud-canopy-villa']
  }
];
