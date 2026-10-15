import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trust.travel"),
  title: {
    default: "TRUST.TRAVEL — Premium Hotel Rental & Travel Booking",
    template: "%s | TRUST.TRAVEL",
  },
  description: "Effortless bookings for leisure travel or business. Discover curated accommodations, scenic transfers, and immersive cultural journeys.",
  keywords: ["luxury hotel rental", "boutique stays", "editorial travel", "villas", "travel discovery", "highlands retreats"],
  authors: [{ name: "TRUST.TRAVEL Editorial & Architecture Team" }],
  creator: "TRUST.TRAVEL",
  publisher: "TRUST.TRAVEL",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/assets/brand/favicon.svg",
  },
  openGraph: {
    title: "TRUST.TRAVEL — Effortless bookings for leisure travel or business",
    description: "Discover curated boutique stays, luxury villas, architectural cabins, and refined travel experiences worldwide.",
    url: "https://trust.travel",
    siteName: "TRUST.TRAVEL",
    images: [
      {
        url: "/assets/brand/og-cover.svg",
        width: 1200,
        height: 630,
        alt: "TRUST.TRAVEL Social Card",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TRUST.TRAVEL — Premium Hotel Rental & Travel Booking",
    description: "Effortless bookings for leisure travel or business.",
    images: ["/assets/brand/og-cover.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#171614",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#171614] font-sans antialiased selection:bg-[#B9A17D]/20 selection:text-[#171614]">
        <Suspense fallback={<div className="h-20" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
