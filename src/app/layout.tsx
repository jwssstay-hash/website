import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Woodside Serene | Luxury Nature Stay",
  description: "Experience luxury camping and peaceful stays amidst the untouched beauty of Jawadhu Hills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://db.onlinewebfonts.com/c/6e47ef470dd19698c911332a9b4d1cf4?family=Neue+Haas+Grotesk+Text+Pro" rel="stylesheet" />
        <link href="https://db.onlinewebfonts.com/c/dec0d9b4e22ca588dc20e1e2e09a59b5?family=Neue+Haas+Grotesk+Display+Pro+55+Roman" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-woodside-950 text-slate-50 selection:bg-woodside-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
