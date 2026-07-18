export type ProductCollection = "men" | "ladies" | "boys" | "girls";

export type Product = {
  id: string;
  styleNo: string;
  name: string;
  collection: ProductCollection;
  sizes?: string;
  fabric?: string;
  composition?: string;
  images: string[];
};

export const collectionLabels: Record<ProductCollection, string> = {
  men: "Men's",
  ladies: "Ladies",
  boys: "Boys",
  girls: "Girls",
};
