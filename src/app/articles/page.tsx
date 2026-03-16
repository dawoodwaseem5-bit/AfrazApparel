import ArticleCategories from "@/components/ArticleCategories";

export const metadata = {
  title: "Articles | AfrazApparel",
  description:
    "Explore our apparel categories — shirts, trousers, hoodies, tank tops, sweatshirts, gym wear, and more.",
};

export default function ArticlesPage() {
  return (
    <main className="min-h-screen pt-24 w-full max-w-full overflow-x-hidden box-border">
      <ArticleCategories />
    </main>
  );
}
