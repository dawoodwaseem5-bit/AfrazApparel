"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const certifications = [
  {
    slug: "C-TPAT",
    image: "/certifications/C-TPAT.png",
    title: "C-TPAT",
    fullName: "Customs-Trade Partnership Against Terrorism",
    category: "Security & Trade",
    categoryColor: "from-brand-500 to-accent",
    badgeBg: "bg-brand-100 dark:bg-brand-900/40",
    badgeText: "text-brand-700 dark:text-brand-300",
    glowColor: "group-hover:shadow-accent/25",
    description:
      "A U.S. CBP program ensuring our supply chain meets rigorous international security standards — protecting against cargo theft, smuggling, and terrorism-related risks.",
    highlights: [
      "Verified secure manufacturing premises",
      "Reduced customs inspections & faster clearance",
      "Trusted for U.S. import programs",
      "CBP supply chain security compliance",
    ],
  },
  {
    slug: "bettercotton",
    image: "/certifications/bettercotton.png",
    title: "Better Cotton (BCI)",
    fullName: "Better Cotton Initiative",
    category: "Sustainability",
    categoryColor: "from-brand-400 to-brand-600",
    badgeBg: "bg-brand-100 dark:bg-brand-900/40",
    badgeText: "text-brand-700 dark:text-brand-300",
    glowColor: "group-hover:shadow-accent/25",
    description:
      "The world's largest cotton sustainability program. We source Better Cotton to support farmers in reducing water usage, protecting soils, and improving livelihoods.",
    highlights: [
      "Environmentally responsible cotton sourcing",
      "Reduced water and pesticide consumption",
      "Support for farming community livelihoods",
      "Traceable cotton through the supply chain",
    ],
  },
  {
    slug: "bsci",
    image: "/certifications/bsci.png",
    title: "BSCI",
    fullName: "Business Social Compliance Initiative",
    category: "Ethical Manufacturing",
    categoryColor: "from-brand-600 to-brand-800",
    badgeBg: "bg-brand-100 dark:bg-brand-900/40",
    badgeText: "text-brand-700 dark:text-brand-300",
    glowColor: "group-hover:shadow-accent/25",
    description:
      "Validates our factories uphold fair wages, safe working environments, and humane working hours — ensuring every product is made with dignity.",
    highlights: [
      "Fair wages and ethical labour practices",
      "Safe and healthy working environment",
      "Regular independent third-party audits",
      "Compliance with ILO labour standards",
    ],
  },
  {
    slug: "eobi",
    image: "/certifications/eobi.png",
    title: "EOBI",
    fullName: "Employees' Old-Age Benefits Institution",
    category: "Worker Benefits",
    categoryColor: "from-accent to-brand-500",
    badgeBg: "bg-brand-100 dark:bg-brand-900/40",
    badgeText: "text-brand-700 dark:text-brand-300",
    glowColor: "group-hover:shadow-accent/25",
    description:
      "All eligible employees are enrolled in Pakistan's government-mandated pension scheme, demonstrating our commitment to long-term worker welfare.",
    highlights: [
      "Pension and retirement security for workers",
      "Full government registration & compliance",
      "Protection for workers' families",
      "Transparent payroll contributions",
    ],
  },
  {
    slug: "essi",
    image: "/certifications/essi.png",
    title: "ESSI",
    fullName: "Employees' Social Security Institution",
    category: "Worker Benefits",
    categoryColor: "from-brand-500 to-brand-700",
    badgeBg: "bg-brand-100 dark:bg-brand-900/40",
    badgeText: "text-brand-700 dark:text-brand-300",
    glowColor: "group-hover:shadow-accent/25",
    description:
      "Workers receive free medical care, sickness benefits, and industrial injury coverage through Pakistan's ESSI — a cornerstone of our worker welfare commitment.",
    highlights: [
      "Free healthcare and medical treatment",
      "Sickness and maternity benefits",
      "Industrial injury compensation",
      "Provincial social security law compliance",
    ],
  },
  {
    slug: "fbr",
    image: "/certifications/fbr.png",
    title: "FBR",
    fullName: "Federal Board of Revenue – Active Taxpayer",
    category: "Tax & Legal",
    categoryColor: "from-brand-700 to-brand-900",
    badgeBg: "bg-brand-100 dark:bg-brand-900/40",
    badgeText: "text-brand-700 dark:text-brand-300",
    glowColor: "group-hover:shadow-accent/25",
    description:
      "Listed on the FBR Active Taxpayer List, assuring buyers and partners they are working with a fully legitimate, fiscally transparent enterprise.",
    highlights: [
      "Active taxpayer status with the FBR",
      "Transparent financial reporting",
      "Reduced withholding tax benefits",
      "Trusted for international procurement",
    ],
  },
  {
    slug: "grs",
    image: "/certifications/grs.png",
    title: "GRS",
    fullName: "Global Recycled Standard",
    category: "Sustainability",
    categoryColor: "from-brand-400 to-accent",
    badgeBg: "bg-brand-100 dark:bg-brand-900/40",
    badgeText: "text-brand-700 dark:text-brand-300",
    glowColor: "group-hover:shadow-accent/25",
    description:
      "Verifies recycled content in our products and ensures responsible social, environmental, and chemical practices — helping brands meet sustainability pledges.",
    highlights: [
      "Certified recycled material content",
      "Reduced environmental production impact",
      "Chain-of-custody traceability",
      "GOTS-aligned chemical restrictions",
    ],
  },
  {
    slug: "icc",
    image: "/certifications/icc.png",
    title: "ICC",
    fullName: "International Chamber of Commerce",
    category: "Trade & Business",
    categoryColor: "from-brand-300 to-brand-500",
    badgeBg: "bg-brand-100 dark:bg-brand-900/40",
    badgeText: "text-brand-700 dark:text-brand-300",
    glowColor: "group-hover:shadow-accent/25",
    description:
      "ICC membership confirms our commitment to ethical international trade, globally accepted standards, and seamless partnership with buyers worldwide.",
    highlights: [
      "Adherence to global business standards",
      "Recognized for international trade",
      "Access to ICC dispute resolution",
      "Signal of credibility to global buyers",
    ],
  },
  {
    slug: "kcci",
    image: "/certifications/kcci.png",
    title: "KCCI",
    fullName: "Karachi Chamber of Commerce & Industry",
    category: "Trade & Business",
    categoryColor: "from-brand-600 to-accent",
    badgeBg: "bg-brand-100 dark:bg-brand-900/40",
    badgeText: "text-brand-700 dark:text-brand-300",
    glowColor: "group-hover:shadow-accent/25",
    description:
      "Member of Pakistan's premier trade body, validating our standing as a credible, established entity within Pakistan's manufacturing and export ecosystem.",
    highlights: [
      "Recognized registered business entity",
      "Trade facilitation & networking access",
      "Verified commercial standing in Pakistan",
      "Connected to global trade networks",
    ],
  },
  {
    slug: "oeko",
    image: "/certifications/oeko.png",
    title: "OEKO-TEX® Standard 100",
    fullName: "OEKO-TEX® Standard 100",
    category: "Consumer Safety",
    categoryColor: "from-accent to-brand-600",
    badgeBg: "bg-brand-100 dark:bg-brand-900/40",
    badgeText: "text-brand-700 dark:text-brand-300",
    glowColor: "group-hover:shadow-accent/25",
    description:
      "Every component of our certified garments — threads, buttons, dyes — is tested against 100+ harmful substances, making them safe even for babies.",
    highlights: [
      "Tested for 100+ harmful substances",
      "Safe for all skin types including babies",
      "Independent OEKO-TEX® certification",
      "Builds consumer trust in product safety",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 22 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function CertificationsPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* ── Hero Header ── */}
      <section className="relative pt-36 pb-20 text-center overflow-hidden">
        {/* Decorative blobs — brand orange tones only */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-400/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 right-0 w-80 h-80 bg-accent/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-brand-300/10 rounded-full blur-[80px] pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-3xl mx-auto px-6"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="inline-block text-brand-600 dark:text-brand-400 font-bold tracking-widest uppercase text-sm mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Trust &amp; Compliance
          </motion.span>

          <motion.h1
            className="text-5xl md:text-7xl font-playfair font-bold text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-500 via-accent to-brand-400">
              Certifications
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground dark:text-gray-400 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            Globally recognized standards in quality, ethics, sustainability &amp; compliance —
            every badge earned, never bought.
          </motion.p>

          {/* Count pill */}
          <motion.div
            className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-semibold text-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse inline-block" />
            {certifications.length} Active Certifications
          </motion.div>
        </motion.div>
      </section>

      {/* ── Cards Grid ── */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 pb-28">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {certifications.map((cert) => (
            <motion.article
              key={cert.slug}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className={`group relative bg-surface dark:bg-white/5 rounded-3xl border border-border hover:border-accent/40 shadow-lg hover:shadow-2xl ${cert.glowColor} transition-shadow duration-300 overflow-hidden cursor-default`}
            >
              {/* Gradient top bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${cert.categoryColor}`} />

              {/* Subtle brand tint on hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br ${cert.categoryColor} transition-opacity duration-500 pointer-events-none`}
              />

              {/* Logo area */}
              <div className="relative flex items-center justify-center h-44 bg-muted/60 dark:bg-white/[0.03] px-10 overflow-hidden">
                {/* Soft brand glow behind logo */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br ${cert.categoryColor} blur-2xl transition-opacity duration-500`}
                />
                <Image
                  src={cert.image}
                  alt={cert.title}
                  width={220}
                  height={120}
                  className="object-contain max-h-28 w-auto relative z-10 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4">
                {/* Badge */}
                <span
                  className={`self-start text-xs font-bold px-3 py-1 rounded-full ${cert.badgeBg} ${cert.badgeText}`}
                >
                  {cert.category}
                </span>

                <div>
                  <h2 className="text-xl font-playfair font-bold text-foreground group-hover:text-accent transition-colors duration-200">
                    {cert.title}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {cert.fullName}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed">
                  {cert.description}
                </p>

                {/* Highlights */}
                <ul className="mt-1 space-y-2">
                  {cert.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2.5 text-sm text-foreground dark:text-gray-300"
                    >
                      <span
                        className={`mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br ${cert.categoryColor} flex items-center justify-center`}
                      >
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* ── Bottom CTA Banner ── */}
        <motion.div
          className="mt-20 relative overflow-hidden rounded-3xl p-10 md:p-16 text-center bg-gradient-to-br from-brand-600 via-accent to-brand-400 shadow-2xl shadow-accent/30"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 160, damping: 22, delay: 0.1 }}
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
              Quality You Can Trust
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8 text-lg">
              Every certification we hold is a promise — to our workers, our buyers, and the planet.
            </p>
            <a
              href="/#contact"
              className="inline-block px-10 py-4 bg-white text-accent font-bold rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-lg text-sm"
            >
              Work With Us
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
