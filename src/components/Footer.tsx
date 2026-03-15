import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#2B2B2B] dark:bg-black pt-16 pb-8 border-t-4 border-accent">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 lg:col-span-1">
            <a href="#" className="flex items-center gap-3 mb-6 group inline-block">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 transition-transform group-hover:scale-105 bg-white dark:bg-transparent rounded-md p-1">
                  <img src="/logo.png" alt="AfrazApparel Logo" className="object-contain w-full h-full" />
                </div>
                <span className="font-playfair text-xl font-semibold tracking-wide text-white">
                  Afraz<span className="text-accent">Apparel</span>
                </span>
                </div>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Setting the standard for premium, sustainable garment manufacturing worldwide. Crafting excellence since 1995.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/afraz_apparel/?utm_source=ig_web_button_share_sheet" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-accent transition-colors flex-shrink-0"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/company/afraz-apparel/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-accent transition-colors flex-shrink-0"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 text-sm hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-accent transition-colors">Our Facilities</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-accent transition-colors">Sustainability Report</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-accent transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-accent transition-colors">Client Testimonials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 text-sm hover:text-accent transition-colors">Bespoke Production</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-accent transition-colors">Pattern Making</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-accent transition-colors">Fabric Sourcing</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-accent transition-colors">Quality Control</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-accent transition-colors">Logistics & Shipping</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for industry insights and company updates.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-accent w-full"
              />
              <button 
                type="button" 
                className="bg-accent text-white px-4 py-2 rounded-r-lg text-sm font-bold hover:bg-brand-600 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
          
        </div>

        <div className="pt-8 border-t border-accent flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} AfrazApparel Manufacturing. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 text-xs hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 text-xs hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 text-xs hover:text-accent transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
