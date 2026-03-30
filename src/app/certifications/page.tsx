"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

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
      "The Customs-Trade Partnership Against Terrorism (C-TPAT) is a U.S. Customs and Border Protection (CBP) voluntary security program. Our membership confirms that we have implemented stringent supply chain security measures — from verified manufacturing premises to employee background checks. This gives our U.S. buyers expedited customs clearance, fewer cargo inspections, and the assurance that every shipment has been handled under federally recognised security protocols from factory floor to port.",
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
      "The Better Cotton Initiative (BCI) is the world's largest cotton sustainability programme, operating in over 20 countries. By sourcing Better Cotton, we actively support farmers who grow cotton with less water, fewer pesticides, and healthier soil — protecting the environment while improving the economic viability of farming communities. Our BCI membership ensures traceable, responsibly sourced cotton throughout our supply chain, allowing international brands to meet their sustainability commitments with confidence.",
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
      "The Business Social Compliance Initiative (BSCI) is a leading European framework for auditing and improving social standards in global supply chains. Our BSCI certification is the result of rigorous independent third-party audits assessing wages, working hours, health & safety conditions, and freedom of association across our factories. It signals to buyers and brands — especially in Europe — that our products are manufactured under conditions that respect human dignity and comply with the International Labour Organization's core conventions.",
    highlights: [
      "Fair wages and ethical labour practices",
      "Safe and healthy working environment",
      "Regular independent third-party audits",
      "Compliance with ILO labour standards",
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
      "The Global Recycled Standard (GRS) is an international, voluntary, full product standard that sets requirements for third-party certification of recycled content, chain of custody, social and environmental practices, and chemical restrictions. Our GRS certification allows brands to make verified recycled content claims on finished garments — from recycled polyester to rPET — backed by full traceability through every stage of our supply chain. It helps our customers demonstrate genuine circular economy commitments to their end consumers.",
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
      "As a member of the International Chamber of Commerce, Afraz Apparel subscribes to the world's most recognised framework for ethical international business conduct. The ICC provides the rules and standards that underpin trillions of dollars of global trade. Our membership signals to buyers across Europe, the Americas, and Asia that we operate under globally accepted commercial principles — and that in the rare case of a trade dispute, internationally recognised ICC arbitration mechanisms are available to protect both parties.",
    highlights: [
      "Adherence to global business standards",
      "Recognized for international trade",
      "Access to ICC dispute resolution",
      "Signal of credibility to global buyers",
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
      "OEKO-TEX® Standard 100 is one of the world's best-known labels for textiles tested for harmful substances. Every single component of our OEKO-TEX®–certified garments — fabric, thread, buttons, zippers, and dyes — is independently tested against a list of over 100 harmful substances including formaldehyde, heavy metals, pesticides, and allergenic dyes. The result is a product that is scientifically verified to be safe for prolonged skin contact, even for babies and newborns, making it the gold standard for consumer-facing safety claims.",
    highlights: [
      "Tested for 100+ harmful substances",
      "Safe for all skin types including babies",
      "Independent OEKO-TEX® certification",
      "Builds consumer trust in product safety",
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
      "The Employees' Old-Age Benefits Institution (EOBI) is the Government of Pakistan's mandatory pension and old-age benefit scheme. All eligible Afraz Apparel employees are registered and enrolled, with employer contributions made on their behalf every month. This provides our workforce with a formal safety net — pension income after retirement, survivor benefits for families, and invalidity coverage — reflecting our belief that every worker deserves long-term financial security, not just a pay cheque.",
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
      "The Employees' Social Security Institution (ESSI) is Pakistan's provincial social security framework providing comprehensive healthcare and income protection to enrolled workers. Every Afraz Apparel employee eligible under provincial law is registered with ESSI, granting them access to free hospitalisation, outpatient medical care, sickness allowances, maternity benefits, and compensation for industrial injuries. Our compliance with ESSI stands as a concrete, government-verified commitment to the health and wellbeing of the people who make our garments.",
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
      "Afraz Apparel is an active, registered taxpayer listed on the Federal Board of Revenue's (FBR) Active Taxpayer List (ATL). This status confirms that our business meets Pakistan's income and sales tax filing obligations — making us a legally transparent, credible partner for international procurement. Buyers gain peace of mind knowing their supplier operates within a fully documented, government-verified financial framework, reducing compliance risk on their end and facilitating smoother procurement and payments.",
    highlights: [
      "Active taxpayer status with the FBR",
      "Transparent financial reporting",
      "Reduced withholding tax benefits",
      "Trusted for international procurement",
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
      "The Karachi Chamber of Commerce & Industry (KCCI) is Pakistan's largest and most influential trade body, representing thousands of businesses across the country's economic capital. Our KCCI membership verifies our established commercial standing within Pakistan's manufacturing and export landscape. It provides buyers with independent confirmation that Afraz Apparel is a registered, credible, and active business entity — connected to trade facilitation channels, dispute resolution mechanisms, and international trade networks through one of South Asia's most prominent chambers.",
    highlights: [
      "Recognized registered business entity",
      "Trade facilitation & networking access",
      "Verified commercial standing in Pakistan",
      "Connected to global trade networks",
    ],
  },
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// Reusable scroll-triggered fade+slide variants — no blur
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 180, damping: 24 },
  },
};

const slideIn = (direction: "left" | "right"): Variants => ({
  hidden: { opacity: 0, x: direction === "left" ? -60 : 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 160, damping: 22 },
  },
});

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

      {/* ── Certifications List (Vertical, Colored, Described) ── */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 pb-28 space-y-32">
        {certifications.map((cert, index) => {
          const isEven = index % 2 === 0;
          const imgDir = isEven ? "left" : "right";
          const txtDir = isEven ? "right" : "left";
          return (
            <motion.div
              key={cert.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center justify-between gap-12 lg:gap-24 group w-full`}
            >
              {/* Image — slides in from its side */}
              <motion.div
                variants={slideIn(imgDir)}
                className="flex-shrink-0 relative w-64 h-64 lg:w-96 lg:h-96 flex items-center justify-center p-10 bg-muted/10 dark:bg-white/5 rounded-3xl transition-shadow duration-300 hover:shadow-xl"
              >
                <Image
                  src={cert.image}
                  alt={cert.title}
                  width={250}
                  height={250}
                  className="object-contain max-h-full max-w-full drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>

              {/* Text — slides in from the opposite side */}
              <motion.div
                variants={slideIn(txtDir)}
                className={`flex-1 flex flex-col ${isEven ? "lg:text-left items-center lg:items-start" : "lg:text-right items-center lg:items-end"} text-center max-w-2xl`}
              >
                <span className="inline-block text-xs font-bold px-4 py-1.5 mb-4 rounded-full bg-accent/10 text-brand-600 dark:text-accent tracking-[0.2em] uppercase">
                  {cert.category}
                </span>
                <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-3 leading-tight">
                  {cert.title}
                </h2>
                <p className="text-base lg:text-lg text-brand-600/80 dark:text-brand-400/80 mb-5 font-medium italic">
                  {cert.fullName}
                </p>
                <p className="text-base lg:text-lg text-foreground/70 leading-relaxed">
                  {cert.description}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </section>

      <section className="relative max-w-7xl mx-auto px-6 md:px-12 pb-28">
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
