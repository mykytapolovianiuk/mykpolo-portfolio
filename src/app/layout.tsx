import type { Metadata } from "next";
import { SmoothScroll } from '@/components/utils/SmoothScroll';
import "./globals.css";
import { Cursor } from "../../components/ui/Cursor";

export const metadata: Metadata = {
  title: "mykpolo",
  description: "Minimalist Brutalist Portfolio - Chaos to Structure",
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
