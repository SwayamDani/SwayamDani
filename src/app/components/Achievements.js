'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiBriefcase, FiAward, FiGithub } from 'react-icons/fi';

export default function Achievements() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const Counter = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!inView) return;

      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / duration;

        if (progress < 1) {
          setCount(Math.floor(end * progress));
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }, [inView, end, duration]);

    return <span>{count}{suffix}</span>;
  };

  const stats = [
    {
      icon: FiCode,
      value: 15,
      suffix: '+',
      label: 'Projects Completed',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: FiBriefcase,
      value: 3,
      suffix: '',
      label: 'Professional Internships',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: FiAward,
      value: 5,
      suffix: '+',
      label: 'Hackathons Participated',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: FiGithub,
      value: 50,
      suffix: '+',
      label: 'GitHub Contributions',
      color: 'from-orange-400 to-red-500'
    }
  ];

  return (
    <div ref={sectionRef} className="container mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="rounded-3xl bg-white/60 dark:bg-gray-900/60 shadow-2xl backdrop-blur-md border border-white/20 p-8 text-center hover:scale-105 transition-all duration-300">
              {/* Icon with gradient background */}
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} mb-4 shadow-lg`}>
                <stat.icon className="text-3xl text-white" />
              </div>

              {/* Counter */}
              <div className={`text-4xl font-extrabold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </p>

              {/* Decorative gradient line */}
              <div className={`mt-4 h-1 w-16 mx-auto rounded-full bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
