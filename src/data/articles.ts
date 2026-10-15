import { EditorialArticle } from '@/types';

export const editorialArticles: EditorialArticle[] = [
  {
    id: 'art-1',
    slug: 'eu-hosts-annuity-income',
    title: 'More and More EU Hosts Rely on Annuity Income',
    subtitle: 'Exploring sustainable long-term economic models for independent hospitality creators across Europe.',
    category: 'Hospitality Economics',
    excerpt: 'Across France, Italy, and Portugal, a quiet transition is underway as seasoned property owners turn toward structured annuity and fractional ownership models to sustain architectural preservation.',
    publishedDate: 'June 18, 2025',
    readingTimeMinutes: 5,
    author: {
      name: 'Camille Laurent',
      role: 'European Travel & Economics Editor'
    },
    coverImage: '/assets/images/editorial/article-01.jpg',
    content: [
      {
        type: 'p',
        text: 'In historic European quarters—from the winding canals of Bruges and Amsterdam to the terracotta rooftops of Bologna—a growing number of independent property custodians are rethinking how their heritage buildings can sustain themselves financially across generations.'
      },
      {
        type: 'h2',
        text: 'The Intersection of Heritage and Sustainable Income'
      },
      {
        type: 'p',
        text: 'Rather than facing abrupt sales or speculative real estate buyouts, hosts are increasingly partnering with structured hospitality trusts. This approach enables them to maintain rigorous architectural standards while receiving predictable, stable revenue streams.'
      },
      {
        type: 'quote',
        text: 'Preserving a seventeenth-century townhouse requires more than passion—it demands financial architectures designed for centuries rather than fiscal quarters.',
        citation: 'Matteo Bellini, Heritage Conservation Architect'
      },
      {
        type: 'p',
        text: 'At TRUST.TRAVEL, our commitment is to connect thoughtful travelers directly with these rare living spaces, ensuring that guest revenues directly contribute to craftsmanship, local restoration guilds, and neighborhood vitality.'
      }
    ],
    relatedSlugs: ['historic-homes-legendary-stays', 'helping-hosts-energy-efficient']
  },
  {
    id: 'art-2',
    slug: 'helping-hosts-energy-efficient',
    title: 'Helping Hosts Make Their Homes More Energy Efficient',
    subtitle: 'Innovative insulation, solar integration, and passive climate solutions for historic residences.',
    category: 'Sustainable Living',
    excerpt: 'How modern micro-heat pumps, lime plaster insulation, and discreet smart thermostats are reducing carbon footprints without compromising centuries of architectural character.',
    publishedDate: 'May 24, 2025',
    readingTimeMinutes: 6,
    author: {
      name: 'Evelyn Hart',
      role: 'Sustainable Architecture Critic'
    },
    coverImage: '/assets/images/editorial/article-02.jpg',
    content: [
      {
        type: 'p',
        text: 'Energy retrofits for historic buildings were once viewed as an impossible compromise between aesthetic authenticity and thermal performance. Today, pioneering craftsmanship is proving that old-world charm and cutting-edge decarbonization can coexist seamlessly.'
      },
      {
        type: 'h2',
        text: 'Breathable Insulation & Low-Impact Tech'
      },
      {
        type: 'p',
        text: 'By employing hemp-lime insulating renders, triple-glazed vacuum glass that fits historic sash frames, and ground-source heat exchangers, hosts are seeing energy consumption plummet by over 60% while interior comfort reaches new heights.'
      },
      {
        type: 'quote',
        text: 'The greenest building is the one already standing. When we empower heritage homes with intelligent thermodynamics, everyone wins.',
        citation: 'Dr. Henrik Vance, Passive House Alliance'
      }
    ],
    relatedSlugs: ['eu-hosts-annuity-income', 'historic-homes-legendary-stays']
  },
  {
    id: 'art-3',
    slug: 'historic-homes-legendary-stays',
    title: 'How Four Owners Turned Their Historic Homes into Legendary Stays',
    subtitle: 'From a Scottish tidal loch to a sun-bleached coastal cottage in Massachusetts.',
    category: 'Design & Heritage',
    excerpt: 'Intimate conversations with four visionary restorers who salvaged crumbling historic properties and transformed them into deeply atmospheric traveler sanctuaries.',
    publishedDate: 'April 12, 2025',
    readingTimeMinutes: 8,
    author: {
      name: 'Sebastian Croft',
      role: 'Editor-in-Chief, TRUST Journal'
    },
    coverImage: '/assets/images/editorial/article-03.jpg',
    content: [
      {
        type: 'p',
        text: 'There is an indelible soul to a house that has weathered two centuries of coastal tides and windstorms. In this retrospective, we visit four distinguished residences whose owners refused the convenience of modern bulldozers, opting instead for years of meticulous hands-on restoration.'
      },
      {
        type: 'h2',
        text: 'Listening to the Bones of the Building'
      },
      {
        type: 'p',
        text: 'Whether uncovering forgotten hand-hewn chestnut beams or repointing fieldstone masonry with traditional lime mortars, each owner prioritized tactile authenticity over sterile minimalism.'
      },
      {
        type: 'quote',
        text: 'When a guest walks across floorboards that have settled over two hundred years, they immediately breathe deeper. That resonance cannot be fabricated.',
        citation: 'Hannah Sterling, Custodian of Dune Haven'
      }
    ],
    relatedSlugs: ['eu-hosts-annuity-income', 'helping-hosts-energy-efficient']
  }
];
