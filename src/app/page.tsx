import Hero from "@/components/Hero";
import Certifications from "@/components/Certifications";
import BrandsMarquee from "@/components/BrandsMarquee";
import Services from "@/components/Services";
import ContactSection from "@/components/ContactSection";
import Gallery from "@/components/Gallery";
import CallToAction from "@/components/CallToAction";
import TruckScroll from "@/components/TruckScroll";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Certifications />
      <TruckScroll />
      <BrandsMarquee />
      <CallToAction />
      <Gallery />
      <Services />
      <ContactSection />
    </main>
  );
}
