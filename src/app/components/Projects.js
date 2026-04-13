'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';

const PROJECTS = [
    {
      id: 9,
      title: 'AlphaLens',
      description:
        'Quantitative signal research platform with an end-to-end async pipeline: financial news crawl, semantic embedding with sentence-transformers + pgvector (IVFFlat), alpha feature generation, and real-time Telegram alerts for a 50-stock universe. Includes IC/signal-decay tracking, multi-service orchestration via PostgreSQL, and Railway deployment with TimescaleDB-backed time-series storage/backtesting.',
      demoUrl: null,
      screenshot: null,
      tech: ['Python', 'FastAPI', 'TimescaleDB', 'pgvector'],
      github: null,
      featured: true,
    },
    {
      id: 10,
      title: 'Swarm',
      description:
        'Privacy-first federated AI workspace built during Qualcomm Multiverse Hackathon: local LLM nodes coordinated through federated RAG with zero data egress. Implemented MCP integrations (Gmail, Calendar, Slack, GitHub, Notion) for cross-source queries, plus a Railway relay architecture for peer discovery/session routing under latency constraints.',
      demoUrl: null,
      screenshot: null,
      tech: ['Python', 'FastAPI', 'Ollama', 'RAG', 'MCP'],
      github: 'https://github.com/SwayamDani/Swarm',
      featured: true,
    },
    {
      id: 1,
      title: 'Password Security Assessment Tool',
      description:
        'Full-stack app to assess password strength and check breach history via k-Anonymity API. Integrated Argon2 hashing, Redis caching, and JWT auth for stateless API protection. Interactive dashboard for real-time password health analytics.',
      demoUrl: 'https://password-manager-eight-lovat.vercel.app',
      screenshot: '/assets/projects/password-manager.png',
      tech: ['Python', 'FastAPI', 'React', 'Redis', 'JWT', 'Argon2'],
      github: 'https://github.com/SwayamDani/passwordManager',
      featured: true,
    },
    {
      id: 8,
      title: 'Political Roadmap Generator',
      description:
        'AI-powered campaign strategy generator producing 18-slide roadmaps using real-time political intelligence. Parallel web scraping across 10 categories, Llama 3.1 8B analysis, consultant-grade output in 2–3 minutes.',
      demoUrl: null,
      screenshot: null,
      tech: ['Python', 'FastAPI', 'Next.js', 'LLaMA 3.1', 'Ollama', 'SQLite'],
      github: 'https://github.com/SwayamDani/Election-analysis-and-prediction',
      featured: true,
    },
    {
      id: 3,
      title: 'UniRideShare',
      description:
        'Real-time college rideshare platform with geolocation, secure Firebase auth, dynamic route filtering, and user chat for safer ride coordination.',
      demoUrl: 'https://unirideshare.com',
      screenshot: '/assets/projects/unirideshare.png',
      tech: ['Next.js', 'Firebase', 'Google Maps API'],
      github: 'https://github.com/SwayamDani/unirideshare',
      featured: true,
    },
    {
      id: 2,
      title: 'Web Crawler & Analyzer (Crawlit)',
      description:
        'Modular async crawler with login support, deduplication, and error resilience. HTML parsing, link graph generation, and site metadata insights with 70% reduced latency.',
      demoUrl: null,
      screenshot: null,
      tech: ['Python', 'Asyncio', 'SQLite', 'BeautifulSoup'],
      github: 'https://github.com/SwayamDani/crawlit',
      featured: false,
    },
    {
      id: 4,
      title: 'StyleAI',
      description:
        'AI-powered fashion tool using OpenAI and DALL·E to generate personalized outfit recommendations and fashion insights.',
      demoUrl: 'https://outfit-creator-one.vercel.app/',
      screenshot: '/assets/projects/styleai.png',
      tech: ['OpenAI', 'DALL·E', 'React', 'Node.js'],
      github: 'https://github.com/SwayamDani/outfit_creator',
      featured: false,
    },
    {
      id: 5,
      title: 'DR.ai',
      description:
        'Streamlit-based medical Q&A application with GPT-3.5 integration for accurate health information and medical insights.',
      demoUrl: 'https://web-production-4a51.up.railway.app/',
      screenshot: '/assets/projects/drai.png',
      tech: ['Python', 'Streamlit', 'GPT-3.5'],
      github: 'https://github.com/SwayamDani/DR.ai',
      featured: false,
    },
    {
      id: 6,
      title: 'Travel Planner',
      description:
        'Flask app with API-driven itinerary generation and SQL caching, creating personalized travel plans based on user preferences.',
      demoUrl: 'https://itinerary-generator-chi.vercel.app/',
      screenshot: '/assets/projects/travel-planner.png',
      tech: ['Flask', 'SQL', 'API Integration'],
      github: 'https://github.com/SwayamDani/itinerary_generator',
      featured: false,
    },
    {
      id: 7,
      title: 'Casino Game Suite',
      description:
        'Interactive C++ casino simulation — Poker, Roulette, Blackjack, Slots — using OOP, file handling, RNG, and full GTEST coverage.',
      demoUrl: null,
      screenshot: null,
      tech: ['C++', 'CMake', 'GTEST', 'OOP'],
      github: 'https://github.com/SwayamDani/Casino',
      featured: false,
    },
];

