"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

/* ── Real team member data ── */
const teamMembers = [
  {
    id: "ceo",
    role: "CEO",
    name: "Muhammad Shahid Khan",
    bio: "Leading Afraz Apparel with 30+ years of industry experience, driving the company's vision of world-class garment manufacturing.",
    email: "Shahidkhan@afrazapparel.com.pk",
    phone: "+92 300 829 4394",
    circleColor: "bg-[#dfe8fc]",
    hoverCircleColor: "#608cee",
    hoverShadow: "rgba(96,140,238,0.35)",
    svgFill: "#D4DFF8",
    svg: (
      <svg viewBox="0 0 260 170" xmlns="http://www.w3.org/2000/svg" className="max-w-[260px] w-full">
        <circle id="svg-circle" fillRule="evenodd" clipRule="evenodd" fill="#D4DFF8" cx="130" cy="85" r="85" />
        <g>
          <line stroke="#212226" strokeWidth="2" strokeLinecap="square" x1="1" y1="150" x2="6" y2="150" />
          <line stroke="#212226" strokeWidth="2" strokeLinecap="square" x1="254" y1="150" x2="259" y2="150" />
          <line stroke="#212226" strokeWidth="2" strokeLinecap="square" x1="14" y1="150" x2="246" y2="150" />
        </g>
        <g id="ceo-body">
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M90,88h80c1.1,0,2,.9,2,2v52c0,1.1-.9,2-2,2H90c-1.1,0-2-.9-2-2V90C88,88.9,88.9,88,90,88z" />
          <circle fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" cx="130" cy="116" r="5" />
          <path fill="none" stroke="#212226" strokeWidth="2" d="M124,72v5c0,1.657,2.686,3,6,3c3.314,0,6-1.343,6-3v-5" />
          <path fill="none" stroke="#212226" strokeWidth="2" d="M124,77l-19.068,3.178C101.766,80.706,98.926,82.433,97,85" />
          <path fill="none" stroke="#212226" strokeWidth="2" d="M136,77l19.068,3.178c3.166,0.528,6.006,2.255,7.932,4.822" />
          <rect x="93" y="139" fill="#212226" width="74" height="1" />
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M110,45c0-11.046,8.954-20,20-20s20,8.954,20,20c0,14-7,28-20,28S110,59,110,45z" />
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M74,136c-4.418,0-8,3.582-8,8h16C82,139.582,78.418,136,74,136z" />
        </g>
        <g id="ceo-brief">
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M224,122h-31c-1.1,0-2,.9-2,2v18c0,1.1,.9,2,2,2h31c1.1,0,2-.9,2-2v-18C226,122.9,225.1,122,224,122z" />
          <line stroke="#212226" strokeWidth="2" x1="208" y1="122" x2="208" y2="144" />
          <line stroke="#212226" strokeWidth="2" x1="197" y1="130" x2="226" y2="130" />
          <path fill="none" stroke="#212226" strokeWidth="2" d="M202,122v-3c0-1.1,.9-2,2-2h9c1.1,0,2,.9,2,2v3" />
        </g>
        <g id="ceo-bubble">
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M179,14c-1.1,0-2,.9-2,2v35l10-9h30c1.1,0,2-.9,2-2V16c0-1.1-.9-2-2-2H179z" />
          <line stroke="#212226" strokeWidth="2" strokeLinecap="square" x1="186" y1="22" x2="212" y2="22" />
          <line stroke="#212226" strokeWidth="2" strokeLinecap="square" x1="186" y1="29" x2="206" y2="29" />
          <line stroke="#212226" strokeWidth="2" strokeLinecap="square" x1="186" y1="36" x2="209" y2="36" />
        </g>
        <g id="ceo-mug">
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M32,117h24v25c0,1.1-.9,2-2,2H34c-1.1,0-2-.9-2-2V117z" />
          <rect x="35" y="120" fill="#212226" width="18" height="1" />
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M56,122h3c1.1,0,2,.9,2,2v8c0,1.1-.9,2-2,2h-3" />
        </g>
      </svg>
    ),
  },
  {
    id: "proprietor",
    role: "Sole Proprietor",
    name: "Muhammad Afraz Khan",
    bio: "Founder and owner of Afraz Apparel, overseeing the company's strategic direction and long-term growth across global markets.",
    email: "afrazkhan@afrazapparel.com.pk",
    phone: "+92 333 215 2616",
    circleColor: "bg-[#fedee0]",
    hoverCircleColor: "#fb5962",
    hoverShadow: "rgba(251,89,98,0.35)",
    svg: (
      <svg viewBox="0 0 260 170" xmlns="http://www.w3.org/2000/svg" className="max-w-[260px] w-full">
        <circle fillRule="evenodd" clipRule="evenodd" fill="#fedee0" cx="130" cy="85" r="85" />
        <g>
          <line stroke="#212226" strokeWidth="2" strokeLinecap="square" x1="1" y1="150" x2="6" y2="150" />
          <line stroke="#212226" strokeWidth="2" strokeLinecap="square" x1="254" y1="150" x2="259" y2="150" />
          <line stroke="#212226" strokeWidth="2" strokeLinecap="square" x1="14" y1="150" x2="246" y2="150" />
        </g>
        <g id="prod-body">
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M90,88h80c1.1,0,2,.9,2,2v52c0,1.1-.9,2-2,2H90c-1.1,0-2-.9-2-2V90C88,88.9,88.9,88,90,88z" />
          <circle fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" cx="130" cy="116" r="5" />
          <path fill="none" stroke="#212226" strokeWidth="2" d="M124,72v5c0,1.657,2.686,3,6,3c3.314,0,6-1.343,6-3v-5" />
          <path fill="none" stroke="#212226" strokeWidth="2" d="M124,77l-19.068,3.178C101.766,80.706,98.926,82.433,97,85" />
          <path fill="none" stroke="#212226" strokeWidth="2" d="M136,77l19.068,3.178c3.166,0.528,6.006,2.255,7.932,4.822" />
          <rect x="93" y="139" fill="#212226" width="74" height="1" />
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M110,45c0-11.046,8.954-20,20-20s20,8.954,20,20c0,14-7,28-20,28S110,59,110,45z" />
        </g>
        <g id="prod-left">
          <path fill="none" stroke="#212226" strokeWidth="2" d="M53,89v5c0,1.657,2.686,3,6,3s6-1.343,6-3v-5" />
          <path fill="none" stroke="#212226" strokeWidth="2" d="M53,94l-19.816,4.783C27.796,100.084,24,104.905,24,110.448V115v23c0,3.314,2.686,6,6,6h29" />
          <line stroke="#212226" strokeWidth="2" x1="65" y1="94" x2="84.068" y2="97.178" />
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M39,62c0-11.046,8.954-20,20-20s20,8.954,20,20c0,14-7,28-20,28S39,76,39,62z" />
        </g>
        <g id="prod-right">
          <path fill="none" stroke="#212226" strokeWidth="2" d="M207,89v5c0,1.657-2.686,3-6,3s-6-1.343-6-3v-5" />
          <path fill="none" stroke="#212226" strokeWidth="2" d="M207,94l19.816,4.783c5.388,1.301,9.184,6.122,9.184,11.665V115v23c0,3.314-2.686,6-6,6h-29" />
          <line stroke="#212226" strokeWidth="2" x1="195" y1="94" x2="175.932" y2="97.178" />
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M221,62c0-11.046-8.954-20-20-20s-20,8.954-20,20c0,14,7,28,20,28S221,76,221,62z" />
        </g>
      </svg>
    ),
  },
  {
    id: "director-marketing",
    role: "Director Marketing",
    name: "Aziz Ul Haque",
    bio: "Spearheads Afraz Apparel's global marketing strategy, building relationships with international buyers and expanding the brand's reach.",
    email: "azizulhaque@afrazapparel.com.pk",
    phone: "+92 300 824 3425",
    circleColor: "bg-[#fef0de]",
    hoverCircleColor: "#fbb359",
    hoverShadow: "rgba(251,179,89,0.35)",
    svg: (
      <svg viewBox="0 0 260 170" xmlns="http://www.w3.org/2000/svg" className="max-w-[260px] w-full">
        <circle fillRule="evenodd" clipRule="evenodd" fill="#fef0de" cx="130" cy="85" r="85" />
        <g>
          <line stroke="#212226" strokeWidth="2" strokeLinecap="square" x1="1" y1="150" x2="6" y2="150" />
          <line stroke="#212226" strokeWidth="2" strokeLinecap="square" x1="254" y1="150" x2="259" y2="150" />
          <line stroke="#212226" strokeWidth="2" strokeLinecap="square" x1="14" y1="150" x2="246" y2="150" />
        </g>
        <g id="qc-body">
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M90,88h80c1.1,0,2,.9,2,2v52c0,1.1-.9,2-2,2H90c-1.1,0-2-.9-2-2V90C88,88.9,88.9,88,90,88z" />
          <circle fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" cx="130" cy="116" r="5" />
          <path fill="none" stroke="#212226" strokeWidth="2" d="M124,72v5c0,1.657,2.686,3,6,3c3.314,0,6-1.343,6-3v-5" />
          <path fill="none" stroke="#212226" strokeWidth="2" d="M124,77l-19.068,3.178C101.766,80.706,98.926,82.433,97,85" />
          <path fill="none" stroke="#212226" strokeWidth="2" d="M136,77l19.068,3.178c3.166,0.528,6.006,2.255,7.932,4.822" />
          <rect x="93" y="139" fill="#212226" width="74" height="1" />
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M110,45c0-11.046,8.954-20,20-20s20,8.954,20,20c0,14-7,28-20,28S110,59,110,45z" />
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M74,136c-4.418,0-8,3.582-8,8h16C82,139.582,78.418,136,74,136z" />
        </g>
        <g id="qc-clipboard">
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M224,117h-35c-1.1,0-2,.9-2,2v22c0,1.1,.9,2,2,2h35c1.1,0,2-.9,2-2v-22C226,117.9,225.1,117,224,117z" />
          <rect x="200" y="113" fill="none" stroke="#212226" strokeWidth="2" width="13" height="6" rx="1" />
          <line stroke="#212226" strokeWidth="2" strokeLinecap="square" x1="193" y1="127" x2="221" y2="127" />
          <line stroke="#212226" strokeWidth="2" strokeLinecap="square" x1="193" y1="133" x2="215" y2="133" />
          <polyline fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="round" points="193,122 196,125 202,119" />
        </g>
        <g id="qc-bubble">
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M179,14c-1.1,0-2,.9-2,2v35l10-9h30c1.1,0,2-.9,2-2V16c0-1.1-.9-2-2-2H179z" />
          <polyline fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="round" points="187,28 193,34 207,20" />
        </g>
        <g id="qc-mug">
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M31,116h24v26c0,1.1-.9,2-2,2H33c-1.1,0-2-.9-2-2V116z" />
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M55,122h3c1.1,0,2,.9,2,2v8c0,1.1-.9,2-2,2h-3" />
          <rect x="50" y="119" fill="#212226" width="1" height="20" />
        </g>
      </svg>
    ),
  },
  {
    id: "marketing-manager",
    role: "Marketing & Merchandising Manager",
    name: "Kaleem Uddin",
    bio: "Manages end-to-end merchandising and client coordination, ensuring seamless order execution from concept to delivery.",
    email: "kaleem@afrazapparel.com.pk",
    phone: "+92 321 215 6503",
    circleColor: "bg-[#d1fae5]",
    hoverCircleColor: "#10b981",
    hoverShadow: "rgba(16,185,129,0.35)",
    svg: (
      <svg viewBox="0 0 260 170" xmlns="http://www.w3.org/2000/svg" className="max-w-[260px] w-full">
        <circle fillRule="evenodd" clipRule="evenodd" fill="#d1fae5" cx="130" cy="85" r="85" />
        <g>
          <line stroke="#212226" strokeWidth="2" strokeLinecap="square" x1="1" y1="150" x2="6" y2="150" />
          <line stroke="#212226" strokeWidth="2" strokeLinecap="square" x1="254" y1="150" x2="259" y2="150" />
          <line stroke="#212226" strokeWidth="2" strokeLinecap="square" x1="14" y1="150" x2="246" y2="150" />
        </g>
        <g>
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M90,88h80c1.1,0,2,.9,2,2v52c0,1.1-.9,2-2,2H90c-1.1,0-2-.9-2-2V90C88,88.9,88.9,88,90,88z" />
          <circle fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" cx="130" cy="116" r="5" />
          <path fill="none" stroke="#212226" strokeWidth="2" d="M124,72v5c0,1.657,2.686,3,6,3c3.314,0,6-1.343,6-3v-5" />
          <path fill="none" stroke="#212226" strokeWidth="2" d="M124,77l-19.068,3.178C101.766,80.706,98.926,82.433,97,85" />
          <path fill="none" stroke="#212226" strokeWidth="2" d="M136,77l19.068,3.178c3.166,0.528,6.006,2.255,7.932,4.822" />
          <rect x="93" y="139" fill="#212226" width="74" height="1" />
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M110,45c0-11.046,8.954-20,20-20s20,8.954,20,20c0,14-7,28-20,28S110,59,110,45z" />
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M74,136c-4.418,0-8,3.582-8,8h16C82,139.582,78.418,136,74,136z" />
        </g>
        <g id="mm-chart">
          <rect x="188" y="130" fill="none" stroke="#212226" strokeWidth="2" width="38" height="20" rx="1" />
          <rect x="193" y="135" fill="#212226" width="6" height="10" />
          <rect x="203" y="132" fill="#212226" width="6" height="13" />
          <rect x="213" y="128" fill="#212226" width="6" height="17" />
        </g>
        <g id="mm-mug">
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M32,117h24v25c0,1.1-.9,2-2,2H34c-1.1,0-2-.9-2-2V117z" />
          <rect x="35" y="120" fill="#212226" width="18" height="1" />
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M56,122h3c1.1,0,2,.9,2,2v8c0,1.1-.9,2-2,2h-3" />
        </g>
        <g id="mm-bubble">
          <path fill="none" stroke="#212226" strokeWidth="2" strokeLinecap="square" d="M179,14c-1.1,0-2,.9-2,2v35l10-9h30c1.1,0,2-.9,2-2V16c0-1.1-.9-2-2-2H179z" />
          <line stroke="#212226" strokeWidth="2" strokeLinecap="square" x1="186" y1="22" x2="212" y2="22" />
          <line stroke="#212226" strokeWidth="2" strokeLinecap="square" x1="186" y1="29" x2="206" y2="29" />
          <line stroke="#212226" strokeWidth="2" strokeLinecap="square" x1="186" y1="36" x2="209" y2="36" />
        </g>
      </svg>
    ),
  },
];

