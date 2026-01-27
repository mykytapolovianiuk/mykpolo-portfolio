import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";

// Temporary font - will replace with local extended sans-serif
const inter = Inter({
  variable: "--font-extended-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MykPolo Portfolio",
  description: "Minimalist Brutalist Portfolio - Chaos to Structure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-brand-black text-brand-white`}>
        {children}
      </body>
    </html>
  );
}