export default function Projects() {

  const featured = PROJECTS.filter((p) => p.featured);
  const rest     = PROJECTS.filter((p) => !p.featured);

  return (
    <div className="py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">

        {/* Section header */}
        <motion.p
          className="text-[#64ffda] font-mono text-sm mb-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          04. projects
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Things I've Built
        </motion.h2>
        <motion.p
          className="text-slate-500 dark:text-slate-400 max-w-xl mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          A selection of projects, from side experiments to production systems.
        </motion.p>

        {/* Featured projects — alternate image left/right */}
        <div className="flex flex-col gap-12 mb-20">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              className={`group relative grid md:grid-cols-2 gap-0 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800/80 hover:border-[#64ffda]/30 transition-colors duration-300 ${
                i % 2 === 1 ? 'md:flex md:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Image pane */}
              <div className="relative aspect-video md:aspect-auto overflow-hidden bg-slate-900">
                {project.screenshot ? (
                  <>
                    <Image
                      src={project.screenshot}
                      alt={`${project.title} screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1e]/20 to-transparent" />
                  </>
                ) : (
                  <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0a0f1e] via-[#0d1117] to-[#0a1628]">
                    <FiCode size={36} className="text-[#64ffda]/30" />
                    <span className="text-[10px] font-mono tracking-[0.3em] text-[#64ffda]/30 uppercase">Proprietary</span>
                  </div>
                )}
              </div>

              {/* Content pane */}
              <div className="flex flex-col justify-center p-8 lg:p-12 bg-white dark:bg-[#0d1117]">
                <span className="text-xs font-mono text-[#64ffda] mb-2 uppercase tracking-widest">
                  Featured Project
                </span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {project.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, ti) => (
                    <span
                      key={ti}
                      className="px-2.5 py-1 text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-5">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-[#64ffda] transition-colors duration-200"
                      aria-label="GitHub"
                    >
                      <FiGithub size={20} />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-[#64ffda] transition-colors duration-200"
                      aria-label="Live Demo"
                    >
                      <FiExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other projects grid */}
        <h3 className="text-sm font-mono text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-8 text-center">
          Other Notable Work
        </h3>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {rest.map((project, i) => (
            <motion.div
              key={project.id}
              className="group flex flex-col p-6 bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800/80 rounded-lg hover:border-[#64ffda]/40 hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              viewport={{ once: true }}
            >
              {/* Top row */}
              <div className="flex justify-between items-start mb-5">
                <FiCode size={26} className="text-[#64ffda]" />
                <div className="flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-[#64ffda] transition-colors"
                      aria-label="GitHub"
                    >
                      <FiGithub size={18} />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-[#64ffda] transition-colors"
                      aria-label="Live Demo"
                    >
                      <FiExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#64ffda] transition-colors duration-200">
                {project.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1 mb-5">
                {project.description}
              </p>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.tech.slice(0, 4).map((t, ti) => (
                  <span
                    key={ti}
                    className="text-xs font-mono text-slate-500 dark:text-slate-500"
                  >
                    {ti > 0 && <span className="mr-1.5 opacity-40">·</span>}
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
