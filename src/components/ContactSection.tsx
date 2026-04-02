"use client";

import { MapPin, Phone, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("First Name"),
      lastName: formData.get("Last Name"),
      email: formData.get("email"),
      projectDetails: formData.get("Project Details"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry. Please try again.");
      }

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000); // Reset success after 5s
      (e.target as HTMLFormElement).reset();
    /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full pt-24 relative overflow-hidden bg-background border-t border-border">
      <div className="absolute left-0 bottom-0 w-1/2 h-full bg-brand-100/30 blur-[120px] pointer-events-none opacity-40"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Contact Details */}
          <div className="w-full lg:w-5/12">
            <span className="text-brand-600 font-bold tracking-widest uppercase text-sm">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mt-4 mb-6">
              Let's Build <br /> Together.
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Whether you need to scale production, source sustainable materials, or develop a premium clothing line from scratch, our team is ready to assist you.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full surface-card shadow-sm flex items-center justify-center text-brand-600 shrink-0 border border-border">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-foreground font-bold mb-1">Headquarters & Factory</h4>
                  <p className="text-muted-foreground text-sm">PLOT NO. B-555 SECTOR 35/A<br/>ZAMAN TOWN KORANGI NO 4<br/>KARACHI - PAKISTAN</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full surface-card shadow-sm flex items-center justify-center text-brand-600 shrink-0 border border-border">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-foreground font-bold mb-1">Call Us</h4>
                  <p className="text-muted-foreground text-sm">+1 (555) 123-4567<br/>Mon-Fri, 9am - 6pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full surface-card shadow-sm flex items-center justify-center text-brand-600 shrink-0 border border-border">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-foreground font-bold mb-1">Email inquiries</h4>
                  <p className="text-muted-foreground text-sm">production@afrazapparel.com<br/>partnerships@afrazapparel.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-7/12">
            <div className="surface-card p-8 md:p-10 rounded-2xl border border-border shadow-xl dark:shadow-none">
              <h3 className="text-2xl font-playfair font-bold text-foreground mb-6">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative">
                {isSuccess && (
                  <div className="absolute inset-0 z-20 bg-surface/90 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center border border-accent/20">
                    <CheckCircle2 className="w-16 h-16 text-accent mb-4 animate-bounce" />
                    <h4 className="text-xl font-bold text-foreground mb-2">Message Sent!</h4>
                    <p className="text-muted-foreground text-center px-6">We've received your inquiry and will be in touch shortly.</p>
                  </div>
                )}


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">First Name</label>
                    <input 
                      type="text" 
                      name="First Name"
                      required
                      className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all dark:placeholder-gray-600"
                      placeholder="Afraz"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">Last Name</label>
                    <input 
                      type="text" 
                      name="Last Name"
                      required
                      className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all dark:placeholder-gray-600"
                      placeholder="Apparel"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all dark:placeholder-gray-600"
                    placeholder="afrazapparel.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Project Details</label>
                  <textarea 
                    name="Project Details"
                    required
                    rows={4}
                    className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none dark:placeholder-gray-600"
                    placeholder="Tell us about your production needs, quantities, and timelines..."
                  ></textarea>
                </div>

                {error && <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm">{error}</div>}
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-foreground text-background font-bold py-4 rounded-lg hover:bg-accent hover:text-white transition-all duration-300 mt-4 shadow-lg hover:shadow-accent/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Submit Inquiry"
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>

      <div className="w-full h-1.5 bg-gradient-to-r from-accent/50 via-accent to-accent/50 mt-24 shadow-sm shadow-accent/20"></div>

      {/* Full Width Map Embed Location */}
      <div className="w-full h-[450px] md:h-[600px] relative overflow-hidden flex mt-0">
        {/* Subtle overlay for blending */}
        <div className="absolute inset-0 bg-accent/10 z-10 pointer-events-none opacity-50 block"></div>
        <iframe 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          style={{ border: 0, display: "block" }}
          src="https://maps.google.com/maps?q=R4MC%2BRGX%2C%20P%26T%20Society%20P%26T%20Chs%20Sector%2031%20D%20Korangi%2C%20Karachi%2C%20Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          allowFullScreen
          title="Afraz Apparel Headquarters Location"
          className="absolute inset-0 w-full h-full block dark:invert dark:hue-rotate-180 dark:contrast-75 dark:opacity-80 transition-all duration-700 pointer-events-auto"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
