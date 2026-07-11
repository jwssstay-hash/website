import { MetadataRoute } from 'next';

const DOMAIN = 'https://website.jwssstay-hash.pages.dev';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin'], // Protect admin panel from being indexed on Google
    },
    sitemap: `${DOMAIN}/sitemap.xml`,
  };
}
