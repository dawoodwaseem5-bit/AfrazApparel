"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import {
  Factory,
  Award,
  Globe,
  TrendingUp,
  Users,
  Package,
  Star,
  Zap,
  ShieldCheck,
  Layers,
} from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: typeof Factory;
  tag: string;
  tagColor: string;
}

const milestones: Milestone[] = [
  {
    year: "1995",
    title: "Company Founded",
    description:
      "Afraz Apparel was established in the heart of Karachi, Pakistan, with a small team of 12 skilled craftsmen and a vision to deliver world-class garment production.",
    icon: Factory,
    tag: "Founded",
    tagColor: "bg-accent/10 text-accent border-accent/20",
  },
  {
    year: "1998",
    title: "First Export Order",
    description:
      "Secured the first international export contract, shipping premium knitwear to buyers in the United Kingdom — setting the global trajectory for the brand.",
    icon: Globe,
    tag: "Export",
    tagColor:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-accent/10 dark:text-accent dark:border-accent/30",
  },
  {
    year: "2002",
    title: "Factory Expansion",
    description:
      "Moved to a larger production facility, tripling floor area to 5,000 sq. ft. and introducing automated cutting machinery to scale output.",
    icon: Layers,
    tag: "Growth",
    tagColor: "bg-accent/10 text-accent border-accent/20",
  },
  {
    year: "2005",
    title: "ISO Quality Certification",
    description:
      "Achieved ISO 9001 quality management certification, formalizing our commitment to consistent, traceable production standards accepted by global buyers.",
    icon: ShieldCheck,
    tag: "Certification",
    tagColor:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-accent/10 dark:text-accent dark:border-accent/30",
  },
  {
    year: "2008",
    title: "Workforce Milestone — 100 Employees",
    description:
      "The team crossed 100 employees, bringing in dedicated QC inspectors, pattern masters, and an in-house design unit to serve brand clients end-to-end.",
    icon: Users,
    tag: "Team",
    tagColor: "bg-accent/10 text-accent border-accent/20",
  },
  {
    year: "2011",
    title: "Product Line Diversification",
    description:
      "Expanded beyond knitwear into woven garments, sportswear, and workwear — enabling Afraz to serve a broader range of international fashion brands.",
    icon: Package,
    tag: "Expansion",
    tagColor:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-accent/10 dark:text-accent dark:border-accent/30",
  },
  {
    year: "2015",
    title: "20th Anniversary & Brand Recognition",
    description:
      "Celebrated two decades of excellence and received a supplier award from a major European fashion house, cementing our reputation for reliability.",
    icon: Star,
    tag: "Award",
    tagColor: "bg-accent/10 text-accent border-accent/20",
  },
  {
    year: "2018",
    title: "Sustainable Practices Initiative",
    description:
      "Launched an eco-friendly production initiative — water-based printing, ethically sourced fabrics, and reduced-waste cutting patterns across all product lines.",
    icon: Zap,
    tag: "Sustainability",
    tagColor:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-accent/10 dark:text-accent dark:border-accent/30",
  },
  {
    year: "2021",
    title: "Capacity Reaches 100,000 pcs/month",
    description:
      "Through continuous investment in machinery and workforce training, monthly production capacity crossed the landmark figure of 100,000 garments.",
    icon: TrendingUp,
    tag: "Milestone",
    tagColor: "bg-accent/10 text-accent border-accent/20",
  },
  {
    year: "2025",
    title: "30 Years of Mastery",
    description:
      "Afraz Apparel celebrates 30 years of craftsmanship, now operating from a 15,000 sq. ft. facility with 200+ team members, serving global brands across Europe and North America.",
    icon: Award,
    tag: "Today",
    tagColor: "bg-accent text-white border-accent",
  },
];