/* ── Individual team card ── */
function TeamCard({ member, index }: { member: typeof teamMembers[0]; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="team-flip-card"
      style={{ listStyle: "none" }}
    >
      <div className="team-flip-inner">

        {/* ── FRONT ── */}
        <div className="team-flip-front">
          <span
            className="team-card-circle"
            style={{ ["--hover-bg" as string]: member.hoverCircleColor }}
          />
          <div className="team-card-intro">
            <p className="team-card-role">{member.role}</p>
            <h3 className="team-card-name">{member.name}</h3>
            <p className="team-card-bio">{member.bio}</p>
            <p className="team-flip-hint">Hover to see contact info</p>
          </div>
          <div className="team-svg-wrapper">{member.svg}</div>
        </div>

        {/* ── BACK ── */}
        <div
          className="team-flip-back"
          style={{ background: member.hoverCircleColor }}
        >
          <div className="team-back-content">
            <p className="team-back-role">{member.role}</p>
            <h3 className="team-back-name">{member.name}</h3>
            <div className="team-back-divider" />
            <a
              href={`mailto:${member.email}`}
              className="team-back-row"
              onClick={(e) => e.stopPropagation()}
            >
              <Mail size={16} className="team-back-icon" />
              <span>{member.email}</span>
            </a>
            <a
              href={`tel:${member.phone.replace(/\s/g, "")}`}
              className="team-back-row"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone size={16} className="team-back-icon" />
              <span>{member.phone}</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Flip container ── */
        .team-flip-card {
          perspective: 1100px;
          height: 460px;
          border-radius: 12px;
        }
        .team-flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1);
          border-radius: 12px;
        }
        .team-flip-card:hover .team-flip-inner {
          transform: rotateY(180deg);
        }

        /* ── Shared face styles ── */
        .team-flip-front,
        .team-flip-back {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          overflow: hidden;
        }

        /* ── FRONT face ── */
        .team-flip-front {
          background: #fff;
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
          padding: 2em;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .dark .team-flip-front {
          background: rgba(255,255,255,0.04);
          box-shadow: 0 2px 16px rgba(0,0,0,0.25);
        }

        /* Expanding circle on front */
        .team-card-circle {
          position: absolute;
          width: 170px;
          height: 170px;
          bottom: 34px;
          left: calc(50% - 85px);
          border-radius: 50%;
          background: #dfe8fc;
          z-index: 1;
        }
        .team-card-intro { position: relative; z-index: 2; min-height: 148px; }
        .team-card-role {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent, #f97316);
          margin-bottom: 0.25rem;
        }
        .team-card-name {
          color: #111;
          font-weight: 700;
          font-size: 1.4rem;
          margin-bottom: 0.5rem;
        }
        .dark .team-card-name { color: #fff; }
        .team-card-bio {
          color: #666;
          font-size: 0.85rem;
          opacity: 0.75;
          line-height: 1.5;
          margin: 0.4em 0;
        }
        .dark .team-card-bio { color: #aaa; }
        .team-flip-hint {
          font-size: 0.7rem;
          letter-spacing: 0.06em;
          color: #aaa;
          margin-top: 0.75rem;
          font-style: italic;
        }
        .team-svg-wrapper { position: relative; z-index: 2; margin-top: auto; }
        .team-svg-wrapper svg #svg-circle { display: none; }

        /* ── BACK face ── */
        .team-flip-back {
          transform: rotateY(180deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        }
        .team-back-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 2rem;
          width: 100%;
          text-align: center;
        }
        .team-back-role {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          margin: 0;
        }
        .team-back-name {
          font-size: 1.6rem;
          font-weight: 800;
          color: #fff;
          margin: 0;
          line-height: 1.2;
        }
        .team-back-divider {
          width: 48px;
          height: 2px;
          background: rgba(255,255,255,0.4);
          border-radius: 2px;
          margin: 0.25rem 0;
        }
        .team-back-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: #fff;
          font-size: 0.88rem;
          font-weight: 500;
          text-decoration: none;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 8px;
          padding: 0.6rem 1rem;
          width: 100%;
          transition: background 0.2s;
          word-break: break-all;
        }
        .team-back-row:hover {
          background: rgba(255,255,255,0.28);
        }
        .team-back-icon {
          flex-shrink: 0;
          opacity: 0.9;
        }
      `}</style>
    </motion.li>
  );
}

/* ── Main export ── */
export default function OurTeam() {
  return (
    <section className="w-full py-20 md:py-28 bg-background relative">
      <div className="hidden md:block absolute top-0 left-0 w-1/3 h-1/2 bg-brand-100/30 dark:bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="text-brand-600 dark:text-brand-400 font-bold tracking-widest uppercase text-sm">
            The People Behind the Product
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mt-4 mb-6">
            Meet the <span className="text-gradient">Team</span>
          </h2>
          <p className="text-muted-foreground dark:text-gray-400">
            Hover any card to get in touch directly.
          </p>
        </motion.div>

        {/* Cards grid */}
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 list-none p-0 m-0">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
