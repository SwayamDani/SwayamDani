'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <div className="py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-[#64ffda] font-mono text-sm mb-4">01. about me</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Computer Science<br />
              <span className="text-slate-500 dark:text-slate-500 font-normal">@ UC San Diego</span>
            </h2>

            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                I'm a CS student at UC San Diego with a 3.65 GPA, with coursework spanning
                Algorithms, Systems Programming, Cybersecurity, Databases, and Ethics in Tech.
              </p>
              <p>
                Currently working as an AI/ML Intern at <span className="text-gray-900 dark:text-white font-medium">HandsInTech</span>, where
                I solely built a proprietary political strategy generator using LoRA-adapted
                LLaMA 3.1-8B and RAG architecture — from data pipeline to production API.
              </p>
              <p>
                I'm most interested in the intersection of AI systems and engineering rigor:
                fine-tuning domain-specific models, building the infrastructure that makes them
                useful, and shipping software that combines technical depth with real business value.
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-slate-200 dark:border-slate-800">
              {[
                { value: '3.65', label: 'GPA' },
                { value: '3+', label: 'Years coding' },
                { value: '15+', label: 'Projects shipped' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-[#64ffda] font-display">{value}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">{label}</div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#64ffda] text-[#64ffda] text-sm font-semibold rounded-sm hover:bg-[#64ffda]/10 transition-colors duration-200"
              >
                Get in touch
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            {/* Accent border offset */}
            <div className="absolute -inset-0 rounded-xl border-2 border-[#64ffda]/30 translate-x-3 translate-y-3" />
            <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-slate-900">
              <Image
                src="/assets/images/profile.jpg"
                alt="Swayam Dani"
                fill
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 400px"
                className="object-cover transition-transform duration-700 hover:scale-103"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-[#64ffda]/10 mix-blend-color hover:opacity-0 transition-opacity duration-300" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
