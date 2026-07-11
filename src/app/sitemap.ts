import { MetadataRoute } from 'next';

// Replace this with your actual production domain when you buy a custom domain
const DOMAIN = 'https://website.jwssstay-hash.pages.dev'; 

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${DOMAIN}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${DOMAIN}/booking`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${DOMAIN}/events`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${DOMAIN}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];
}
