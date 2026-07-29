"use client";

import { Download, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const phrases = [
  { text: "Elevating Fashion Through Meticulous Craft.", highlight: "Fashion" },
  { text: "Your end-to-end manufacturing partner.", highlight: "manufacturing" },
  { text: "Premium Apparel Manufacturing in the Heart of Karachi, Pakistan.", highlight: "Karachi" }
];

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charsShown, setCharsShown] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex].text;

    if (isDeleting) {
      if (charsShown > 0) {
        const timer = setTimeout(() => {
          setCharsShown(charsShown - 1);
        }, 25);
        return () => clearTimeout(timer);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    } else {
      if (charsShown < currentPhrase.length) {
        const timer = setTimeout(() => {
          setCharsShown(charsShown + 1);
        }, Math.random() * 50 + 40);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2500);
        return () => clearTimeout(timer);
      }
    }
  }, [charsShown, isDeleting, phraseIndex]);

  const renderTypedText = () => {
    const currentPhrase = phrases[phraseIndex];
    const typedText = currentPhrase.text.substring(0, charsShown);
    
    if (typedText.includes(currentPhrase.highlight)) {
      const parts = typedText.split(currentPhrase.highlight);
      return (
        <>
          {parts[0]}
          <span className="text-accent">{currentPhrase.highlight}</span>
          {parts[1]}
        </>
      );
    } else {
      const highlightStart = currentPhrase.text.indexOf(currentPhrase.highlight);
      if (charsShown > highlightStart) {
        const beforeHighlight = typedText.substring(0, highlightStart);
        const partialHighlight = typedText.substring(highlightStart);
        return (
          <>
            {beforeHighlight}
            <span className="text-accent">{partialHighlight}</span>
          </>
        );
      }
    }
    return typedText;
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#050505] isolation-isolate">
      {/* Full-screen Video Background */}
      <video 
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay 
        muted 
        loop 
        playsInline 
        poster="/factory-floor.jpg"
        aria-hidden="true"
      >
        <source src="/factory-floor.mp4" type="video/mp4" />
      </video>

      {/* Dark Scrim / Overlay for text readability */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black/90 via-black/70 to-black/60 sm:bg-[linear-gradient(90deg,rgba(5,5,5,.9),rgba(5,5,5,.72)_34%,rgba(5,5,5,.4)_66%,rgba(5,5,5,.58))]"></div>
      <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(0deg,rgba(5,5,5,.92),rgba(5,5,5,.3)_30%,rgba(5,5,5,0)_55%)]"></div>
      
      {/* Decorative Threads/Glow overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(120deg,rgba(255,87,34,.14),rgba(255,87,34,0)_42%)]"></div>
      
      {/* Content Container */}
      <div className="container mx-auto px-6 md:px-12 relative z-20 flex flex-col justify-center min-h-[calc(100vh-140px)]">
        <div className="max-w-[820px]">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 font-playfair text-[13px] font-semibold tracking-[0.3em] uppercase text-[#FF7A45] mb-5">
            <span className="relative w-10 h-px bg-accent">
              <span className="absolute inset-0 bg-[repeating-linear-gradient(90deg,var(--color-accent)_0_6px,transparent_6px_11px)]"></span>
            </span>
            Premium Garment Production
          </div>
          
          {/* Screen Reader Only SEO H1 */}
          <h1 className="sr-only">Premium Garment Manufacturing in Karachi - AfrazApparel</h1>

          {/* Headline Container with Typing Effect */}
          <div className="relative w-full mb-6 mt-5">
            {/* Ghost element to reserve space - use the longest phrase */}
            <h2 className="text-[clamp(2.5rem,5.4vw,4.6rem)] font-playfair font-bold text-white opacity-0 pointer-events-none leading-[1.05] select-none text-balance drop-shadow-2xl" aria-hidden="true">
              {phrases[2].text}
            </h2>
            
            {/* Visible typing text positioned over the ghost */}
            <h2 className="text-[clamp(2.5rem,5.4vw,4.6rem)] font-playfair font-bold text-white leading-[1.05] absolute top-0 left-0 w-full h-full text-balance drop-shadow-2xl" aria-hidden="true">
              {renderTypedText()}
              <span className={`inline-block w-[3px] h-[0.9em] bg-accent ml-2 align-baseline ${(!isDeleting && charsShown === phrases[phraseIndex].text.length) ? 'animate-pulse' : ''}`}></span>
            </h2>
          </div>
          
          {/* Subheading */}
          <p className="text-[clamp(1rem,1.4vw,1.16rem)] text-white/75 max-w-[54ch] leading-[1.6] mt-6">
            AfrazApparel is a world-class manufacturing partner for global brands. 
            We blend tradition with cutting-edge technology to produce sustainable, high-quality garments.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-9">
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2.5 font-sans font-semibold text-base px-6 py-4 rounded-xl cursor-pointer text-white bg-gradient-to-b from-accent to-[#E64A19] shadow-[0_8px_22px_-10px_rgba(255,87,34,.6)] hover:-translate-y-1 hover:shadow-[0_16px_34px_-10px_rgba(255,87,34,.62),0_0_44px_rgba(255,87,34,.4)] transition-all duration-350"
            >
              Get a Quote
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
            
            <a 
              href="/api/download-profile"
              download="AfrazApparel-Profile-2025.pdf"
              className="inline-flex items-center gap-2.5 font-sans font-semibold text-base px-6 py-4 rounded-xl cursor-pointer text-white bg-white/5 border border-white/30 backdrop-blur-md hover:-translate-y-1 hover:bg-accent/10 hover:border-accent transition-all duration-350"
            >
              Download Profile
              <Download size={18} />
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-10 pt-6 border-t border-white/15 w-full">
            <span className="inline-flex items-center gap-2.5 text-[13.5px] font-medium text-white/75">
              <CheckCircle2 className="text-accent flex-none" size={16} />
              Sustainable Materials
            </span>
            <span className="inline-flex items-center gap-2.5 text-[13.5px] font-medium text-white/75">
              <CheckCircle2 className="text-accent flex-none" size={16} />
              Ethical Production
            </span>
            <span className="inline-flex items-center gap-2.5 text-[13.5px] font-medium text-white/75">
              <CheckCircle2 className="text-accent flex-none" size={16} />
              Global Shipping
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

