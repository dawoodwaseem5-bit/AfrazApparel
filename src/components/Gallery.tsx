'use client';

import ScrollExpandMedia from "./ui/scroll-expansion-hero";

export default function Gallery() {
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
      />
    </div>
  );
}
