"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  collectionLabels,
  products,
  type Product,
  type ProductCollection,
} from "@/data/products";

const collections: ProductCollection[] = ["men", "ladies", "boys", "girls"];

const springSmooth = { type: "spring" as const, stiffness: 300, damping: 30 };

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...springSmooth, opacity: { duration: 0.3 } },
  },
};

const cardReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

function ProductCard({
  product,
  reducedMotion,
}: {
  product: Product;
  reducedMotion: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const hasAltImage = product.images.length > 1;
  const activeImage =
    isHovered && hasAltImage ? product.images[1] : product.images[0];

  const detailLine = [product.fabric, product.composition]
    .filter(Boolean)
    .join(" · ");

  return (
    <motion.article
      variants={reducedMotion ? cardReduced : cardVariant}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-surface dark:bg-white/5 rounded-2xl overflow-hidden border border-border hover:border-accent/40 shadow-sm hover:shadow-xl transition-shadow duration-300 min-w-0 w-full"
    >
      <div className="aspect-[4/5] relative bg-product-bg overflow-hidden transition-colors duration-300">
        <motion.div
          className="absolute inset-4 md:inset-6"
          animate={
            isHovered && !reducedMotion && !hasAltImage
              ? { scale: 1.05 }
              : { scale: 1 }
          }
          transition={springSmooth}
        >
          <Image
            src={activeImage}
            alt={product.name}
            fill
            className="object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_10px_18px_rgba(0,0,0,0.5)]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </motion.div>
        <span className="absolute top-3 left-3 text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded-full bg-white/70 dark:bg-black/40 text-foreground/70 dark:text-white/70 border border-border backdrop-blur-sm">
          {product.styleNo}
        </span>
        {hasAltImage && (
          <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/70 dark:bg-black/40 text-foreground/60 dark:text-white/60 border border-border backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Back view
          </span>
        )}
      </div>

      <div className="p-4 md:p-5">
        <h3 className="text-sm md:text-[15px] font-semibold leading-snug text-foreground dark:text-white group-hover:text-accent transition-colors duration-200 line-clamp-2 min-h-[2.6em]">
          {product.name}
        </h3>
        {detailLine && (
          <p className="mt-1.5 text-xs md:text-[13px] text-muted-foreground dark:text-gray-400 line-clamp-1">
            {detailLine}
          </p>
        )}
        {product.sizes && (
          <p className="mt-1 text-xs text-muted-foreground/80 dark:text-gray-500">
            Sizes: {product.sizes}
          </p>
        )}
      </div>
    </motion.article>
  );
}

export default function ProductShowcase() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<ProductCollection>("men");
  const reducedMotion = !!useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const counts = useMemo(() => {
    const c = { men: 0, ladies: 0, boys: 0, girls: 0 } as Record<
      ProductCollection,
      number
    >;
    for (const p of products) c[p.collection]++;
    return c;
  }, []);

  const visible = useMemo(
    () => products.filter((p) => p.collection === active),
    [active]
  );

  return (
    <section className="w-full max-w-full py-16 md:py-24 bg-background relative overflow-x-hidden box-border">
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-brand-50/50 dark:bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 min-w-0 box-border">
        <motion.header
          className="text-center max-w-2xl mx-auto mb-10 md:mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
        >
          <motion.span
            className="text-brand-600 dark:text-brand-400 font-bold tracking-widest uppercase text-sm inline-block"
            initial={{ opacity: 0, y: 8 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            Collection 2026
          </motion.span>
          <motion.h1
            className="text-4xl md:text-5xl font-playfair font-bold text-foreground mt-4 mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 180, damping: 22, delay: 0.15 }}
          >
            Articles
          </motion.h1>
          <motion.p
            className="text-muted-foreground dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Explore our 2026 collection of knitted fashion garments — tees,
            hoodies, joggers, shorts and more across men&apos;s, ladies, boys
            and girls ranges.
          </motion.p>
        </motion.header>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10 md:mb-12"
          initial={{ opacity: 0, y: 12 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          {collections.map((c) => {
            const isActive = active === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={isActive}
                className={`px-4 md:px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 border ${
                  isActive
                    ? "bg-accent text-white border-accent shadow-md shadow-accent/25"
                    : "bg-surface dark:bg-white/5 text-foreground/70 dark:text-gray-300 border-border hover:border-accent/50 hover:text-accent"
                }`}
              >
                {collectionLabels[c]}
                <span
                  className={`ml-1.5 text-xs ${
                    isActive ? "text-white/80" : "text-muted-foreground"
                  }`}
                >
                  ({counts[c]})
                </span>
              </button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 min-w-0 w-full"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            variants={{
              visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.04 } },
            }}
          >
            {visible.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                reducedMotion={reducedMotion}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
