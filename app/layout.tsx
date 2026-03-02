import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/shared/ui/navbar/Navbar";
import Footer from "@/shared/ui/Footer";
import PageHeader from "@/shared/ui/PageHeader";
import Providers from "./Provider";
import BottomNav from "@/shared/ui/navbar/BottomNav";
import GoogleTranslatorInit from "@/features/language-selector/utils/GoogleTranslatorInit";
import Script from "next/script";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Clotya",
  description: "Clotya - Your one stop shop for all things fashion for all genders and occasions",
  keywords: [
    'fashion',
    'clothing',
    'shoes',
    'accessories',
    'bags',
    'jewelry',
    'watches',
    'sunglasses',
    'hats',
    'scarves',
    'gloves',
    'belts',
    'wallets',
    'keychains',
    'umbrellas',
    'backpacks',
    'luggage',
    'travel',
    'business',
    'casual',
    'formal',
    'party',
    'wedding',
    'birthday',
    'anniversary',
    'graduation',
    'new year',
    'christmas',
    'cargo',
    'gowns',
    'shirts',
    'gym wears'
  ],
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
  alternates: {
    canonical: "https://clotya.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://clotya.vercel.app",
    siteName: "Clotya",
    title: "Clotya | Fashion Store",
    description: "Clotya - Your one stop shop for all things fashion for all genders and occasions",
    images: [
      {
        url: "https://res.cloudinary.com/dpwljfhgl/image/upload/v1772491120/shop-banner_jmggvz.webp",
        width: 1200,
        height: 630,
        alt: "Clotya | Fashion Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clotya | Fashion Store",
    description:
      "Clotya - Your one stop shop for all things fashion for all genders and occasions",
    creator: "@clotya",
    site: "@clotya",
    images: [
      "https://res.cloudinary.com/dpwljfhgl/image/upload/v1772491120/shop-banner_jmggvz.webp",
    ],
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://clotya.vercel.app'),
  category: 'business',
  classification: 'Fashion Store',
  other: {
    'theme-color': '#000000',
    'color-scheme': 'dark',
    'format-detection': 'telephone=no',
  },
};

export default function RootLayout({
  children,
  product
}: Readonly<{
  children: React.ReactNode;
  product: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jost.variable} antialiased`}
      >
        <div id="google_translate_element" className="hidden" />
        <Providers>
          <PageHeader />
          <GoogleTranslatorInit />
          <Navbar />
          {children}
          {product} {/* this is the parallel route for the product page */}
          <div className="xl:hidden">
            <BottomNav />
          </div>
          <Footer />
        </Providers>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
