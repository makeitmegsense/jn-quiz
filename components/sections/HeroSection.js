'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '../../lib/LanguageContext';

const NAVY   = '#17365d';
const PURPLE = '#7655c8';
const MUTED  = '#8b82b8';

const particles = [
  { top:'12%', right:'12%', size:8, delay:0,   color:PURPLE },
  { top:'68%', left:'3%',   size:6, delay:1.5, color:PURPLE },
  { top:'80%', right:'8%',  size:6, delay:2.5, color:NAVY   },
];

/* Thin concentric outline circles, as in the reference */
function Rings({ size, count = 3, step = 80, stroke = 'rgba(118,85,200,0.22)' }) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <circle
          key={i}
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 1 - i * step}
          stroke={stroke}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

export default function HeroSection() {
  const { t } = useLang();
  const h = t.hero;

  // "Quiz Competition" is shown as two stacked words: navy, then purple
  const [t3a, ...t3rest] = h.title3.split(' ');
  const t3b = t3rest.join(' ');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden hero-gradient"
      style={{ paddingTop: '80px' }}
    >

      {/* ── Decorative rings ── */}
      <div className="absolute -left-[260px] top-[12%] pointer-events-none hidden md:block z-0">
        <Rings size={720} count={2} step={56} />
      </div>
      <div className="absolute -right-[220px] -top-[160px] pointer-events-none hidden lg:block z-0">
        <Rings size={760} count={2} step={64} />
      </div>

      {/* ── Particles ── */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none z-[1]"
          style={{ top:p.top, left:p.left, right:p.right, width:p.size, height:p.size, background:p.color }}
          animate={{ opacity:[0.25,0.8,0.25], scale:[1,1.4,1] }}
          transition={{ duration:3 + p.delay, repeat:Infinity, delay:p.delay, ease:'easeInOut' }}
        />
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-6 items-center">

          {/* LEFT — TEXT */}
          <div className="text-center lg:text-left">

            {/* Logo lockup */}
            <motion.div
              initial={{ opacity:0, y:16 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6 }}
              className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8"
            >
              <img
                src="/Congress_Seva_Dal_2.png"
                alt="Congress Seva Dal"
                className="h-14 w-14 sm:h-16 sm:w-16 object-contain"
              />
              <div className="text-center">
                <div
                  className="text-xl sm:text-2xl font-bold leading-tight tracking-tight"
                  style={{ color: NAVY }}
                >
                  Congress Seva Dal
                </div>
                <div
                  className="mt-1 text-[11px] sm:text-xs font-semibold uppercase"
                  style={{ color: PURPLE, letterSpacing: '0.3em' }}
                >
                  Serve India
                </div>
              </div>
              <img
                src="/Congress_Seva_Dal.png"
                alt="Congress Seva Dal seal"
                className="h-14 w-14 sm:h-16 sm:w-16 object-contain"
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity:0, y:30 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.15 }}
              className="section-title text-6xl sm:text-7xl xl:text-[5.75rem] mb-8"
              style={{ lineHeight: 0.98, letterSpacing: '-0.01em' }}
            >
              <span className="block" style={{ color: NAVY }}>{h.title1}</span>
              <span className="block" style={{ color: PURPLE }}>{h.title2}</span>
              <span className="block" style={{ color: NAVY }}>{t3a}</span>
              {t3b && <span className="block" style={{ color: PURPLE }}>{t3b}</span>}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.3 }}
              className="text-lg sm:text-xl mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0"
              style={{ color: PURPLE }}
            >
              {h.sub}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, delay:0.5 }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Link href="/quiz">
                <button className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
                  {h.cta1}
                </button>
              </Link>

              <a href="#about">
                <button className="btn-secondary text-base px-8 py-4 w-full sm:w-auto">
                  {h.cta2}
                </button>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ delay:0.8 }}
              className="flex gap-8 mt-12 justify-center lg:justify-start"
            >
              {[
                { num:'38',  label:h.stat1 },
                { num:'30s', label:h.stat2 },
                { num:'∞',   label:h.stat3 },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-black section-title" style={{ color: NAVY }}>
                    {s.num}
                  </div>
                  <div className="text-xs mt-1 tracking-wide uppercase" style={{ color: MUTED }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

          </div>

          {/* RIGHT — PORTRAIT */}
          <motion.div
            initial={{ opacity:0, scale:0.95, x:30 }}
            animate={{ opacity:1, scale:1, x:0 }}
            transition={{ duration:0.9, delay:0.3, ease:[0.22,1,0.36,1] }}
            className="relative flex items-end justify-center"
          >
            <div className="relative w-[300px] sm:w-[400px] lg:w-[460px] xl:w-[540px] aspect-[1043/1208]">

              {/* Layered discs behind the portrait */}
              <div
                className="absolute rounded-full"
                style={{
                  left:'-4%', right:'-4%', top:'2%', aspectRatio:'1 / 1',
                  background:'rgba(255,255,255,0.85)',
                  boxShadow:'0 30px 90px rgba(118,85,200,0.14)',
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  left:'3%', right:'3%', top:'8%', aspectRatio:'1 / 1',
                  background:'linear-gradient(160deg,#F1ECFF 0%,#E9E2FF 100%)',
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  left:'12%', right:'12%', top:'17%', aspectRatio:'1 / 1',
                  border:'1px solid rgba(118,85,200,0.25)',
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  left:'21%', right:'21%', top:'26%', aspectRatio:'1 / 1',
                  background:'rgba(255,255,255,0.45)',
                }}
              />

              <Image
                src="/nehru-jayanti.png"
                alt="Pandit Jawaharlal Nehru"
                fill
                priority
                sizes="(min-width:1280px) 540px, (min-width:1024px) 460px, 400px"
                className="object-contain object-bottom relative"
                style={{
                  filter:'drop-shadow(0 24px 40px rgba(23,54,93,0.18))',
                  WebkitMaskImage:'linear-gradient(to bottom,#000 92%,transparent 100%)',
                  maskImage:'linear-gradient(to bottom,#000 92%,transparent 100%)',
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
