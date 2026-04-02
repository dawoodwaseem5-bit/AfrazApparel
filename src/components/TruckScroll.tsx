'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TruckScroll() {
  const [isDispatched, setIsDispatched] = useState(false);

  return (
    <section 
      className="w-full py-16 relative overflow-hidden bg-background border-t border-b border-border mb-12"
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center mb-8">
        <span className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-2">Logistics</span>
        
        <h2 
          onClick={() => setIsDispatched(true)}
          className={`text-3xl md:text-5xl font-playfair font-bold text-center cursor-pointer select-none transition-all duration-300 ${isDispatched ? 'text-foreground' : 'text-brand-600 hover:text-accent underline decoration-accent/30 decoration-4 underline-offset-8'}`}
        >
          {isDispatched ? (
            <>Order <span className="text-gradient">Dispatched!</span></>
          ) : (
            "Click to Dispatch"
          )}
        </h2>
        
        <p className="text-muted-foreground mt-4 text-center max-w-2xl">
          We ensure your customized containers find their destination with enterprise-level tracking and reliable global delivery logistics.
        </p>
      </div>
      
      <div className="w-full h-48 md:h-64 lg:h-80 relative border-b-4 border-dashed border-accent/60 bg-muted/20 overflow-hidden mt-8 md:mt-12">
        <motion.div 
          className="absolute -bottom-8 md:-bottom-16 lg:-bottom-24 left-0 z-20 flex justify-center w-max will-change-transform transform-gpu"
          initial={{ x: "-100%" }}
          animate={{ 
            x: isDispatched ? "100vw" : "15vw",
            y: [0, -4, 0] 
          }}
          transition={{ 
            x: { duration: isDispatched ? 3.5 : 1.2, ease: isDispatched ? "easeIn" : "easeOut" },
            y: { repeat: Infinity, duration: 0.4, ease: "easeInOut" } 
          }}
        >
          {/* Indicator Arrow */}
          {!isDispatched && (
            <motion.div 
              className="absolute -top-16 md:-top-24 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-30 pointer-events-none"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <div className="bg-background/95 backdrop-blur-sm px-4 py-2 rounded-2xl border-2 border-accent shadow-xl shadow-accent/20 flex flex-col items-center gap-1 animate-bounce">
                <span className="text-sm md:text-base font-bold text-accent whitespace-nowrap">
                  Click here to dispatch!
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                   <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
              </div>
            </motion.div>
          )}

          {/* Mirror the truck horizontally so it faces right while driving right */}
          <div className="relative -scale-x-100 translate-y-[15%] transform-gpu">
            <Image 
              src="/truck.png"
              alt="Dispatch Container Truck"
              width={800}
              height={450}
              className="w-[280px] md:w-[450px] lg:w-[600px] h-auto cursor-pointer drop-shadow-xl hover:brightness-110 transition-all"
              onClick={() => setIsDispatched(true)}
              title="Click me to dispatch!"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
