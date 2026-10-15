import { MetadataRoute } from 'next';
import { destinations } from '@/data/destinations';
import { properties } from '@/data/properties';
import { editorialArticles } from '@/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://trust.travel';

  // Core static pages
  const staticRoutes = [
    '',
    '/stays',
    '/destinations',
    '/property-types',
    '/transfers',
    '/leisure',
    '/journal',
    '/favorites',
    '/about',
    '/contact',
    '/privacy',
    '/terms'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8
  }));

  // Dynamic stays
  const stayRoutes = properties.map((p) => ({
    url: `${baseUrl}/stays/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9
  }));

  // Dynamic destinations
  const destinationRoutes = destinations.map((d) => ({
    url: `${baseUrl}/destinations/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85
  }));

  // Dynamic journal articles
  const journalRoutes = editorialArticles.map((a) => ({
    url: `${baseUrl}/journal/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75
  }));

  return [...staticRoutes, ...stayRoutes, ...destinationRoutes, ...journalRoutes];
}
