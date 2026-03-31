'use client';

import { ArrowUpRight } from "lucide-react";
import ScrollExpandMedia from "./ui/scroll-expansion-hero";

export default function Gallery() {
  const items = [
    {
      id: 1,
      title: "Precision Stitching",
      category: "Manufacturing",
      size: "large", // spans 2 cols/rows
      color: "bg-brand-500/20",
    },
    {
      id: 2,
      title: "Sustainable Fabrics",
      category: "Materials",
      size: "medium",
      color: "bg-surface",
    },
    {
      id: 3,
      title: "Global Export",
      category: "Logistics",
      size: "medium",
      color: "bg-brand-100",
    },
    {
      id: 4,
      title: "Quality Control",
      category: "Inspection",
      size: "wide", // spans 2 cols
      color: "bg-muted",
    },
  ];

  const manufacturingImages = [
    {
      src: "/OurWorkImages/DetailMastery.png",
      title: "Detail Mastery.",
      date: "Apparel Manufacturing",
    },
    {
      src: "/OurWorkImages/stitching.png",
      title: "Precision Stitching.",
      date: "Quality Focus",
    },
    {
      src: "/OurWorkImages/sustainableFabric.png",
      title: "Sustainable Fabric.",
      date: "Eco Friendly",
    },
    {
      src: "/OurWorkImages/qualityAssurance.png",
      title: "Quality Assurance.",
      date: "Expert Craftsmanship",
    },
    {
      src: "/OurWorkImages/logistics.png",
      title: "Global Logistics.",
      date: "World Class Export",
    },
  ];

  return (
    <div id="our-work" className="w-full bg-background relative border-t border-border">
      <ScrollExpandMedia
        mediaItems={manufacturingImages}
        bgImageSrc="/OurWorkImages/DetailMastery.png"
        scrollToExpand="Scroll to Experience"
        textBlend={false}
      >
        <div className="w-full pt-16 md:pt-32 pb-24 relative z-10 border-t border-border mt-0 bg-background">
          <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 w-full">
              <div className="max-w-2xl">
                <span className="text-brand-600 font-bold tracking-widest uppercase text-sm">Capabilities</span>
                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mt-4 mb-4">
                  World-class Facility.
                </h2>
                <p className="text-muted-foreground text-lg">
                  Take a closer look at our world-class manufacturing facility and the premium garments we create.
                </p>
              </div>
              <a href="#contact" className="inline-flex items-center gap-2 font-semibold text-accent hover:text-brand-700 transition-colors group">
                Start Your Project <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px] w-full">
              {/* Large Item */}
              <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl bg-muted border border-border h-[400px] md:h-auto w-full">
                <div className={`absolute inset-0 ${items[0].color} transition-transform duration-700 group-hover:scale-105 flex items-center justify-center w-full`}>
                   <span className="text-muted-foreground/30 font-bold text-4xl rotate-12 select-none">IMAGE PLACEHOLDER</span>
                   <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10 w-full" />
                </div>
                <div className="absolute bottom-0 left-0 p-8 w-full z-20">
                  <span className="px-3 py-1 bg-background/60 backdrop-blur-md rounded-full text-xs font-semibold text-foreground mb-4 inline-block border border-border shadow-sm">
                    {items[0].category}
                  </span>
                  <h3 className="text-3xl font-playfair font-bold text-foreground group-hover:text-accent transition-colors">{items[0].title}</h3>
                </div>
              </div>

              {/* Medium Item 1 */}
              <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-2xl bg-muted border border-border h-[300px] md:h-auto w-full">
                <div className={`absolute inset-0 ${items[1].color} transition-transform duration-700 group-hover:scale-105 flex items-center justify-center w-full`}>
                   <span className="text-muted-foreground/20 font-bold text-xl rotate-12 select-none">PLACEHOLDER</span>
                   <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent z-10 w-full" />
                </div>
                <div className="absolute bottom-0 left-0 p-6 w-full z-20">
                  <span className="px-3 py-1 bg-background/60 backdrop-blur-md rounded-full text-xs font-semibold text-foreground mb-3 inline-block border border-border shadow-sm">
                    {items[1].category}
                  </span>
                  <h3 className="text-xl font-playfair font-bold text-foreground group-hover:text-accent transition-colors">{items[1].title}</h3>
                </div>
              </div>

              {/* Medium Item 2 */}
              <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-2xl bg-muted border border-border h-[300px] md:h-auto w-full">
                <div className={`absolute inset-0 ${items[2].color} transition-transform duration-700 group-hover:scale-105 flex items-center justify-center w-full`}>
                   <span className="text-muted-foreground/20 font-bold text-xl rotate-12 select-none">PLACEHOLDER</span>
                   <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent z-10 w-full" />
                </div>
                <div className="absolute bottom-0 left-0 p-6 w-full z-20">
                  <span className="px-3 py-1 bg-background/60 backdrop-blur-md rounded-full text-xs font-semibold text-foreground mb-3 inline-block border border-border shadow-sm">
                    {items[2].category}
                  </span>
                  <h3 className="text-xl font-playfair font-bold text-foreground group-hover:text-accent transition-colors">{items[2].title}</h3>
                </div>
              </div>

              {/* Wide Item */}
              <div className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-2xl bg-muted border border-border h-[300px] md:h-auto w-full">
                <div className={`absolute inset-0 ${items[3].color} transition-transform duration-700 group-hover:scale-105 flex items-center justify-center w-full`}>
                   <span className="text-muted-foreground/20 font-bold text-2xl rotate-12 select-none">PLACEHOLDER</span>
                   <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent z-10 w-full" />
                </div>
                <div className="absolute bottom-0 left-0 p-6 w-full z-20">
                  <span className="px-3 py-1 bg-background/60 backdrop-blur-md rounded-full text-xs font-semibold text-foreground mb-3 inline-block border border-border shadow-sm">
                    {items[3].category}
                  </span>
                  <h3 className="text-2xl font-playfair font-bold text-foreground group-hover:text-accent transition-colors">{items[3].title}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollExpandMedia>
    </div>
  );
}
