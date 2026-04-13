'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiMapPin, FiChevronDown } from 'react-icons/fi';

export default function Experience() {
  const [activeId, setActiveId] = useState(null);

  const experiences = [
    {
      id: 1,
      role: 'AI/ML Intern',
      company: 'HandsInTech',
      location: 'Mumbai, India',
      duration: 'June 2025 – Sep 2025',
      description:
        'Developing proprietary AI-powered political strategy generator using advanced LLM techniques and RAG architecture.',
      responsibilities: [
        'Solely built a proprietary political strategy generator using LoRA-adapted LLaMA 3.1-8B and RAG architecture',
        'Fine-tuned domain-specific models with real-time crawled data from Maharashtra Vidhan Sabha ground research',
        'Engineered a FastAPI backend with async LLM serving, SQLite analytics, and session-aware multi-source intelligence correlation',
        'Implemented advanced prompt engineering and retrieval-augmented generation for accurate policy recommendations',
      ],
      skills: ['Python', 'LLaMA', 'RAG', 'FastAPI', 'SQLite', 'LoRA', 'LLM Fine-tuning'],
    },
    {
      id: 2,
      role: 'Marketing Operations Intern',
      company: 'BCOE, UC Riverside',
      location: 'Riverside, CA',
      duration: 'Jul 2025 – Sep 2025',
      description: 'Audited and redesigned Monday.com workflows to streamline project management.',
      responsibilities: [
        'Audited and redesigned Monday.com workflows to streamline project management',
        'Created dashboards, templates, and training resources to boost team efficiency',
      ],
      skills: ['Monday.com', 'Project Management', 'Process Optimization', 'Documentation'],
    },
    {
      id: 3,
      role: 'Engineering Ambassador',
      company: 'BCOE, UC Riverside',
      location: 'Riverside, CA',
      duration: 'April 2024 – June 2025',
      description: 'Represented the College of Engineering at outreach events and on official social media platforms.',
      responsibilities: [
        'Represented the College of Engineering at outreach and recruitment events',
        'Assisted in planning and executing campus events',
        'Appeared as a student face on official social media platforms',
      ],
      skills: ['Presentation', 'Technical Communication', 'Leadership', 'Event Planning'],
    },
  ];

  return (
    <div className="py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">

        {/* Section header */}
        <motion.p
          className="text-[#64ffda] font-mono text-sm mb-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          05. experience
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Where I've Worked
        </motion.h2>
        <motion.p
          className="text-slate-500 dark:text-slate-400 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Professional experience and the impact I've driven.
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                className="relative pl-12"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 top-5 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    activeId === exp.id
                      ? 'border-[#64ffda] bg-[#64ffda]/10'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0a0f1e]'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      activeId === exp.id ? 'bg-[#64ffda]' : 'bg-slate-400 dark:bg-slate-600'
                    }`}
                  />
                </div>

                {/* Card */}
                <div
                  className={`p-6 rounded-lg border cursor-pointer transition-all duration-300 ${
                    activeId === exp.id
                      ? 'bg-white dark:bg-[#0d1117] border-[#64ffda]/40 shadow-lg'
                      : 'bg-white dark:bg-[#0d1117] border-slate-200 dark:border-slate-800/80 hover:border-[#64ffda]/30'
                  }`}
                  onClick={() => setActiveId(activeId === exp.id ? null : exp.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5">
                        {exp.role}
                      </h3>
                      <h4 className="text-[#64ffda] font-medium text-sm mb-3">{exp.company}</h4>

                      <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-500 font-mono">
                        <span className="flex items-center gap-1.5">
                          <FiCalendar size={12} /> {exp.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FiMapPin size={12} /> {exp.location}
                        </span>
                      </div>
                    </div>

                    <FiChevronDown
                      size={18}
                      className={`flex-shrink-0 mt-1 text-slate-400 transition-transform duration-300 ${
                        activeId === exp.id ? 'rotate-180 text-[#64ffda]' : ''
                      }`}
                    />
                  </div>

                  {/* Expandable details */}
                  <AnimatePresence>
                    {activeId === exp.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-4">
                          {exp.description}
                        </p>
                        <ul className="mt-3 space-y-2">
                          {exp.responsibilities.map((r, ri) => (
                            <li
                              key={ri}
                              className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                            >
                              <span className="text-[#64ffda] mt-1 flex-shrink-0 text-xs">▸</span>
                              {r}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2 mt-5">
                          {exp.skills.map((s, si) => (
                            <span
                              key={si}
                              className="px-2.5 py-1 text-xs font-mono bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 rounded"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
