import { Layers, Zap, Globe, Leaf } from "lucide-react";

const services = [
  {
    title: "Bespoke Production",
    description: "Custom apparel manufacturing tailored to your exact specifications. From luxury wear to daily essentials, our craftsmanship ensures perfection in every stitch.",
    icon: <Layers size={32} className="text-accent" />,
  },
  {
    title: "Rapid Prototyping",
    description: "Accelerated sample development and rapid adjustments to get your vision ready for production faster without compromising quality.",
    icon: <Zap size={32} className="text-accent" />,
  },
  {
    title: "Global Supply Chain",
    description: "Seamless logistics, shipping, and supply chain management. We deliver your goods globally with transparent timeline tracking.",
    icon: <Globe size={32} className="text-accent" />,
  },
  {
    title: "Sustainable Practices",
    description: "Ethically sourced materials and environmentally conscious manufacturing processes to support the future of eco-friendly fashion.",
    icon: <Leaf size={32} className="text-accent" />,
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full py-24 bg-background relative border-t border-border">
      <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-brand-50/50 blur-[120px] rounded-full pointer-events-none opacity-50"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-600 font-bold tracking-widest uppercase text-sm">Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mt-4 mb-6">
            Manufacturing <span className="text-gradient">Excellence</span>
          </h2>
          <p className="text-muted-foreground">
            End-to-end garment production solutions designed for modern fashion brands seeking reliability, scale, and uncompromising quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-surface p-8 rounded-2xl shadow-lg hover-lift border border-border group transition-all duration-300 hover:border-accent/40 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-300 via-accent to-brand-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6 border border-border group-hover:bg-accent/10 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-playfair">{service.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed transition-colors">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center justify-center p-12 bg-muted rounded-3xl text-center relative overflow-hidden shadow-2xl border-t-2 border-accent">
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
