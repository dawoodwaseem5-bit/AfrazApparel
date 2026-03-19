import OurTeam from "@/components/OurTeam";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "About Us | AfrazApparel",
  description:
    "Meet the team behind Afraz Apparel — the people driving 30 years of craftsmanship, quality, and global manufacturing excellence.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <OurTeam />
      </main>
    </>
  );
}
