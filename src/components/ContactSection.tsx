import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="w-full py-24 relative overflow-hidden bg-gray-50 border-t border-gray-200">
      <div className="absolute left-0 bottom-0 w-1/2 h-full bg-brand-100/30 blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Contact Details */}
          <div className="w-full lg:w-5/12">
            <span className="text-brand-600 font-bold tracking-widest uppercase text-sm">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-black mt-4 mb-6">
              Let's Build <br /> Together.
            </h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
              Whether you need to scale production, source sustainable materials, or develop a premium clothing line from scratch, our team is ready to assist you.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-600 shrink-0 border border-gray-100">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-black font-bold mb-1">Headquarters & Factory</h4>
                  <p className="text-gray-600 text-sm">PLOT NO. B-555 SECTOR 35/A<br/>ZAMAN TOWN KORANGI NO 4<br/>KARACHI - PAKISTAN</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-600 shrink-0 border border-gray-100">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-black font-bold mb-1">Call Us</h4>
                  <p className="text-gray-600 text-sm">+92 316 1006716<br/>Mon-Sat, 9am - 6pm PKT</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-600 shrink-0 border border-gray-100">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-black font-bold mb-1">Email inquiries</h4>
                  <p className="text-gray-600 text-sm">info@afrazapparel.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/50">
              <h3 className="text-2xl font-playfair font-bold text-black mb-6">Send us a message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                    placeholder="john@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Project Details</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
                    placeholder="Tell us about your production needs, quantities, and timelines..."
                  ></textarea>
                </div>

                <button 
                  type="button"
                  className="w-full bg-black text-white font-bold py-4 rounded-lg hover:bg-accent hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 mt-4"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
