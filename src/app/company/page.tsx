import CompanySection from "@/components/CompanySection";
import CompanyTimeline from "@/components/CompanyTimeline";

export const metadata = {
  title: "Company | AfrazApparel",
  description:
    "Afraz Apparel at a glance — manufacturer and exporter, capacity, and key company information.",
};

export default function CompanyPage() {
  return (
    <main className="min-h-screen pt-24">
      <CompanySection />
      <CompanyTimeline />
    </main>
  );
}
