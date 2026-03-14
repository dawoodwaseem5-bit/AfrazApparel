import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AfrazApparel | Premium Apparel Manufacturing",
  description:
    "AfrazApparel is a world-class apparel manufacturing company delivering premium quality, sustainable, and dynamic fashion solutions for global brands.",
  keywords: [
    "apparel",
    "manufacturing",
    "fashion",
    "garments",
    "clothing production",
    "AfrazApparel",
    "sustainable fashion",
  ],
  authors: [{ name: "AfrazApparel" }],
  openGraph: {
    title: "AfrazApparel | Premium Apparel Manufacturing",
    description:
      "World-class apparel manufacturing delivering premium quality fashion solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground selection:bg-accent selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
