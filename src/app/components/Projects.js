'use client'
import React from 'react';
// import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

export default function Projects() {
  // No filter, just show all projects
  const projects = [
    {
      id: 1,
      title: "Password Security Assessment Tool",
      description: "Full-stack cybersecurity application with k-Anonymity API integration and Argon2 hashing, featuring Redis caching, JWT authentication, and secure password management.",
      demoUrl: "https://password-manager-eight-lovat.vercel.app",
      tags: ["security", "web", "python"],
      tech: ["Python", "FastAPI", "Next.js", "React", "TypeScript", "Redis", "JWT", "Argon2"],
      github: "https://github.com/SwayamDani/passwordManager",
      featured: true
    },
    {
      id: 2,
      title: "Web Crawler - Crawlit",
      description: "High-performance asynchronous web crawler leveraging BeautifulSoup and concurrent processing to achieve 70% latency reduction for large-scale data extraction.",
      demoUrl: null,
      tags: ["python", "web", "data"],
      tech: ["Python", "BeautifulSoup", "AsyncIO", "Requests", "HTML Parsing"],
      github: "https://github.com/SwayamDani/crawlit",
      featured: true
    },
    {
      id: 3,
      title: "UniRideShare",
      description: "University-focused rideshare platform with Firebase backend and Google Maps integration, connecting students for safe campus commutes.",
      demoUrl: "https://unirideshare.com",
      tags: ["web"],
      tech: ["React.js", "Firebase", "Firestore", "Google Maps API", "JavaScript", "CSS"],
      github: "https://github.com/SwayamDani/unirideshare",
      featured: true
    },
    {
      id: 4,
      title: "StyleAI - AI Fashion Assistant",
      description: "AI-powered personal fashion assistant that helps users create outfit recommendations using OpenAI and DALL-E integration.",
      demoUrl: "https://outfit-creator-one.vercel.app/",
      tags: ["ai", "web"],
      tech: ["React.js", "Node.js", "Firebase", "OpenAI API", "DALL-E"],
      github: "https://github.com/SwayamDani/outfit_creator",
      featured: true
    },
    {
      id: 5,
      title: "DR.ai - Citrus Hack Project",
      description: "Medical information web application developed during the 36-hour UCR Citrus Hack competition, providing AI-driven health insights.",
      demoUrl: "https://web-production-4a51.up.railway.app/",
      tags: ["ai", "web"],
      tech: ["Python", "Streamlit", "OpenAI API", "HTML", "CSS"],
      github: "https://github.com/SwayamDani/DR.ai",
      featured: false
    },
    {
      id: 6,
      title: "Travel Itinerary Producer",
      description: "Intelligent travel planning application that generates personalized itineraries based on user preferences and AI recommendations.",
      demoUrl: "https://itinerary-generator-chi.vercel.app/",
      tags: ["ai", "web"],
      tech: ["OpenAI API", "JavaScript", "Node.js", "CSS", "HTML"],
      github: "https://github.com/SwayamDani/itinerary_generator",
      featured: false
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
    <div className="container mx-auto py-24 px-4">
      <h2 className="text-4xl font-extrabold mb-4 text-center bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">Projects</h2>
      <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
        A showcase of my recent work, personal projects, and hackathon creations.
      </p>



      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
  {projects.map((project) => (
          <motion.div
            key={project.id}
            className="relative group rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md transition-all duration-300 hover:scale-[1.025] hover:shadow-3xl"
            variants={item}
            whileHover={{ y: -6, scale: 1.03 }}
          >
            {/* Gradient/shape accent */}
            <div className="absolute -z-10 -right-10 -top-10 w-56 h-56 bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 opacity-30 rounded-full blur-2xl"></div>
            {/* Featured badge */}
            {project.featured && (
              <span className="absolute top-4 left-4 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md z-20">Featured</span>
            )}
            {project.demoUrl && (
              <div className="relative w-full h-64 overflow-hidden rounded-t-3xl">
                <iframe
                  src={project.demoUrl}
                  title={project.title}
                  className="w-full h-full border-0 rounded-t-3xl"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  sandbox="allow-scripts allow-same-origin"
                />
                <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            )}
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
              <div className="flex justify-between mt-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-blue-500 flex items-center font-bold transition-colors duration-200"
                >
                  <FiGithub className="mr-2" /> Code
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-blue-500 flex items-center font-bold transition-colors duration-200"
                  >
                    <FiExternalLink className="mr-2" /> Live Demo
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