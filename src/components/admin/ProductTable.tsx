"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search, Pencil, Trash2, Eye } from "lucide-react";
import { useAdminProducts } from "./AdminProductContext";
import { collectionLabels, type ProductCollection } from "@/data/products";
import DeleteModal from "./DeleteModal";

const collections: (ProductCollection | "all")[] = [
  "all",
  "men",
  "ladies",
  "boys",
  "girls",
];

type ProductTableProps = {
  onEdit: (id: string) => void;
};

export default function ProductTable({ onEdit }: ProductTableProps) {
  const { products, deleteProduct, getCounts } = useAdminProducts();
  const [search, setSearch] = useState("");
  const [activeCollection, setActiveCollection] = useState<
    ProductCollection | "all"
  >("all");
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const counts = getCounts();
  const totalCount = products.length;

  const filtered = useMemo(() => {
    let list = products;
    if (activeCollection !== "all") {
      list = list.filter((p) => p.collection === activeCollection);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.styleNo.toLowerCase().includes(q) ||
          (p.fabric && p.fabric.toLowerCase().includes(q))
      );
    }
    return list;
  }, [products, activeCollection, search]);

  const handleDelete = () => {
    if (deleteTarget) {
      deleteProduct(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Product Catalog</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {totalCount} products across all collections
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#f58025]/50 focus:ring-1 focus:ring-[#f58025]/30 transition-all"
          />
        </div>
      </div>

      {/* Collection Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {collections.map((c) => {
          const isActive = activeCollection === c;
          const label = c === "all" ? "All" : collectionLabels[c];
          const count = c === "all" ? totalCount : counts[c];
          return (
            <button
              key={c}
              onClick={() => setActiveCollection(c)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                isActive
                  ? "bg-[#f58025]/15 text-[#f58025] border-[#f58025]/30"
                  : "bg-white dark:bg-white/[0.02] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/[0.12] hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              {label}
              <span
                className={`ml-1.5 ${
                  isActive ? "text-[#f58025]/70" : "text-gray-600"
                }`}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#0f1117]/60 border border-gray-200 dark:border-white/[0.06] rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[56px_1fr_100px_100px_1fr_100px_90px] gap-4 px-5 py-3 border-b border-gray-200 dark:border-white/[0.06] text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <span>Image</span>
          <span>Product Name</span>
          <span>Style</span>
          <span>Collection</span>
          <span>Fabric</span>
          <span>Sizes</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100 dark:divide-white/[0.04]">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-5 py-12 text-center text-gray-500 text-sm"
              >
                No products found
              </motion.div>
            ) : (
              filtered.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-[56px_1fr_100px_100px_1fr_100px_90px] gap-3 md:gap-4 px-5 py-3.5 items-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group"
                >
                  {/* Mobile label: hidden on desktop */}
                  {/* Image */}
                  <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gray-100 dark:bg-[#1a1c24] border border-gray-200 dark:border-white/[0.06] overflow-hidden shrink-0 cursor-pointer group/img"
                    onClick={() => setPreviewImage(product.images[0])}
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-contain p-1"
                      sizes="56px"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <Eye className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>

                  {/* Name */}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {product.name}
                    </p>
                    {product.composition && (
                      <p className="text-xs text-gray-500 truncate mt-0.5 md:hidden lg:block">
                        {product.composition}
                      </p>
                    )}
                  </div>

                  {/* Style */}
                  <span className="text-xs text-gray-400 font-mono">
                    {product.styleNo}
                  </span>

                  {/* Collection */}
                  <span className="inline-flex items-center">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                        product.collection === "men"
                          ? "bg-blue-500/10 text-blue-400"
                          : product.collection === "ladies"
                          ? "bg-pink-500/10 text-pink-400"
                          : product.collection === "boys"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-purple-500/10 text-purple-400"
                      }`}
                    >
                      {collectionLabels[product.collection]}
                    </span>
                  </span>

                  {/* Fabric */}
                  <span className="text-xs text-gray-400 truncate">
                    {product.fabric || "—"}
                  </span>

                  {/* Sizes */}
                  <span className="text-xs text-gray-400">
                    {product.sizes || "—"}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onEdit(product.id)}
                      className="p-2 rounded-lg text-gray-500 hover:text-[#f58025] hover:bg-[#f58025]/10 transition-all"
                      title="Edit product"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setDeleteTarget({
                          id: product.id,
                          name: product.name,
                        })
                      }
                      className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      title="Delete product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-200 dark:border-white/[0.06] text-xs text-gray-500">
          Showing {filtered.length} of {totalCount} products
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteTarget}
        productName={deleteTarget?.name || ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Image Preview Overlay */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-md aspect-square"
            >
              <Image
                src={previewImage}
                alt="Product preview"
                fill
                className="object-contain"
                sizes="400px"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
