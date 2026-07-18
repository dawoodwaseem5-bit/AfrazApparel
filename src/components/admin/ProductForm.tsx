"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Upload, X, ArrowLeft, Save, ImagePlus } from "lucide-react";
import { useAdminProducts } from "./AdminProductContext";
import {
  collectionLabels,
  type Product,
  type ProductCollection,
} from "@/data/products";

type ProductFormProps = {
  mode: "add" | "edit";
  productId?: string;
  onBack: () => void;
};

type FormData = {
  name: string;
  styleNo: string;
  collection: ProductCollection;
  sizes: string;
  fabric: string;
  composition: string;
  images: string[];
};

const emptyForm: FormData = {
  name: "",
  styleNo: "",
  collection: "men",
  sizes: "",
  fabric: "",
  composition: "",
  images: [],
};

export default function ProductForm({
  mode,
  productId,
  onBack,
}: ProductFormProps) {
  const { addProduct, updateProduct, getProduct } = useAdminProducts();
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing product data for edit mode
  useEffect(() => {
    if (mode === "edit" && productId) {
      const existing = getProduct(productId);
      if (existing) {
        setForm({
          name: existing.name,
          styleNo: existing.styleNo,
          collection: existing.collection,
          sizes: existing.sizes || "",
          fabric: existing.fabric || "",
          composition: existing.composition || "",
          images: [...existing.images],
        });
      }
    }
  }, [mode, productId, getProduct]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) newErrors.name = "Product name is required";
    if (!form.styleNo.trim()) newErrors.styleNo = "Style number is required";
    if (form.images.length === 0)
      newErrors.images = "At least one image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (uploading) return;

    setSaving(true);
    const productData: Omit<Product, "id"> = {
      name: form.name.trim(),
      styleNo: form.styleNo.trim(),
      collection: form.collection,
      images: form.images,
      ...(form.sizes.trim() && { sizes: form.sizes.trim() }),
      ...(form.fabric.trim() && { fabric: form.fabric.trim() }),
      ...(form.composition.trim() && { composition: form.composition.trim() }),
    };

    try {
      if (mode === "add") {
        await addProduct(productData);
      } else if (productId) {
        await updateProduct(productId, productData);
      }

      setSaved(true);
      setTimeout(() => {
        onBack();
      }, 800);
    } catch (err) {
      console.error("Save failed", err);
      // could set an error state here
    } finally {
      setSaving(false);
    }
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;
    setUploading(true);
    const newImages: string[] = [];
    
    for (const file of Array.from(files)) {
      if (file.type.startsWith("image/")) {
        try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          if (res.ok) {
            const data = await res.json();
            newImages.push(`/api/files/${data.fileId}`);
          }
        } catch (err) {
          console.error("Upload failed", err);
        }
      }
    }
    
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
    setErrors((prev) => ({ ...prev, images: undefined }));
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {mode === "add" ? "Add New Product" : "Edit Product"}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {mode === "add"
              ? "Fill in the details for the new product"
              : "Update the product information"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
            Product Images
          </label>

          {/* Drag and drop zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
              dragOver
                ? "border-[#f58025] bg-[#f58025]/5"
                : errors.images
                ? "border-red-500/40 bg-red-500/5"
                : "border-gray-200 dark:border-white/[0.08] hover:border-gray-300 dark:hover:border-white/[0.16] bg-gray-50 dark:bg-white/[0.02]"
            }`}
          >
            <Upload
              className={`w-8 h-8 mx-auto mb-3 ${
                dragOver ? "text-[#f58025]" : "text-gray-500"
              }`}
            />
            <p className="text-sm text-gray-400">
              {uploading ? "Uploading..." : (
                <>Drop images here or <span className="text-[#f58025] font-medium">browse</span></>
              )}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              PNG, JPG, WebP supported
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </div>
          {errors.images && (
            <p className="text-xs text-red-400 mt-2">{errors.images}</p>
          )}

          {/* Image previews */}
          {form.images.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {form.images.map((src, i) => (
                <div
                  key={i}
                  className="relative w-20 h-20 rounded-xl bg-gray-100 dark:bg-[#1a1c24] border border-gray-200 dark:border-white/[0.08] overflow-hidden group"
                >
                  <Image
                    src={src}
                    alt={`Preview ${i + 1}`}
                    fill
                    className="object-contain p-1.5"
                    sizes="80px"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 dark:border-white/[0.08] hover:border-[#f58025]/40 dark:hover:border-[#f58025]/40 flex items-center justify-center text-gray-500 hover:text-[#f58025] transition-all"
              >
                <ImagePlus className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Product Name & Style No */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="product-name"
              className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2"
            >
              Product Name <span className="text-red-400">*</span>
            </label>
            <input
              id="product-name"
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="e.g., Round Neck Tee-Shirt"
              className={`w-full bg-white dark:bg-white/[0.04] border rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-1 transition-all ${
                errors.name
                  ? "border-red-500/40 focus:border-red-500/60 focus:ring-red-500/30"
                  : "border-gray-200 dark:border-white/[0.08] focus:border-[#f58025]/50 focus:ring-[#f58025]/30"
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="product-style"
              className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2"
            >
              Style Number <span className="text-red-400">*</span>
            </label>
            <input
              id="product-style"
              type="text"
              value={form.styleNo}
              onChange={(e) => updateField("styleNo", e.target.value)}
              placeholder="e.g., #47"
              className={`w-full bg-white dark:bg-white/[0.04] border rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-1 transition-all ${
                errors.styleNo
                  ? "border-red-500/40 focus:border-red-500/60 focus:ring-red-500/30"
                  : "border-gray-200 dark:border-white/[0.08] focus:border-[#f58025]/50 focus:ring-[#f58025]/30"
              }`}
            />
            {errors.styleNo && (
              <p className="text-xs text-red-400 mt-1.5">{errors.styleNo}</p>
            )}
          </div>
        </div>

        {/* Collection */}
        <div>
          <label
            htmlFor="product-collection"
            className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2"
          >
            Collection
          </label>
          <div className="flex flex-wrap gap-2">
            {(
              Object.entries(collectionLabels) as [ProductCollection, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, collection: key }))
                }
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  form.collection === key
                    ? "bg-[#f58025]/15 text-[#f58025] border-[#f58025]/30"
                    : "bg-white dark:bg-white/[0.02] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/[0.12] hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Sizes & Fabric */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="product-sizes"
              className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2"
            >
              Sizes
            </label>
            <input
              id="product-sizes"
              type="text"
              value={form.sizes}
              onChange={(e) => updateField("sizes", e.target.value)}
              placeholder="e.g., S - XL"
              className="w-full bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#f58025]/50 focus:ring-1 focus:ring-[#f58025]/30 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="product-fabric"
              className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2"
            >
              Fabric
            </label>
            <input
              id="product-fabric"
              type="text"
              value={form.fabric}
              onChange={(e) => updateField("fabric", e.target.value)}
              placeholder="e.g., Single Jersey 180 GSM"
              className="w-full bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#f58025]/50 focus:ring-1 focus:ring-[#f58025]/30 transition-all"
            />
          </div>
        </div>

        {/* Composition */}
        <div>
          <label
            htmlFor="product-composition"
            className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2"
          >
            Composition
          </label>
          <input
            id="product-composition"
            type="text"
            value={form.composition}
            onChange={(e) => updateField("composition", e.target.value)}
            placeholder="e.g., 60% Cotton, 40% Polyester"
            className="w-full bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#f58025]/50 focus:ring-1 focus:ring-[#f58025]/30 transition-all"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-4">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            disabled={saved || saving || uploading}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm shadow-lg transition-all duration-200 ${
              saved
                ? "bg-emerald-500 text-white shadow-emerald-500/20"
                : saving || uploading
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-[#f58025] to-[#e86311] text-white shadow-[#f58025]/20 hover:shadow-[#f58025]/30"
            }`}
          >
            <Save className="w-4 h-4" />
            {saved
              ? "Saved!"
              : saving
              ? "Saving..."
              : mode === "add"
              ? "Add Product"
              : "Save Changes"}
          </motion.button>
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] hover:bg-gray-200 dark:hover:bg-white/[0.08] transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
