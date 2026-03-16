"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Building2,
  Briefcase,
  Scale,
  User,
  MapPin,
  Factory,
  LayoutGrid,
  Users,
  UserCog,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  }),
};

const itemFromLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: () => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const itemFromRight = {
  hidden: { opacity: 0, x: 80 },
  visible: () => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

type CompanyRow =
  | {
      label: string;
      value: string;
      icon: typeof Building2;
      animateNumber?: undefined;
    }
  | {
      label: string;
      value: string;
      icon: typeof Building2;
      animateNumber: {
        target: number;
        prefix?: string;
        suffix: string;
        duration?: number;
        delay?: number;
      };
    };

const companyData: CompanyRow[] = [
  {
    label: "Company Name",
    value: "Afraz Apparel",
    icon: Building2,
  },
  {
    label: "Type of Business",
    value: "Manufacturer and Exporter",
    icon: Briefcase,
  },
  {
    label: "Legal Status",
    value: "Sole Proprietorship",
    icon: Scale,
  },
  {
    label: "Contact Person",
    value: "Muhammad Shahid Khan",
    icon: User,
  },
  {
    label: "Corporate Office & Factory",
    value: "Plot No. E-100 Sector 31/D, P & T Society Korangi, Karachi-Pakistan 74900",
    icon: MapPin,
  },
  {
    label: "Production Capacity",
    value: "Garments: 100,000 pcs/month",
    icon: Factory,
    animateNumber: { target: 100000, prefix: "Garments: ", suffix: " pcs/month", duration: 4000 },
  },
  {
    label: "Factory Space",
    value: "15,000 Sq. ft.",
    icon: LayoutGrid,
    animateNumber: { target: 15000, suffix: " Sq. ft.", duration: 3600 },
  },
  {
    label: "Total Manpower",
    value: "200",
    icon: Users,
    animateNumber: { target: 200, suffix: "", duration: 3400, delay: 300 },
  },
  {
    label: "Management Personnel",
    value: "25",
    icon: UserCog,
    animateNumber: { target: 25, suffix: "", duration: 3400, delay: 500 },
  },
];

function AnimatedNumber({
  target,
  prefix = "",
  suffix = "",
  inView,
  duration = 2200,
  delay = 0,
  easeOut = true,
}: {
  target: number;
  prefix?: string;
  suffix: string;
  inView: boolean;
  duration?: number;
  delay?: number;
  easeOut?: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (delay === 0) {
      setStarted(true);
      return;
    }
    const id = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(id);
  }, [inView, delay]);

  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const step = (t: number) => {
      if (start == null) start = t;
      const elapsed = t - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut ? 1 - Math.pow(1 - progress, 3) : progress;
      setDisplay(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration, easeOut]);

  const formatted = display.toLocaleString();
  return (
    <span>
      {prefix}
      <span className="tabular-nums">{formatted}</span>
      {suffix}
    </span>
  );
}

export default function CompanySection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 });
  const [gridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGridVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="w-full py-24 bg-muted/40 dark:bg-brand-950/20 relative border-y border-border"
    >
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-brand-100/30 dark:bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="text-brand-600 dark:text-brand-400 font-bold tracking-widest uppercase text-sm">
            Who We Are
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mt-4 mb-6">
            Company <span className="text-gradient">at a Glance</span>
          </h2>
          <p className="text-muted-foreground dark:text-gray-400">
            Key facts about Afraz Apparel — our structure, capacity, and how we operate.
          </p>
        </motion.div>

        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate={gridVisible ? "visible" : "hidden"}
        >
          {companyData.map((row, index) => (
            <motion.div
              key={row.label}
              variants={index % 2 === 0 ? itemFromLeft : itemFromRight}
              className="group relative bg-surface dark:bg-white/5 rounded-2xl p-6 shadow-lg border border-border hover:border-accent/40 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-100 dark:bg-accent/20 flex items-center justify-center text-accent border border-brand-200/50 dark:border-accent/30 group-hover:scale-110 transition-transform duration-300">
                  <row.icon size={24} strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-1">
                    {row.label}
                  </p>
                  <p className="text-foreground dark:text-gray-100 font-medium leading-snug">
                    {"animateNumber" in row && row.animateNumber ? (
                      <AnimatedNumber
                        target={row.animateNumber.target}
                        prefix={row.animateNumber.prefix}
                        suffix={row.animateNumber.suffix}
                        inView={gridInView}
                        duration={row.animateNumber.duration}
                        delay={row.animateNumber.delay}
                      />
                    ) : (
                      row.value
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
