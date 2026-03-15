import Hero from "@/components/Hero";
import BrandsMarquee from "@/components/BrandsMarquee";
import Services from "@/components/Services";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <BrandsMarquee />
      <Services />
      <ContactSection />
    </main>
  );
}
