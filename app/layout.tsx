import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/shared/ui/navbar/Navbar";
import Footer from "@/shared/ui/Footer";
import PageHeader from "@/shared/ui/PageHeader";
import Providers from "./Provider";
import BottomNav from "@/shared/ui/navbar/BottomNav";

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
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jost.variable} antialiased`}
      >
        <Providers>
          <PageHeader />
          <Navbar />
          {children}
          <div className="xl:hidden">
            <BottomNav />
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
