import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://website.jwssstay-hash.pages.dev'),
  title: {
    default: "Woodside Serene | Luxury Farm Stay & Glamping in Jawadhu Hills",
    template: "%s | Woodside Serene Jawadhu Hills"
  },
  description: "Experience luxury camping, premium glass houses, and peaceful nature stays amidst the untouched beauty of Jawadhu Hills. Perfect for family retreats and events.",
  keywords: ["Jawadhu Hills Resort", "Luxury Glamping Tamil Nadu", "Nature Stay near Chennai", "Tent Stay Jawadhu Hills", "Glass House Stay", "Farm Stay", "Woodside Serene"],
  authors: [{ name: "Woodside Serene" }],
  creator: "Woodside Serene",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://website.jwssstay-hash.pages.dev",
    title: "Woodside Serene | Luxury Nature Stay in Jawadhu Hills",
    description: "Discover premium glamping, family tents, and serene glass houses at Woodside Serene.",
    siteName: "Woodside Serene",
    images: [{
      url: "/Images/Glass Room/Main.jpeg",
      width: 1200,
      height: 630,
      alt: "Woodside Serene Glass House",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Woodside Serene | Luxury Nature Stay",
    description: "Premium glamping and peaceful nature stays in Jawadhu Hills.",
    images: ["/Images/Glass Room/Main.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "Woodside Serene",
    "image": "https://website.jwssstay-hash.pages.dev/Images/Glass Room/Main.jpeg",
    "description": "Luxury farm stay and glamping resort in Jawadhu Hills, Tamil Nadu.",
    "url": "https://website.jwssstay-hash.pages.dev",
    "telephone": "+919840741075",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jawadhu Hills",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.5786, // Approximate for Jawadhu hills, they can update exact
      "longitude": 78.8950
    },
    "priceRange": "₹1500 - ₹5000",
    "starRating": {
      "@type": "Rating",
      "ratingValue": "5"
    }
  };

  return (
    <html lang="en" className="h-full antialiased dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://db.onlinewebfonts.com/c/6e47ef470dd19698c911332a9b4d1cf4?family=Neue+Haas+Grotesk+Text+Pro" rel="stylesheet" />
        <link href="https://db.onlinewebfonts.com/c/dec0d9b4e22ca588dc20e1e2e09a59b5?family=Neue+Haas+Grotesk+Display+Pro+55+Roman" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-woodside-950 text-slate-50 selection:bg-woodside-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
