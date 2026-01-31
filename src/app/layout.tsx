import type { Metadata } from "next";
import { SmoothScroll } from '@/components/utils/SmoothScroll';
import "./globals.css";
import { Cursor } from "../../components/ui/Cursor";

export const metadata: Metadata = {
  title: {
    default: 'Mykyta Polovianiuk | Creative Developer',
    template: '%s | Mykyta Polovianiuk'
  },
  description: 'Portfolio of Mykyta Polovianiuk, a Full-stack & Creative Developer based in Kyiv. Expert in Next.js, React, GSAP, and immersive web experiences.',
  keywords: ['Mykyta Polovianiuk', 'Creative Developer', 'Frontend Developer', 'Kyiv', 'Web Design', 'Next.js Developer', 'React Developer'],
  authors: [{ name: 'Mykyta Polovianiuk' }],
  creator: 'Mykyta Polovianiuk',
  publisher: 'Mykyta Polovianiuk',
  openGraph: {
    title: 'Mykyta Polovianiuk | Creative Developer',
    description: 'Immersive portfolio featuring modern web technologies and creative design.',
    url: 'https://mykpolo.vercel.app',
    siteName: 'Mykyta Polovianiuk Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mykyta Polovianiuk Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
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

import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=panchang@200,300,400,500,600,700,800&f[]=general-sans@300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-black text-brand-white font-sans select-none cursor-none">
        <Cursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      </body>
    </html>
  );
}