/* ─── Scroll-driven card ─────────────────────────────────── */
function TimelineItem({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "center 60%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Card: slide from side + fade
  const cardX = useTransform(
    smoothProgress,
    [0, 1],
    isLeft ? ["-80px", "0px"] : ["80px", "0px"]
  );
  const cardOpacity = useTransform(smoothProgress, [0, 0.6], [0, 1]);
  const cardScale = useTransform(smoothProgress, [0, 1], [0.92, 1]);

  // Ghost year: opposite direction, slower
  const yearX = useTransform(
    smoothProgress,
    [0, 1],
    isLeft ? ["40px", "0px"] : ["-40px", "0px"]
  );
  const yearOpacity = useTransform(smoothProgress, [0, 1], [0, 0.12]);

  // Center dot: scale + glow
  const dotScale = useTransform(smoothProgress, [0.1, 0.8], [0, 1]);
  const dotOpacity = useTransform(smoothProgress, [0.1, 0.7], [0, 1]);

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-0 md:gap-8 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      {/* ── Card ── */}
      <motion.div
        style={{ x: cardX, opacity: cardOpacity, scale: cardScale }}
        className="md:w-[calc(50%-2.5rem)] w-[calc(100%-3rem)] ml-12 md:ml-0 group"
      >
        <div className="relative bg-surface dark:bg-white/5 border border-border hover:border-accent/40 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-default">
          {/* Hover accent corner */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-accent/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Tag + Year */}
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <span
              className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${milestone.tagColor}`}
            >
              {milestone.tag}
            </span>
            <span className="text-xs font-bold text-muted-foreground dark:text-gray-500 tabular-nums">
              {milestone.year}
            </span>
          </div>

          {/* Icon + Title */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-brand-100 dark:bg-accent/20 flex items-center justify-center text-accent border border-brand-200/50 dark:border-accent/30 shrink-0 group-hover:scale-110 transition-transform duration-300">
              <milestone.icon size={18} strokeWidth={1.75} />
            </div>
            <h3 className="font-semibold text-foreground dark:text-white text-sm leading-snug">
              {milestone.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground dark:text-gray-400 leading-relaxed">
            {milestone.description}
          </p>
        </div>

        {/* Mobile connector arm */}
        <div className="md:hidden absolute left-[1.15rem] top-5 w-[26px] h-[2px] bg-border" />
      </motion.div>

      {/* ── Center spine dot ── */}
      <motion.div
        style={{ scale: dotScale, opacity: dotOpacity }}
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-5 z-10
          w-10 h-10 rounded-full bg-white dark:bg-[#111] border-2 border-accent
          items-center justify-center shadow-lg shadow-accent/20"
      >
        <milestone.icon size={16} className="text-accent" strokeWidth={2} />
      </motion.div>

      {/* Mobile dot */}
      <motion.div
        style={{ scale: dotScale, opacity: dotOpacity }}
        className="md:hidden absolute left-[1.15rem] -translate-x-1/2 top-4 z-10
          w-5 h-5 rounded-full bg-white dark:bg-[#111] border-2 border-accent
          flex items-center justify-center shadow shadow-accent/30"
      />

      {/* ── Ghost year ── */}
      <motion.div
        style={{
          x: yearX,
          opacity: yearOpacity,
          justifyContent: isLeft ? "flex-start" : "flex-end",
        }}
        className="hidden md:flex md:w-[calc(50%-2.5rem)] items-start pt-2"
      >
        <span className="text-5xl font-black text-foreground dark:text-white tabular-nums select-none pointer-events-none">
          {milestone.year}
        </span>
      </motion.div>
    </div>
  );
}

/* ─── Scroll-driven spine line ───────────────────────────── */
function SpineLine({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 18,
    restDelta: 0.001,
  });

  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-border" />
      <motion.div
        className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent via-accent to-accent/30 origin-top"
        style={{ scaleY }}
      />
      {/* Mobile */}
      <div className="md:hidden absolute left-[1.15rem] top-0 bottom-0 w-[2px] bg-border" />
      <motion.div
        className="md:hidden absolute left-[1.15rem] top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent via-accent to-accent/30 origin-top"
        style={{ scaleY }}
      />
    </>
  );
}

/* ─── Main export ─────────────────────────────────────────── */
export default function CompanyTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  // Parallax background blobs
  const { scrollYProgress: sectionProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });
  const blob1Y = useTransform(sectionProgress, [0, 1], ["-5%", "10%"]);
  const blob2Y = useTransform(sectionProgress, [0, 1], ["10%", "-8%"]);

  return (
    <section
      ref={timelineRef}
      className="w-full py-24 relative overflow-hidden"
    >
      {/* Parallax background blobs */}
      <motion.div
        style={{ y: blob1Y }}
        className="absolute top-0 left-0 w-1/2 h-1/3 bg-accent/5 blur-[140px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: blob2Y }}
        className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-brand-100/20 dark:bg-accent/5 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="text-brand-600 dark:text-brand-400 font-bold tracking-widest uppercase text-sm">
            Our Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mt-4 mb-6">
            30 Years of <span className="text-gradient">Mastery</span>
          </h2>
          <p className="text-muted-foreground dark:text-gray-400">
            From a small workshop in Karachi to a globally trusted manufacturing
            partner — every stitch of our story.
          </p>
        </motion.div>

        {/* Timeline container */}
        <div className="relative" ref={timelineRef as React.RefObject<HTMLDivElement>}>
          <SpineLine containerRef={timelineRef as React.RefObject<HTMLDivElement>} />

          <div className="flex flex-col gap-14">
            {milestones.map((milestone, index) => (
              <TimelineItem
                key={milestone.year}
                milestone={milestone}
                index={index}
              />
            ))}
          </div>

          {/* End cap */}
          <motion.div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-4 w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/40"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring", stiffness: 180 }}
          />
        </div>
      </div>
    </section>
  );
}
