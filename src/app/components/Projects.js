'use client'
import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: "Password Security Assessment Tool",
      description: "A comprehensive cybersecurity application that helps users manage and assess the security of their passwords and online accounts.",
      image: "/images/projects/password-tool.jpg",
      tags: ["security", "web", "python"],
      tech: ["Python", "FastAPI", "Next.js", "React", "TypeScript"],
      github: "https://github.com/SwayamDani/password-security",
      demo: "https://password-security.vercel.app",
      featured: true
    },
    {
      id: 2,
      title: "StyleAI - AI Fashion Assistant",
      description: "AI-powered personal fashion assistant that helps users create outfit recommendations using artificial intelligence.",
      image: "/images/projects/styleai.jpg",
      tags: ["ai", "web"],
      tech: ["React.js", "Node.js", "Firebase", "OpenAI API", "DALL-E"],
      github: "https://github.com/SwayamDani/styleai",
      demo: "https://styleai.vercel.app",
      featured: true
    },
    {
      id: 3,
      title: "DR.ai - Citrus Hack Project",
      description: "An innovative medical information web application developed during the 36-hour UCR Citrus Hack competition.",
      image: "/images/projects/drai.jpg",
      tags: ["ai", "hackathon"],
      tech: ["Python", "Streamlit", "OpenAI API", "HTML", "CSS"],
      github: "https://github.com/SwayamDani/dr-ai",
      demo: "https://doctorai1.streamlit.app/",
      featured: true
    },
    {
      id: 4,
      title: "Travel Itinerary Producer",
      description: "An intelligent travel planning application that generates personalized itineraries based on user preferences.",
      image: "/images/projects/travel-itinerary.jpg",
      tags: ["ai", "web"],
      tech: ["OpenAI API", "JavaScript", "Node.js", "CSS", "HTML"],
      github: "https://github.com/SwayamDani/travel-planner",
      demo: "https://travel-itinerary.vercel.app",
      featured: false
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(filter));

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
    <div className="container mx-auto py-20 px-4">
      <h2 className="text-4xl font-bold mb-4 text-center">Projects</h2>
      <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
        A showcase of my recent work, personal projects, and hackathon creations.
      </p>

      <div className="flex justify-center mb-12">
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full ${
              filter === 'all' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            } hover:bg-green-500 hover:text-white transition duration-300`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('security')}
            className={`px-6 py-2 rounded-full ${
              filter === 'security' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            } hover:bg-green-500 hover:text-white transition duration-300`}
          >
            Security
          </button>
          <button
            onClick={() => setFilter('ai')}
            className={`px-6 py-2 rounded-full ${
              filter === 'ai' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            } hover:bg-green-500 hover:text-white transition duration-300`}
          >
            AI
          </button>
          <button
            onClick={() => setFilter('web')}
            className={`px-6 py-2 rounded-full ${
              filter === 'web' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            } hover:bg-green-500 hover:text-white transition duration-300`}
          >
            Web
          </button>
          <button
            onClick={() => setFilter('hackathon')}
            className={`px-6 py-2 rounded-full ${
              filter === 'hackathon' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            } hover:bg-green-500 hover:text-white transition duration-300`}
          >
            Hackathon
          </button>
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={item}
          >
            <div className="relative h-64 w-full">
              <Image 
                src={project.image} 
                alt={project.title} 
                layout="fill" 
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex space-x-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-white rounded-full text-gray-900 hover:bg-green-500 hover:text-white transition duration-300"
                  >
                    <FiGithub size={20} />
                  </a>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-white rounded-full text-gray-900 hover:bg-green-500 hover:text-white transition duration-300"
                  >
                    <FiExternalLink size={20} />
                  </a>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full"
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
                  className="text-green-500 hover:text-green-600 flex items-center"
                >
                  <FiGithub className="mr-2" /> Code
                </a>
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-600 flex items-center"
                >
                  <FiExternalLink className="mr-2" /> Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}