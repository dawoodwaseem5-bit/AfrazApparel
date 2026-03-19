"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Shirt } from "lucide-react";

export type ArticleCategory = {
  slug: string;
  title: string;
  description?: string;
  /** Add your image path here when ready, e.g. "/articles/shirts.jpg" */
  image?: string;
};

const categories: ArticleCategory[] = [
  { slug: "shirts", title: "Shirts", description: "Premium shirts for every occasion" },
  { slug: "trousers", title: "Trousers", description: "Quality trousers and pants" },
  { slug: "hoodies", title: "Hoodies", description: "Comfortable hoodies and sweatshirts" },
  { slug: "sandos", title: "Sandos", description: "Casual sandos and relaxed wear" },
  { slug: "tank-tops", title: "Tank Tops", description: "Lightweight tank tops" },
  { slug: "sweatshirts", title: "Sweatshirts", description: "Cozy sweatshirts" },
  { slug: "gym-wear", title: "Gym Wear", description: "Performance gym and sportswear" },
];

const spring = { type: "spring" as const, stiffness: 260, damping: 20 };
const springSmooth = { type: "spring" as const, stiffness: 300, damping: 30 };

const itemFromLeft = {
  hidden: { opacity: 0, x: -48, scale: 0.94 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { ...spring, opacity: { duration: 0.32 } },
  },
};

const itemFromRight = {
  hidden: { opacity: 0, x: 48, scale: 0.94 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { ...spring, opacity: { duration: 0.32 } },
  },
};

const itemMobile = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...springSmooth, opacity: { duration: 0.38 } },
  },
};

const itemReduced = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function CategoryCard({
  category,
  index,
  variant,
  reducedMotion,
}: {
  category: ArticleCategory;
  index: number;
  variant: "desktop" | "mobile";
  reducedMotion: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const itemVariant =
    reducedMotion
      ? itemReduced
      : variant === "mobile"
        ? itemMobile
        : index % 2 === 0
          ? itemFromLeft
          : itemFromRight;

  return (
    <motion.article
      variants={itemVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2, margin: "0px 0px -80px 0px" }}
      whileHover={reducedMotion ? undefined : { y: -10, scale: 1.02, transition: springSmooth }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-surface dark:bg-white/5 rounded-2xl overflow-hidden border border-border hover:border-accent/40 shadow-lg hover:shadow-xl transition-shadow duration-300 origin-center min-w-0 w-full max-w-full"
    >
      <div className="block rounded-2xl overflow-hidden w-full">
        <motion.div
          className="aspect-[4/3] relative bg-muted dark:bg-white/5 overflow-hidden"
          transition={springSmooth}
          animate={isHovered && !reducedMotion ? { scale: 1.06 } : { scale: 1 }}
        >
          {category.image ? (
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200/50 dark:from-brand-900/40 dark:to-accent/10">
              <motion.div
                className="w-20 h-20 rounded-full bg-white/80 dark:bg-white/10 flex items-center justify-center border border-brand-200/50 dark:border-white/20"
                animate={isHovered && !reducedMotion ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={spring}
              >
                <Shirt size={36} className="text-accent" strokeWidth={1.5} />
              </motion.div>
            </div>
          )}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
            initial={false}
            animate={{ opacity: isHovered && !reducedMotion ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          />
        </motion.div>
        <motion.div
          className="p-5 md:p-6 relative"
          initial={false}
          animate={isHovered && !reducedMotion ? { x: 4 } : { x: 0 }}
          transition={spring}
        >
          <h2 className="text-lg font-semibold text-foreground dark:text-white font-playfair group-hover:text-accent transition-colors duration-200">
            {category.title}
          </h2>
          {category.description && (
            <p className="mt-1 text-sm text-muted-foreground dark:text-gray-400">
              {category.description}
            </p>
          )}
        </motion.div>
      </div>
    </motion.article>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export default function ArticleCategories() {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const variant = isMobile ? "mobile" : "desktop";

  return (
    <section className="w-full max-w-full py-16 md:py-24 bg-background relative overflow-x-hidden box-border">
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-brand-50/50 dark:bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="w-full max-w-full mx-auto px-6 md:px-12 relative z-10 min-w-0 box-border">
        <motion.header
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
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
            Categories
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
            Browse our apparel categories — from shirts and trousers to hoodies, gym wear, and more.
          </motion.p>
        </motion.header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-w-0 w-full max-w-full">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.slug}
              category={category}
              index={index}
              variant={variant}
              reducedMotion={!!reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
