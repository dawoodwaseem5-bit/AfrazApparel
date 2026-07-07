import ProductShowcase from "@/components/ProductShowcase";

export const metadata = {
  title: "Articles | AfrazApparel",
  description:
    "Browse the Afraz Apparel Collection 2026 — knitted fashion garments including tee-shirts, hoodies, joggers, shorts and more for men, ladies, boys and girls.",
};

export default function ArticlesPage() {
  return (
    <main className="min-h-screen pt-24 w-full max-w-full overflow-x-hidden box-border">
      <ProductShowcase />
    </main>
  );
}
