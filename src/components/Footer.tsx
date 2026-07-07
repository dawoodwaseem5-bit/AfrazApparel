import Link from "next/link";
import { Download, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#2B2B2B] dark:bg-black pt-16 pb-8 border-t-4 border-accent">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 transition-transform group-hover:scale-105 bg-white dark:bg-transparent rounded-md p-1">
                  <img src="/logo.png" alt="AfrazApparel Logo" className="object-contain w-full h-full" />
                </div>
                <span className="font-playfair text-xl font-semibold tracking-wide text-white">
                  Afraz<span className="text-accent">Apparel</span>
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Manufacturer &amp; exporter of knitted fashion garments, based in Karachi, Pakistan. Setting the standard for premium, sustainable garment manufacturing worldwide.
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
              <li><Link href="/about" className="text-gray-400 text-sm hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/company" className="text-gray-400 text-sm hover:text-accent transition-colors">Company Profile</Link></li>
              <li><Link href="/certifications" className="text-gray-400 text-sm hover:text-accent transition-colors">Certifications</Link></li>
              <li><Link href="/articles" className="text-gray-400 text-sm hover:text-accent transition-colors">Articles</Link></li>
              <li><a href="/#contact" className="text-gray-400 text-sm hover:text-accent transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-3">
              <li><a href="/#services" className="text-gray-400 text-sm hover:text-accent transition-colors">Our Services</a></li>
              <li><a href="/#our-work" className="text-gray-400 text-sm hover:text-accent transition-colors">Our Work</a></li>
              <li>
                <a href="/api/download-profile" download="AfrazApparel-Profile-2025.pdf" className="inline-flex items-center gap-1.5 text-gray-400 text-sm hover:text-accent transition-colors">
                  Download Profile <Download size={13} />
                </a>
              </li>
              <li>
                <a href="/AFRAZ_CATALOG_2026.pdf" download="AfrazApparel-Catalog-2026.pdf" className="inline-flex items-center gap-1.5 text-gray-400 text-sm hover:text-accent transition-colors">
                  Download Catalog <Download size={13} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  Plot No. B-555 Sector 35/A,<br />Zaman Town Korangi No 4,<br />Karachi, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-accent shrink-0" />
                <a href="tel:+923161006716" className="text-gray-400 text-sm hover:text-accent transition-colors">+92 316 1006716</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-accent shrink-0" />
                <a href="mailto:production@afrazapparel.com" className="text-gray-400 text-sm hover:text-accent transition-colors break-all">production@afrazapparel.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-accent shrink-0" />
                <a href="mailto:partnerships@afrazapparel.com" className="text-gray-400 text-sm hover:text-accent transition-colors break-all">partnerships@afrazapparel.com</a>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="pt-8 border-t border-accent flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} AfrazApparel Manufacturing. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            Manufacturer &amp; Exporter of Knitted Fashion Garments
          </p>
        </div>
      </div>
    </footer>
  );
}
