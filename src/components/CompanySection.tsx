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
  TrendingUp,
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
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const itemFromRight = {
  hidden: { opacity: 0, x: 80 },
  visible: () => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
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

// Bar chart data points for the graph cards (relative heights, 0–1)
const productionBars = [0.3, 0.45, 0.55, 0.4, 0.65, 0.75, 0.6, 0.82, 0.9, 0.88, 0.95, 1.0];
const factoryBars    = [0.2, 0.35, 0.5, 0.6, 0.55, 0.7, 0.78, 0.85, 0.88, 0.92, 0.95, 1.0];
const monthLabels    = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function AnimatedBarChart({
  bars,
  inView,
  accentColor = "bg-accent",
  delay = 0,
}: {
  bars: number[];
  inView: boolean;
  accentColor?: string;
  delay?: number;
}) {
  return (
    <div className="flex items-end gap-[3px] h-16">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className={`flex-1 rounded-t-sm ${accentColor}`}
          initial={{ scaleY: 0, originY: 1 }}
          animate={inView ? { scaleY: h } : { scaleY: 0 }}
          transition={{
            duration: 0.6,
            delay: delay / 1000 + i * 0.04,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ height: "100%", transformOrigin: "bottom" }}
        />
      ))}
    </div>
  );
}

function ProductionCapacityCard({ inView }: { inView: boolean }) {
  return (
    <motion.div
      variants={itemFromLeft}
      className="group relative rounded-2xl p-6 shadow-xl border overflow-hidden
        bg-gradient-to-br from-accent/10 via-orange-50/80 to-amber-50/60
        dark:from-accent/25 dark:via-accent/10 dark:to-orange-900/10
        border-accent/30 dark:border-accent/40
        hover:border-accent/60 dark:hover:border-accent/70
        hover:shadow-accent/20 hover:shadow-2xl
        transition-all duration-300 col-span-1 sm:col-span-2 lg:col-span-1"
    >
      {/* Glow blob */}
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-4 w-24 h-24 bg-orange-300/20 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center text-white shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform duration-300">
            <Factory size={22} strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-0.5">
              Production Capacity
            </p>
            <div className="text-2xl font-black text-foreground dark:text-white tabular-nums leading-none">
              <AnimatedNumber
                target={100000}
                suffix=""
                inView={inView}
                duration={3600}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-full">
          <TrendingUp size={12} />
          <span>Peak</span>
        </div>
      </div>

      <p className="relative text-xs text-muted-foreground dark:text-gray-400 mb-4 font-medium">
        Garments / month — monthly output trend
      </p>

      {/* Animated Bar Chart */}
      <div className="relative">
        <AnimatedBarChart bars={productionBars} inView={inView} accentColor="bg-accent" />
        {/* Month labels */}
        <div className="flex gap-[3px] mt-1">
          {monthLabels.map((m) => (
            <div key={m} className="flex-1 text-center text-[8px] text-muted-foreground/60 dark:text-gray-600">
              {m.slice(0, 1)}
            </div>
          ))}
        </div>
      </div>

      {/* Footer stat */}
      <div className="relative mt-4 pt-4 border-t border-accent/20 flex justify-between items-center">
        <span className="text-xs text-muted-foreground dark:text-gray-400">Annual capacity</span>
        <span className="text-sm font-bold text-accent tabular-nums">1.2M pcs / yr</span>
      </div>
    </motion.div>
  );
}

function FactorySpaceCard({ inView }: { inView: boolean }) {
  return (
    <motion.div
      variants={itemFromRight}
      className="group relative rounded-2xl p-6 shadow-xl border overflow-hidden
        bg-gradient-to-br from-amber-50/70 via-orange-50/50 to-accent/5
        dark:from-accent/15 dark:via-orange-900/10 dark:to-amber-900/5
        border-amber-200/60 dark:border-accent/30
        hover:border-accent/60 dark:hover:border-accent/60
        hover:shadow-accent/20 hover:shadow-2xl
        transition-all duration-300 col-span-1 sm:col-span-2 lg:col-span-1"
    >
      {/* Glow blob */}
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber-400/20 dark:bg-accent/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-4 w-24 h-24 bg-orange-300/15 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center text-white shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform duration-300">
            <LayoutGrid size={22} strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-0.5">
              Factory Space
            </p>
            <div className="text-2xl font-black text-foreground dark:text-white tabular-nums leading-none">
              <AnimatedNumber
                target={15000}
                suffix=" sq.ft"
                inView={inView}
                duration={3200}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-amber-100 dark:bg-accent/20 text-amber-700 dark:text-accent text-xs font-bold px-2 py-1 rounded-full">
          <TrendingUp size={12} />
          <span>Full</span>
        </div>
      </div>

      <p className="relative text-xs text-muted-foreground dark:text-gray-400 mb-4 font-medium">
        Sq. ft — floor area utilization by zone
      </p>

      {/* Animated Bar Chart */}
      <div className="relative">
        <AnimatedBarChart
          bars={factoryBars}
          inView={inView}
          accentColor="bg-amber-500 dark:bg-accent"
          delay={200}
        />
        {/* Month labels */}
        <div className="flex gap-[3px] mt-1">
          {monthLabels.map((m) => (
            <div key={m} className="flex-1 text-center text-[8px] text-muted-foreground/60 dark:text-gray-600">
              {m.slice(0, 1)}
            </div>
          ))}
        </div>
      </div>

      {/* Footer breakdown */}
      <div className="relative mt-4 pt-4 border-t border-amber-200/40 dark:border-accent/20 grid grid-cols-3 gap-2 text-center">
        {[
          { label: "Production", pct: "60%" },
          { label: "Warehouse", pct: "25%" },
          { label: "Admin", pct: "15%" },
        ].map((z) => (
          <div key={z.label}>
            <div className="text-sm font-bold text-accent">{z.pct}</div>
            <div className="text-[9px] text-muted-foreground/70 dark:text-gray-500 uppercase tracking-wide">{z.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function CompanySection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 });
  const graphInView = useInView(graphRef, { once: true, amount: 0.3 });
  const [gridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGridVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="w-full py-24 bg-muted/40 dark:bg-brand-950/20 relative border-y border-border">
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

        {/* Regular info cards */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
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
                <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-100 dark:bg-accent/20 flex items-center justify-center text-accent border border-brand-200/50 dark:border-accent/30 group-hover:scale-110 transition-transform duration-300">
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

        {/* Graph stat cards — Production Capacity & Factory Space */}
        <motion.div
          ref={graphRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          animate={gridVisible ? "visible" : "hidden"}
        >
          <ProductionCapacityCard inView={graphInView} />
          <FactorySpaceCard inView={graphInView} />
        </motion.div>
      </div>
    </section>
  );
}
