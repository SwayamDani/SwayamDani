'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiBriefcase, FiAward, FiGithub } from 'react-icons/fi';

function Counter({ end, duration = 1800, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let startTime;
    let raf;
    const animate = (now) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor(end * progress));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [started, end, duration]);

  return (
    <span onViewportEnter={() => setStarted(true)}>
      {count}{suffix}
    </span>
  );
}

export default function Achievements() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const stats = [
    { Icon: FiCode,      value: 15, suffix: '+', label: 'Projects Completed',    accent: '#64ffda' },
    { Icon: FiBriefcase, value: 3,  suffix: '',  label: 'Professional Internships', accent: '#64ffda' },
    { Icon: FiAward,     value: 5,  suffix: '+', label: 'Hackathons Participated', accent: '#64ffda' },
    { Icon: FiGithub,    value: 50, suffix: '+', label: 'GitHub Contributions',  accent: '#64ffda' },
  ];

  return (
    <div ref={ref} className="py-20 border-y border-slate-200 dark:border-slate-800/60">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {stats.map(({ Icon, value, suffix, label, accent }, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <Icon size={24} style={{ color: accent }} className="mb-3 opacity-80" />
              <div
                className="text-4xl sm:text-5xl font-bold font-display mb-2 tabular-nums"
                style={{ color: accent }}
              >
                {inView ? (
                  <AnimatedCounter end={value} suffix={suffix} />
                ) : (
                  <span>0{suffix}</span>
                )}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-500 font-medium">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function AnimatedCounter({ end, suffix, duration = 1800 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let raf;
    const animate = (now) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor(end * progress));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);

  return <>{count}{suffix}</>;
}
