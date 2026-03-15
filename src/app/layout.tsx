import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground selection:bg-accent selection:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
