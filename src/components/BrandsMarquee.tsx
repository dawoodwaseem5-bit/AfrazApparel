import Image from "next/image";

const brands = [
  { name: "Everlast", src: "/Everlast_(brand)-Logo.wine.png", invert: true },
  { name: "Fila", src: "/Fila_(company)-Logo.wine.png", invert: true },
  { name: "Walmart", src: "/Walmart_Canada-Logo.wine.png", invert: true },
  { name: "Bench", src: "/bench-logo-png_seeklogo-240457.png", invert: true },
  { name: "Boston", src: "/boston.png", invert: false },
  { name: "Hello Kitty", src: "/png-transparent-hello-kitty.png", invert: true },
  { name: "Russell", src: "/russell-logo-png_seeklogo-460776.png", invert: true },
  { name: "Top Gun", src: "/top-gun-logo-png_seeklogo-365523.png", invert: true },
  { name: "Lee Cooper", src: "/idzGuHJ424_1773585563184.png", invert: true },
  { name: "Andre Hazes", src: "/Screenshot 2026-03-15 193335.png", invert: false },
  { name: "New Jersey", src: "/new-jersey.jpg", invert: false }
];

export default function BrandsMarquee() {
  return (
    <section className="w-full py-16 bg-accent border-y border-brand-700/30 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-8 text-center relative z-20">
        <h3 className="text-white font-playfair font-bold text-2xl md:text-3xl tracking-wide uppercase">Brands We've Worked With</h3>
        <div className="w-24 h-1 bg-white/30 mx-auto mt-4 rounded-full"></div>
      </div>
      
      {/* Gradients on the edges for a fading effect */}
      <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-accent to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-accent to-transparent z-10 pointer-events-none"></div>

      <div className="relative z-0 overflow-hidden whitespace-nowrap w-full">
        {/* We output the list twice to create a seamless infinite loop */}
        <div className="flex flex-row animate-marquee pause-on-hover gap-10 md:gap-20 px-6 items-center w-max">
          {[...brands, ...brands].map((brand, index) => (
            <div 
              key={index}
              className="relative flex-shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-110 cursor-default group"
              style={{ width: "160px", height: "100px" }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white flex items-center justify-center border border-gray-200 shadow-sm">
                  <Image 
                    src={brand.src} 
                    alt={`${brand.name} logo`}
                    fill
                    className="object-contain p-4 transition-all duration-300 opacity-80 group-hover:opacity-100 hover:scale-105"
                    sizes="160px"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
