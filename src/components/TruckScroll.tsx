'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function TruckScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Moves from left to right across the screen using viewport widths
  const x = useTransform(scrollYProgress, [0, 1], ["-100vw", "100vw"]);

  return (
    <section 
      ref={containerRef} 
      className="w-full py-16 relative overflow-hidden bg-background border-t border-b border-border mb-12"
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center mb-8">
        <span className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-2">Logistics</span>
        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-foreground text-center">
          Order <span className="text-gradient">Dispatched</span>
        </h2>
        <p className="text-muted-foreground mt-4 text-center max-w-2xl">
          We ensure your customized containers find their destination with enterprise-level tracking and reliable global delivery logistics.
        </p>
      </div>
      
      <div className="w-full h-48 md:h-64 lg:h-80 relative border-b-4 border-dashed border-accent/60 bg-muted/20">
        <motion.div 
          className="absolute -bottom-8 md:-bottom-16 lg:-bottom-24 z-20 flex justify-center w-full"
          style={{ x }}
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
        >
          {/* Mirror the truck horizontally so it faces right while driving right */}
          <div className="relative -scale-x-100 drop-shadow-xl translate-y-[15%]">
            <Image 
              src="/truck.png"
              alt="Dispatch Container Truck"
              width={800}
              height={450}
              className="w-[280px] md:w-[450px] lg:w-[600px] h-auto"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
