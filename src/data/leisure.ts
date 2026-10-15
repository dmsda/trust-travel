import { LeisureExperience } from '@/types';

export const leisureExperiences: LeisureExperience[] = [
  {
    id: 'exp-kyoto-tea',
    slug: 'kyoto-private-zen-tea-mastery',
    title: 'Private Zen Tea Ceremony in an Arashiyama Temple',
    category: 'Cultural',
    destinationSlug: 'japan',
    destinationName: 'Kyoto, Japan',
    duration: '2.5 hours',
    groupSize: 'Private (1-4 guests)',
    pricePerPersonUsd: 145,
    rating: 4.98,
    reviewCount: 42,
    coverImage: '/assets/images/destinations/japan.jpg',
    overview: 'Enter a private 400-year-old sub-temple garden closed to the general public. Under the guidance of a 15th-generation tea master, learn the ritual choreography of preparing matcha and mindfulness in stillness.',
    highlights: [
      'Exclusive private access to historic temple tatami room',
      'Hands-on powdered matcha whisking instruction',
      'Artisanal seasonal wagashi confections',
      'Guided walk through moss and stone zen garden'
    ]
  },
  {
    id: 'exp-tuscany-truffle',
    slug: 'tuscany-truffle-hunting-wine',
    title: 'Truffle Hunting & Private Chianti Cellar Tasting',
    category: 'Gastronomic',
    destinationSlug: 'italy',
    destinationName: 'Tuscany, Italy',
    duration: '4.5 hours',
    groupSize: 'Small group (max 6)',
    pricePerPersonUsd: 180,
    rating: 4.96,
    reviewCount: 68,
    coverImage: '/assets/images/properties/villa-01.jpg',
    overview: 'Join an experienced lagotto romagnolo canine and master forager through oak woods, followed by a multi-course hand-rolled pasta lunch generously shaved with fresh truffles and paired with reserve Chianti Classico vintages.',
    highlights: [
      'Woodland truffle hunt with trained lagotto dogs',
      'Cellar tour of a 17th-century family vineyard',
      'Al fresco 4-course lunch with wine pairings',
      'Complimentary bottle of organic extra-virgin olive oil'
    ]
  },
  {
    id: 'exp-scotland-loch',
    slug: 'scottish-highlands-wild-kayak',
    title: 'Highlands Sea Kayak & Wild Coastal Foraging',
    category: 'Adventure',
    destinationSlug: 'scotland',
    destinationName: 'Highlands, Scotland',
    duration: '5 hours',
    groupSize: 'Small group (max 4)',
    pricePerPersonUsd: 130,
    rating: 4.93,
    reviewCount: 37,
    coverImage: '/assets/images/destinations/scotland.jpg',
    overview: 'Paddle through the secluded sea lochs of Argyll beneath towering mountain peaks. Discover hidden coves, spot grey seals, and cook freshly foraged wild mussels over a beach driftwood campfire.',
    highlights: [
      'Top-tier sea kayaks and thermal immersion gear provided',
      'Marine wildlife spotting: seals, otters, and sea eagles',
      'Shoreline foraging session with coastal ecologist',
      'Campfire beach cooking and warm spiced cider'
    ]
  },
  {
    id: 'exp-bali-healing',
    slug: 'ubud-sound-healing-botanical-spa',
    title: 'Sound Healing & River Gorge Botanical Spa Ritual',
    category: 'Wellness',
    destinationSlug: 'indonesia',
    destinationName: 'Bali, Indonesia',
    duration: '3 hours',
    groupSize: 'Private (1-2 guests)',
    pricePerPersonUsd: 110,
    rating: 4.99,
    reviewCount: 95,
    coverImage: '/assets/images/destinations/indonesia.jpg',
    overview: 'Immerse yourself in acoustic vibrational medicine inside an open bamboo pyramid nestled over the Ayung River, followed by a traditional herbal floral bath infused with lemongrass and frangipani.',
    highlights: [
      '60-minute sacred Tibetan singing bowl session',
      'Balinese deep herbal massage',
      'Open-air river canyon stone flower bath',
      'Ayurvedic herbal tonic elixirs'
    ]
  }
];
