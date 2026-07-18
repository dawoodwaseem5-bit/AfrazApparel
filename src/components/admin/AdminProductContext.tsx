"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { type Product, type ProductCollection } from "@/data/products";

type ProductContextType = {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Omit<Product, "id">>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProduct: (id: string) => Product | undefined;
  getCounts: () => Record<ProductCollection, number>;
  loading: boolean;
};

const ProductContext = createContext<ProductContextType | null>(null);

export function AdminProductProvider({ children }: { children: ReactNode }) {
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProductList(data);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = useCallback(async (product: Omit<Product, "id">) => {
    try {
      // Extract file IDs from image URLs (which look like /api/files/12345)
      const imageIds = product.images.map(url => url.split('/').pop());
      const payload = { ...product, imageIds };
      
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await fetchProducts(); // Refresh list to get proper DB IDs and formatted URLs
      } else {
        throw new Error("Failed to add product");
      }
    } catch (err) {
      console.error("Add product error:", err);
      throw err;
    }
  }, [fetchProducts]);

  const updateProduct = useCallback(
    async (id: string, updates: Partial<Omit<Product, "id">>) => {
      try {
        const payload: any = { ...updates };
        if (updates.images) {
          payload.imageIds = updates.images.map(url => url.split('/').pop());
          delete payload.images;
        }

        const res = await fetch(`/api/products/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          await fetchProducts();
        } else {
          throw new Error("Failed to update product");
        }
      } catch (err) {
        console.error("Update product error:", err);
        throw err;
      }
    },
    [fetchProducts]
  );

  const deleteProduct = useCallback(async (id: string) => {
    try {
      // Optimistic update
      setProductList(prev => prev.filter(p => p.id !== id));
      
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        // Revert if failed
        await fetchProducts();
        throw new Error("Failed to delete product");
      }
    } catch (err) {
      console.error("Delete product error:", err);
      throw err;
    }
  }, [fetchProducts]);

  const getProduct = useCallback(
    (id: string) => productList.find((p) => p.id === id),
    [productList]
  );

  const getCounts = useCallback(() => {
    const c: Record<ProductCollection, number> = { men: 0, ladies: 0, boys: 0, girls: 0 };
    for (const p of productList) {
      if (c[p.collection] !== undefined) {
        c[p.collection]++;
      }
    }
    return c;
  }, [productList]);

  return (
    <ProductContext.Provider
      value={{ products: productList, addProduct, updateProduct, deleteProduct, getProduct, getCounts, loading }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useAdminProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx)
    throw new Error("useAdminProducts must be used within AdminProductProvider");
  return ctx;
}
