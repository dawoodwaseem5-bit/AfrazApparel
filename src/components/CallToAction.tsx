import React from 'react';

export default function CallToAction() {
  return (
    <section className="w-full py-12 md:py-24 bg-background relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center justify-center p-12 bg-muted rounded-3xl text-center relative overflow-hidden shadow-2xl border-t-2 border-accent">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/20 blur-[80px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 blur-[80px] rounded-full"></div>
          
          <div className="relative z-10">
             <h3 className="text-3xl font-playfair font-bold text-foreground dark:text-white mb-4">Ready to start your production run?</h3>
             <p className="text-muted-foreground dark:text-gray-300 max-w-xl mx-auto mb-8">
               Partner with AfrazApparel to bring your fashion designs to life with enterprise-level precision.
             </p>
             <a href="#contact" className="px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-black dark:hover:bg-accent/80 transition-colors duration-300 shadow-lg shadow-accent/20">
               Discuss Your Project
             </a>
          </div>
        </div>
      </div>
    </section>
  );
}
