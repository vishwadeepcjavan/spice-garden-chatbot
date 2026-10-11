import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#7f1d1d",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Spice Garden | Authentic Indian Restaurant in Pune",
  description:
    "Experience the rich flavours of traditional Indian dining in Pune. From buttery curries to fragrant biryanis, enjoy fresh flavours with fast delivery and seamless online table inquiries.",
  keywords: [
    "Spice Garden",
    "Indian Restaurant Pune",
    "Biryani Pune",
    "North Indian Food",
    "Vegetarian Thali",
    "Pune food delivery",
  ],
  authors: [{ name: "Spice Garden" }],
  openGraph: {
    title: "Spice Garden | Authentic Indian Restaurant in Pune",
    description:
      "Authentic home-style Indian cuisine crafted with aromatic spices in Pune. Chat with our AI assistant for menus, delivery info, and reservations.",
    url: "https://spicegarden-demo.vercel.app",
    siteName: "Spice Garden",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spice Garden | Pune Indian Restaurant",
    description: "Authentic Indian cuisine & AI-powered assistant in Pune.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FFFDF9] text-gray-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
