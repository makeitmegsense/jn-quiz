'use client';

import ScrollReveal from '../ui/ScrollReveal';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Eye, ListChecks, UserCheck, Ban } from 'lucide-react';
import { useLang } from '../../lib/LanguageContext';

export default function RulesSection() {
  const { t } = useLang();
  const r = t.rules;
  const rules = [
    { icon:Clock,      text:r.r1, color:'#17365d' },
    { icon:Eye,        text:r.r2, color:'#ef4444' },
    { icon:ListChecks, text:r.r3, color:'#7655c8' },
    { icon:UserCheck,  text:r.r4, color:'#138808' },
    { icon:Ban,        text:r.r5, color:'#5f3fb0' },
  ];
  return (
    <section id="rules" className="relative py-28 overflow-hidden section-blue-tint">
      <div className="absolute right-0 bottom-0 w-72 h-72 pointer-events-none"
        style={{ background:'radial-gradient(circle,rgba(23,54,93,0.06) 0%,transparent 70%)', filter:'blur(40px)' }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="section-label mb-4">{r.label}</p>
            <h2 className="section-title text-4xl sm:text-5xl mb-4" style={{ color:'#10243f' }}>
              {r.title1}{' '}
              <span style={{ background:'linear-gradient(135deg,#ef4444,#17365d)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                {r.title2}
              </span>
            </h2>
            <p className="max-w-md mx-auto" style={{ color:'#5d6f8c' }}>{r.sub}</p>
          </div>
        </ScrollReveal>
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3 flex flex-col gap-4">
            {rules.map(({ icon:Icon, text, color }, i) => (
              <ScrollReveal key={i} delay={i*0.1} direction="left">
                <motion.div whileHover={{ x:6 }} transition={{ duration:0.2 }}
                  className="flex items-start gap-5 rounded-2xl p-5 shadow-blue"
                  style={{ background:'#FFFFFF', border:`1px solid ${color}15` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:`${color}10` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <p className="text-sm leading-relaxed pt-1" style={{ color:'#2c4a73' }}>{text}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
          <div className="lg:col-span-2">
            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative rounded-3xl p-8 overflow-hidden shadow-blue"
                style={{ background:'linear-gradient(135deg,rgba(23,54,93,0.04),#FFFFFF)', border:'1px solid rgba(23,54,93,0.12)' }}>
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{ background:'linear-gradient(90deg,#17365d,#7655c8)' }} />
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background:'rgba(118,85,200,0.12)' }}>
                  <UserCheck size={24} style={{ color:'#7655c8' }} />
                </div>
                <h3 className="font-bold text-xl mb-4" style={{ fontFamily:'Fraunces,Georgia,serif', color:'#10243f' }}>{r.eligTitle}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color:'#2c4a73' }}>{r.eligP}</p>
                <div className="rounded-2xl p-4 mb-6" style={{ background:'rgba(23,54,93,0.05)', border:'1px solid rgba(23,54,93,0.12)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={14} style={{ color:'#17365d' }} />
                    <span className="text-xs font-bold tracking-wider uppercase" style={{ color:'#17365d' }}>{r.importantLabel}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color:'#5d6f8c' }}>{r.importantP}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background:'#7655c8' }} />
                  <span className="text-sm font-semibold" style={{ color:'#7655c8' }}>{r.live}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
