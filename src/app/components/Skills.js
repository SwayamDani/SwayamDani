'use client'
import React from 'react';
import { motion } from 'framer-motion';
import {
  TbBrain,
  TbCode,
  TbShieldCheck,
  TbCloud,
  TbApi,
  TbChartLine,
  TbRobot,
  TbNetwork,
} from 'react-icons/tb';

const specialties = [
  { name: 'AI/ML Engineering',       Icon: TbBrain },
  { name: 'Full-Stack Development',  Icon: TbCode },
  { name: 'Cybersecurity',           Icon: TbShieldCheck },
  { name: 'Cloud Computing',         Icon: TbCloud },
  { name: 'API Development',         Icon: TbApi },
  { name: 'Data Analytics',          Icon: TbChartLine },
  { name: 'LLM Fine-tuning',         Icon: TbRobot },
  { name: 'RAG Architecture',        Icon: TbNetwork },
];

const skillGroups = [
  {
    category: 'Languages',
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'SQL', 'HTML', 'CSS'],
  },
  {
    category: 'AI / ML',
    skills: ['NumPy', 'pandas', 'scikit-learn', 'TensorFlow', 'PyTorch', 'OpenCV', 'Hugging Face'],
  },
  {
    category: 'Frameworks',
    skills: ['FastAPI', 'React', 'Node.js', 'Next.js', 'Streamlit', 'Firebase', 'Redis', 'MongoDB'],
  },
  {
    category: 'Cloud & DevOps',
    skills: ['GCP', 'Heroku', 'Git', 'SQLite'],
  },
  {
    category: 'Security',
    skills: ['Argon2', 'JWT', 'API Encryption', 'k-Anonymity'],
  },
  {
    category: 'Tools',
    skills: ['Agile', 'Async Programming', 'Data Visualization', 'Figma'],
  },
];

// Flat list used for the marquee strip
const allSkills = skillGroups.flatMap((g) => g.skills);

export default function Skills() {
  return (
    <div className="py-32">
      {/* Section header */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-16">
        <motion.p
          className="text-[#64ffda] font-mono text-sm mb-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          03. skills
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Technical Toolkit
        </motion.h2>
        <motion.p
          className="text-slate-500 dark:text-slate-400 max-w-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Technologies I work with across different domains.
        </motion.p>
      </div>

      {/* Scrolling marquee strip */}
      <div className="overflow-hidden border-y border-slate-200 dark:border-slate-800/80 py-4 mb-20">
        <div className="animate-marquee flex gap-6">
          {[...allSkills, ...allSkills].map((skill, i) => (
            <span
              key={i}
              className="flex-shrink-0 px-4 py-1.5 text-sm font-mono font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60 rounded-full bg-white dark:bg-slate-900/40"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Skill categories grid */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {skillGroups.map((group, gi) => (
            <motion.div
              key={gi}
              className="p-6 bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800/80 rounded-lg hover:border-[#64ffda]/40 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: gi * 0.06 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs font-mono font-semibold text-[#64ffda] uppercase tracking-widest mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <span
                    key={si}
                    className="px-3 py-1 text-sm font-medium bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 rounded-full hover:bg-[#64ffda]/10 hover:text-[#64ffda] dark:hover:text-[#64ffda] transition-colors duration-150"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Specialty area cards */}
        <div>
          <h3 className="text-sm font-mono text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-8 text-center">
            Specialized Areas
          </h3>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {specialties.map(({ name, Icon }, i) => (
              <motion.div
                key={i}
                className="group flex flex-col items-center gap-3 p-5 bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800/80 rounded-lg hover:border-[#64ffda]/40 hover:bg-[#64ffda]/5 dark:hover:bg-[#64ffda]/5 transition-all duration-300 text-center cursor-default"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Icon
                  size={28}
                  className="text-slate-400 dark:text-slate-500 group-hover:text-[#64ffda] transition-colors duration-300"
                />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200 leading-tight">
                  {name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
