"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [charsShown, setCharsShown] = useState(0);
  const text1 = "Elevating ";
  const text2 = "Fashion";
  const text3 = " Through ";
  const text4 = "Meticulous Craft.";
  
  const len1 = text1.length;
  const len2 = text2.length;
  const len3 = text3.length;
  const len4 = text4.length;
  const totalChars = len1 + len2 + len3 + len4;

  useEffect(() => {
    if (charsShown < totalChars) {
      const timer = setTimeout(() => {
        setCharsShown(charsShown + 1);
      }, Math.random() * 50 + 40); // Random typing speed
      return () => clearTimeout(timer);
    }
  }, [charsShown, totalChars]);

  return (
    <section className="relative w-full min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-white">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 z-10"></div>
        {/* We use a placeholder pattern here to simulate an image bg without an actual image */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/60 via-transparent to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02]">
          <h1 className="font-playfair text-[20vw] font-bold text-black whitespace-nowrap select-none">AFRAZ</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-20 flex flex-col md:flex-row items-center gap-12 mt-10 md:mt-0">
        <div className="w-full md:w-3/5 flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-200 bg-brand-50 shadow-sm backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-xs font-medium text-brand-800 uppercase tracking-wider">Premium Garment Production</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-black leading-[1.1] relative">
            {/* Invisible placeholder to prevent layout shifts */}
            <div className="invisible pointer-events-none" aria-hidden="true">
              Elevating <br />
              <span className="text-gradient">Fashion</span> Through <br />
              Meticulous Craft.
              <span className="inline-block w-[0.1em] h-[1em] ml-2"></span>
            </div>
            {/* Visible typing text */}
            <div className="absolute top-0 left-0 w-full h-full z-10">
              {charsShown > 0 && <span>{text1.substring(0, charsShown)}</span>}
              {charsShown >= len1 && <br />}
              
              {charsShown > len1 && (
                <span className="text-gradient">
                  {text2.substring(0, charsShown - len1)}
                </span>
              )}
              
              {charsShown > len1 + len2 && (
                <span>{text3.substring(0, charsShown - len1 - len2)}</span>
              )}
              {charsShown >= len1 + len2 + len3 && <br />}
              
              {charsShown > len1 + len2 + len3 && (
                <span>{text4.substring(0, charsShown - len1 - len2 - len3)}</span>
              )}
              <span className={`inline-block w-[3px] h-[0.9em] bg-accent ml-1 align-baseline ${charsShown === totalChars ? 'animate-pulse' : ''}`}></span>
            </div>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
            AfrazApparel is a world-class manufacturing partner for global brands. 
            We blend tradition with cutting-edge technology to produce sustainable, high-quality garments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <a 
              href="#services" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-black transition-colors duration-300 hover-lift shadow-lg shadow-accent/20"
            >
              Explore Services <ArrowRight size={18} />
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-black text-black font-semibold rounded-full hover:bg-gray-50 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-gray-200 w-full">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-accent" size={20} />
              <span className="text-sm text-gray-600 font-medium">Sustainable Materials</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-accent" size={20} />
              <span className="text-sm text-gray-600 font-medium">Ethical Production</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-accent" size={20} />
              <span className="text-sm text-gray-600 font-medium">Global Shipping</span>
            </div>
          </div>
        </div>

        {/* Hero Image/Visual Area */}
        <div className="w-full md:w-2/5 relative">
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-white p-2 shadow-2xl shadow-gray-200/50 hover-lift group border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-100 to-transparent opacity-50 z-10 transition-opacity group-hover:opacity-100"></div>
            {/* Visual element representing precision/clothing since no actual image provided */}
            <div className="w-full h-full bg-gray-50 rounded-2xl flex items-center justify-center relative overflow-hidden border border-gray-200">
              <div className="absolute w-64 h-64 bg-accent/20 rounded-full blur-3xl -top-10 -right-10"></div>
              <div className="absolute w-64 h-64 bg-black/5 rounded-full blur-3xl -bottom-10 -left-10"></div>
              
              <div className="text-center z-20">
                <div className="w-24 h-24 mx-auto border border-gray-200 rounded-full flex items-center justify-center mb-6 p-2 bg-white shadow-sm">
                  <img src="/logo.png" alt="AfrazApparel Mastery" className="w-16 h-16 object-contain" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-black mb-2">Since 1995</h3>
                <p className="text-sm text-brand-600 font-semibold tracking-widest uppercase">Mastery in Every Stitch</p>
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
