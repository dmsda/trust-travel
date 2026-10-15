import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const images = [
  // Hero
  {
    folder: 'hero',
    name: 'hero-travel.jpg',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=80',
    alt: 'Winding scenic country road through golden hills at sunrise',
    usage: 'Homepage Hero Banner'
  },
  // Destinations
  {
    folder: 'destinations',
    name: 'scotland.jpg',
    url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1000&q=80',
    alt: 'Historic stone castle overlooking a misty loch in the Scottish Highlands',
    usage: 'Scotland Destination Card'
  },
  {
    folder: 'destinations',
    name: 'germany.jpg',
    url: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1000&q=80',
    alt: 'Romantic medieval European cobblestone alleyway flanked by ancient stone walls',
    usage: 'Germany Destination Card'
  },
  {
    folder: 'destinations',
    name: 'nepal.jpg',
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    alt: 'Ancient tiered pagoda temple in the Kathmandu Valley, Nepal',
    usage: 'Nepal Destination Card'
  },
  {
    folder: 'destinations',
    name: 'italy.jpg',
    url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80',
    alt: 'Cinque Terre colorful coastal village perched along the Italian Riviera',
    usage: 'Italy Destination Card'
  },
  {
    folder: 'destinations',
    name: 'japan.jpg',
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
    alt: 'Traditional Japanese wooden pagoda rising above Kyoto gardens in autumn',
    usage: 'Japan Destination Card'
  },
  {
    folder: 'destinations',
    name: 'indonesia.jpg',
    url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
    alt: 'Lush terraced rice fields and tropical sanctuary in Ubud, Bali',
    usage: 'Indonesia Destination Card'
  },

  // Properties
  {
    folder: 'properties',
    name: 'hotel-01.jpg',
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
    alt: 'Serene contemporary hotel suite with warm lighting and king bed',
    usage: 'Urban Boutique Hotel in Milan'
  },
  {
    folder: 'properties',
    name: 'hotel-02.jpg',
    url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80',
    alt: 'Minimalist luxury hotel bedroom with plush pillows and soft architectural tones',
    usage: 'Modern Grand Hotel Berlin'
  },
  {
    folder: 'properties',
    name: 'villa-01.jpg',
    url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
    alt: 'Exclusive private villa with pristine swimming pool and landscaped gardens',
    usage: 'Tuscan Hillside Villa'
  },
  {
    folder: 'properties',
    name: 'cabin-01.jpg',
    url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1000&q=80',
    alt: 'Architectural timber cabin nestled in dense evergreen forest',
    usage: 'Nordic Alpine Pine Retreat'
  },
  {
    folder: 'properties',
    name: 'resort-01.jpg',
    url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80',
    alt: 'Tropical resort lounge area with ocean view and palm trees',
    usage: 'Uluwatu Cliff Sanctuary'
  },
  {
    folder: 'properties',
    name: 'cottage-01.jpg',
    url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1000&q=80',
    alt: 'Traditional stone cottage with lush climbing ivy and peaceful meadow',
    usage: 'Highland Loch Cottage'
  },
  {
    folder: 'properties',
    name: 'apartment-01.jpg',
    url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
    alt: 'Light-filled Parisian apartment living space with wooden floors and high ceilings',
    usage: 'Brera Art District Loft'
  },

  // Editorial
  {
    folder: 'editorial',
    name: 'article-01.jpg',
    url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1000&q=80',
    alt: 'Travelers sitting by an idyllic European canal with historic brick townhouses',
    usage: 'Editorial article 1: EU Hosts Annuity Income'
  },
  {
    folder: 'editorial',
    name: 'article-02.jpg',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    alt: 'Cozy living room with warm fireplace and comfortable seating',
    usage: 'Editorial article 2: Energy Efficient Homes'
  },
  {
    folder: 'editorial',
    name: 'article-03.jpg',
    url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80',
    alt: 'Historic coastal cedar shingle cottage with green trim and white picket fence',
    usage: 'Editorial article 3: Legendary Historic Stays'
  },

  // Property types
  {
    folder: 'property-types',
    name: 'hotels.jpg',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    alt: 'Luxury boutique hotel facade with illuminated windows',
    usage: 'Hotels Category'
  },
  {
    folder: 'property-types',
    name: 'apartments.jpg',
    url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    alt: 'Designer studio apartment with modern kitchen and dining space',
    usage: 'Apartments Category'
  },
  {
    folder: 'property-types',
    name: 'cabins.jpg',
    url: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=80',
    alt: 'Secluded wooden cabin in the mountains',
    usage: 'Cabins Category'
  },
  {
    folder: 'property-types',
    name: 'cottages.jpg',
    url: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80',
    alt: 'Picturesque countryside stone cottage surrounded by nature',
    usage: 'Cottages Category'
  },
  {
    folder: 'property-types',
    name: 'villas.jpg',
    url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    alt: 'Spectacular modern villa with expansive glass walls and pool',
    usage: 'Villas Category'
  },
  {
    folder: 'property-types',
    name: 'resorts.jpg',
    url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
    alt: 'Exclusive coastal resort with poolside cabanas',
    usage: 'Resorts Category'
  },
  {
    folder: 'property-types',
    name: 'boutique.jpg',
    url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    alt: 'Charming boutique hotel courtyard with bistro seating',
    usage: 'Boutique Hotels Category'
  },
  {
    folder: 'property-types',
    name: 'guesthouses.jpg',
    url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
    alt: 'Warm family guesthouse with mountain backdrop',
    usage: 'Guesthouses Category'
  },
  {
    folder: 'property-types',
    name: 'beach-houses.jpg',
    url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
    alt: 'White beach house overlooking clear turquoise ocean waters',
    usage: 'Beach Houses Category'
  },

  // Banner Vignettes
  {
    folder: 'vignettes',
    name: 'vignette-1.jpg',
    url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=300&q=80',
    alt: 'Cabin in mountain woods',
    usage: 'Banner constellation vignette 1'
  },
  {
    folder: 'vignettes',
    name: 'vignette-2.jpg',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
    alt: 'Tropical turquoise sea',
    usage: 'Banner constellation vignette 2'
  },
  {
    folder: 'vignettes',
    name: 'vignette-3.jpg',
    url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=300&q=80',
    alt: 'Desert lantern dusk',
    usage: 'Banner constellation vignette 3'
  },
  {
    folder: 'vignettes',
    name: 'vignette-4.jpg',
    url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=300&q=80',
    alt: 'Artisan loft interior',
    usage: 'Banner constellation vignette 4'
  },
  {
    folder: 'vignettes',
    name: 'vignette-5.jpg',
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=300&q=80',
    alt: 'Road trip scenic vista',
    usage: 'Banner constellation vignette 5'
  },
  {
    folder: 'vignettes',
    name: 'vignette-6.jpg',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80',
    alt: 'Old world courtyard dining',
    usage: 'Banner constellation vignette 6'
  },
  {
    folder: 'vignettes',
    name: 'vignette-7.jpg',
    url: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=300&q=80',
    alt: 'Kyoto zen bamboo pathway',
    usage: 'Banner constellation vignette 7'
  }
];

async function downloadAll() {
  console.log(`Starting download of ${images.length} curated images...`);
  
  for (const item of images) {
    const dir = path.join(rootDir, 'public', 'assets', 'images', item.folder);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, item.name);
    
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
      console.log(`Already exists: ${item.folder}/${item.name}`);
      continue;
    }

    try {
      console.log(`Downloading: ${item.folder}/${item.name}...`);
      const res = await fetch(item.url);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      console.log(`✓ Saved: ${item.folder}/${item.name} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`✗ Error downloading ${item.folder}/${item.name}:`, err.message);
    }
  }

  console.log('All image assets processed successfully.');
}

downloadAll();
