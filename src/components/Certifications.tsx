import Image from "next/image";

const certifications = [
  "C-TPAT.png",
  "bettercotton.png",
  "bsci.png",
  "grs.png",
  "icc.png",
  "oeko.png",
  "eobi.png",
  "essi.png",
  "fbr.png",
  "kcci.png",
];

export default function Certifications() {
  return (
    <section className="w-full py-12 bg-background border-y border-border overflow-hidden">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <span className="text-brand-600 dark:text-brand-400 font-bold tracking-widest uppercase text-sm">
          Trust &amp; Compliance
        </span>
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mt-4 mb-4">
          Our <span className="text-gradient">Certifications</span>
        </h2>
        <p className="text-muted-foreground dark:text-gray-400">
          Globally recognized standards that reflect our commitment to quality, ethics, and sustainability.
        </p>
      </div>

      <div className="relative flex w-full max-w-[100vw] overflow-hidden group">
        <div className="flex w-max animate-marquee pause-on-hover">
          {[...certifications, ...certifications, ...certifications].map((cert, index) => (
            <div
              key={`${cert}-${index}`}
              className="flex items-center justify-center mx-8 w-40 h-20 hover-lift transition-all duration-300"
            >
              <Image
                src={`/certifications/${cert}`}
                alt={`Certification ${cert.split('.')[0]}`}
                width={160}
                height={80}
                className="object-contain max-h-[80px] w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
