'use client'
import React from 'react';
// import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiLayers } from 'react-icons/fi';

export default function Projects() {
  // No filter, just show all projects
  const projects = [
    {
      id: 1,
      title: "Password Security Assessment Tool",
      description: "Built a full-stack app to assess password strength and check breach history via k-Anonymity API. Integrated Argon2 hashing, Redis caching, and JWT auth for stateless API protection. Designed an interactive dashboard for users to view password health analytics in real time.",
      demoUrl: "https://password-manager-eight-lovat.vercel.app",
      tags: ["security", "web", "python"],
      tech: ["Python", "FastAPI", "React", "Redis", "JWT", "Argon2", "k-Anonymity"],
      github: "https://github.com/SwayamDani/passwordManager",
      featured: true
    },
    {
      id: 2,
      title: "Web Crawler & Analyzer (Crawlit)",
      description: "Developed a modular async crawler with login support, deduplication, and error resilience. Enabled HTML parsing, link graph generation, and site metadata insights with 70% reduced latency. Built as a reusable library to power other automation tools and content bots.",
      demoUrl: null,
      tags: ["python", "web", "data"],
      tech: ["Python", "Asyncio", "SQLite", "BeautifulSoup"],
      github: "https://github.com/SwayamDani/crawlit",
      featured: true
    },
    {
      id: 3,
      title: "UniRideShare",
      description: "Engineered real-time college rideshare app supporting geolocation and secure Firebase auth. Implemented dynamic route filtering and user chat features to facilitate safer ride coordination.",
      demoUrl: "https://unirideshare.com",
      tags: ["web"],
      tech: ["Next.js", "Firebase", "Google Maps API"],
      github: "https://github.com/SwayamDani/unirideshare",
      featured: true
    },
    {
      id: 4,
      title: "StyleAI",
      description: "AI-powered fashion tool using OpenAI and DALL·E to generate personalized outfit recommendations and fashion insights.",
      demoUrl: "https://outfit-creator-one.vercel.app/",
      tags: ["ai", "web"],
      tech: ["OpenAI", "DALL·E", "React", "Node.js"],
      github: "https://github.com/SwayamDani/outfit_creator",
      featured: false
    },
    {
      id: 5,
      title: "DR.ai",
      description: "Streamlit-based medical Q&A application with GPT-3.5 integration, providing accurate health information and medical insights.",
      demoUrl: "https://web-production-4a51.up.railway.app/",
      tags: ["ai", "web"],
      tech: ["Python", "Streamlit", "GPT-3.5"],
      github: "https://github.com/SwayamDani/DR.ai",
      featured: false
    },
    {
      id: 6,
      title: "Travel Planner",
      description: "Flask app with API-driven itinerary generation and SQL caching, creating personalized travel plans based on user preferences and destinations.",
      demoUrl: "https://itinerary-generator-chi.vercel.app/",
      tags: ["ai", "web"],
      tech: ["Flask", "SQL", "API Integration"],
      github: "https://github.com/SwayamDani/itinerary_generator",
      featured: false
    },
    {
      id: 7,
      title: "Casino Game Suite",
      description: "Interactive C++ casino simulation featuring multiple games including Poker, Roulette, Blackjack, and Slot Machine. Implemented object-oriented programming principles, file handling, random number generation, and comprehensive testing with GTEST framework.",
      demoUrl: null,
      tags: ["c++", "games", "oop"],
      tech: ["C++", "CMake", "GTEST", "Object-Oriented Programming"],
      github: "https://github.com/SwayamDani/Casino",
      featured: false
    },
    {
      id: 8,
      title: "Political Roadmap Generator",
      description: "AI-powered political campaign strategy generator that creates comprehensive 18-slide roadmaps using real-time political intelligence. Features parallel web scraping across 10 intelligence categories, AI analysis with Llama 3.1 8B/Qwen 2.5 models, and generates consultant-grade strategies with budgets, timelines, and micro-targeting plans in 2-3 minutes.",
      demoUrl: null,
      tags: ["ai", "web", "python"],
      tech: ["Python", "FastAPI", "Next.js", "Ollama", "LLaMA 3.1", "SQLite", "Web Scraping"],
      github: "https://github.com/SwayamDani/Election-analysis-and-prediction",
      featured: true
    }
  ];



  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="container mx-auto py-32 px-4 md:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold mb-4 text-center bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">Projects</h2>
      <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
        A showcase of my recent work, personal projects, and hackathon creations.
      </p>



      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
  {projects.map((project) => (
          <motion.div
            key={project.id}
            className="relative group rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl hover:border-green-400/50"
            variants={item}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            {/* Gradient/shape accent */}
            <div className="absolute -z-10 -right-10 -top-10 w-56 h-56 bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 opacity-30 rounded-full blur-2xl"></div>
            {/* Featured badge */}
            {project.featured && (
              <span className="absolute top-4 left-4 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md z-20">Featured</span>
            )}
            <div className="relative w-full h-64 overflow-hidden rounded-t-3xl bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
              {project.demoUrl ? (
                <>
                  <iframe
                    src={project.demoUrl}
                    title={project.title}
                    className="w-full h-full border-0 rounded-t-3xl"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    sandbox="allow-scripts allow-same-origin"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-opacity duration-300 pointer-events-none"></div>
                </>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
                  </div>
                  {/* Icon and text overlay */}
                  <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
                    <div className="mb-4 p-6 rounded-2xl bg-gradient-to-br from-green-400/20 via-blue-400/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
                      <FiCode className="text-6xl text-green-400 dark:text-green-300" />
                    </div>
                    <p className="text-sm font-semibold text-gray-300 dark:text-gray-400 uppercase tracking-wider">
                      Code Available
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      View on GitHub
                    </p>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent"></div>
                </div>
              )}
            </div>
            <div className="p-7">
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                {project.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-green-200 via-blue-100 to-purple-200 dark:from-green-900 dark:via-blue-900 dark:to-purple-900 text-sm rounded-full font-semibold shadow-sm text-gray-800 dark:text-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link text-green-500 hover:text-blue-500 flex items-center font-bold transition-all duration-200 hover:scale-105"
                >
                  <FiGithub className="mr-2 group-hover/link:rotate-12 transition-transform" /> Code
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link text-green-500 hover:text-blue-500 flex items-center font-bold transition-all duration-200 hover:scale-105"
                  >
                    <FiExternalLink className="mr-2 group-hover/link:translate-x-1 transition-transform" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}