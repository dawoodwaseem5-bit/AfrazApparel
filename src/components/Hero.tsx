"use client";

import { Download, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const phrases = [
  { text: "Elevating Fashion Through Meticulous Craft.", highlight: "Fashion" },
  { text: "Your end-to-end manufacturing partner.", highlight: "manufacturing" },
  { text: "Premium Apparel Manufacturing in the Heart of Karachi.", highlight: "Karachi." }
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
          <span className="text-gradient">{currentPhrase.highlight}</span>
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
            <span className="text-gradient">{partialHighlight}</span>
          </>
        );
      }
    }
    return typedText;
  };

  return (
    <section className="relative w-full min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-background">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-muted z-10 opacity-80"></div>
        {/* We use a placeholder pattern here to simulate an image bg without an actual image */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/60 via-transparent to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02]">
          <h1 className="font-playfair text-[20vw] font-bold text-foreground whitespace-nowrap select-none">AFRAZ</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-20 flex flex-col md:flex-row items-center gap-12 mt-10 md:mt-0">
        <div className="w-full md:w-3/5 flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-900/50 bg-brand-50 dark:bg-brand-950/30 shadow-sm backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-xs font-medium text-brand-800 dark:text-brand-300 uppercase tracking-wider">Premium Garment Production</span>
          </div>
          
          <div className="relative w-full">
            {/* Ghost element to reserve space - use the longest phrase */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold opacity-0 pointer-events-none leading-[1.2] select-none" aria-hidden="true">
              {phrases[2].text}
            </h1>
            
            {/* Visible typing text positioned over the ghost */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-black dark:text-white leading-[1.2] absolute top-0 left-0 w-full h-full">
              {renderTypedText()}
              <span className={`inline-block w-[3px] h-[0.9em] bg-accent ml-2 align-baseline ${(!isDeleting && charsShown === phrases[phraseIndex].text.length) ? 'animate-pulse' : ''}`}></span>
            </h1>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
            AfrazApparel is a world-class manufacturing partner for global brands. 
            We blend tradition with cutting-edge technology to produce sustainable, high-quality garments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <a 
              href="/api/download-profile"
              download="AfrazApparel-Profile-2025.pdf"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-black transition-colors duration-300 hover-lift shadow-lg shadow-accent/20"
            >
              Download Profile <Download size={18} />
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-surface border-2 border-foreground text-foreground font-semibold rounded-full hover:bg-muted transition-all duration-300"
            >
              Contact Us
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-gray-200 dark:border-white/10 w-full">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-accent" size={20} />
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Sustainable Materials</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-accent" size={20} />
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Ethical Production</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-accent" size={20} />
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Global Shipping</span>
            </div>
          </div>
        </div>

        {/* Hero Image/Visual Area */}
        <div className="w-full md:w-2/5 relative">
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-surface p-2 shadow-2xl hover-lift group border border-border">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-100 dark:from-brand-900/30 to-transparent opacity-50 z-10 transition-opacity group-hover:opacity-100"></div>
            {/* Visual element representing precision/clothing since no actual image provided */}
            <div className="w-full h-full bg-muted rounded-2xl flex items-center justify-center relative overflow-hidden border border-border">
              <div className="absolute w-64 h-64 bg-accent/20 rounded-full blur-3xl -top-10 -right-10"></div>
              <div className="absolute w-64 h-64 bg-foreground/5 rounded-full blur-3xl -bottom-10 -left-10"></div>
              
              <div className="text-center z-20">
                <div className="w-24 h-24 mx-auto border border-border rounded-full flex items-center justify-center mb-6 p-2 bg-surface shadow-sm">
                  <img src="/logo.png" alt="AfrazApparel Mastery" className="w-16 h-16 object-contain" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">Since 1995</h3>
                <p className="text-sm text-brand-600 dark:text-brand-400 font-semibold tracking-widest uppercase">Mastery in Every Stitch</p>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/10 rounded-full blur-2xl z-0"></div>
          <div className="absolute top-1/4 -right-4 w-20 h-20 border border-white/10 rounded-full z-0 flex items-center justify-center hidden md:flex">
             <div className="w-2 h-2 rounded-full bg-accent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
