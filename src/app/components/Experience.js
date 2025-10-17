'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';

export default function Experience() {
  const [activeExperience, setActiveExperience] = useState(null);
  
  const experiences = [
    {
      id: 1,
      role: "AI/ML Intern",
      company: "HandsInTech",
      location: "Mumbai, India",
      duration: "June 2025 - Present",
      description: "Developing proprietary AI-powered political strategy generator using advanced LLM techniques and RAG architecture.",
      responsibilities: [
        "Solely developed a proprietary political strategy generator using LoRA-adapted LLaMA 3.1-8B and RAG architecture",
        "Fine-tuned domain-specific models with real-time crawled data and ground research from Maharashtra Vidhan Sabha",
        "Engineered a FastAPI backend with async LLM serving, SQLite analytics, and session-aware multi-source intelligence correlation",
        "Implemented advanced prompt engineering and retrieval-augmented generation for accurate policy recommendations"
      ],
      skills: ["Python", "LLaMA", "RAG", "FastAPI", "SQLite", "LoRA", "LLM Fine-tuning"]
    },
    {
      id: 2,
      role: "Marketing Operations Intern",
      company: "BCOE, UC Riverside",
      location: "Remote",
      duration: "July 2025 - September 2025",
      description: "Optimized project management workflows and created resources to enhance team efficiency.",
      responsibilities: [
        "Audited and redesigned Monday.com workflows to streamline project management across multiple teams",
        "Created comprehensive dashboards, templates, and training resources to boost team efficiency by 30%",
        "Collaborated with cross-functional teams to identify bottlenecks and implement process improvements",
        "Developed documentation that standardized operations procedures for future interns and staff"
      ],
      skills: ["Monday.com", "Project Management", "Process Optimization", "Documentation", "Agile"]
    },
    {
      id: 3,
      role: "Engineering Ambassador",
      company: "BCOE, UC Riverside",
      location: "Riverside, CA",
      duration: "April 2024 - June 2025",
      description: "Represented the College of Engineering at outreach events and on official social media platforms.",
      responsibilities: [
        "Represented the College of Engineering at recruitment events and community outreach programs",
        "Delivered technical presentations to prospective students, translating complex engineering concepts for diverse audiences",
        "Assisted in planning and executing major department events, contributing to a 15% increase in program applications",
        "Appeared as a student face on official social media platforms, expanding department visibility and engagement"
      ],
      skills: ["Presentation", "Technical Communication", "Leadership", "Event Planning", "Social Media"]
    }
  ];

  return (
    <div className="container mx-auto py-24 px-4 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-0 w-2/3 h-96 bg-gradient-to-br from-green-200/40 via-blue-200/30 to-purple-200/20 rounded-full blur-3xl -translate-x-1/2"></div>
      </div>
      <h2 className="text-4xl font-extrabold mb-4 text-center bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">Experience</h2>
      <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
        My professional journey and the skills I've developed along the way.
      </p>

      <div className="relative">
        {/* Gradient timeline connector */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-2 bg-gradient-to-b from-green-400 via-blue-400 to-purple-400 opacity-60 rounded-full"></div>

        {/* Experience items */}
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            className={`mb-16 flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="md:w-1/2"></div>

            {/* Timeline icon with gradient */}
            <div className="flex items-center justify-center relative z-10">
              <div className="absolute bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 p-2 rounded-full shadow-lg border-4 border-white dark:border-gray-900 animate-float">
                <FiBriefcase className="text-white text-2xl" />
              </div>
            </div>

            <div className="md:w-1/2 pt-4 md:pt-0 pl-8 md:pl-0 md:pr-8 md:mr-auto">
              <motion.div
                className={`rounded-3xl bg-white/60 dark:bg-gray-900/60 shadow-2xl backdrop-blur-md border border-white/20 p-8 cursor-pointer transition-all duration-300 ${
                  activeExperience === exp.id ? 'scale-105 shadow-3xl border-l-8 border-gradient-to-b from-green-400 via-blue-400 to-purple-400' : 'hover:shadow-xl'
                }`}
                onClick={() => setActiveExperience(activeExperience === exp.id ? null : exp.id)}
                animate={activeExperience === exp.id ? { y: -8, scale: 1.05 } : { y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{exp.role}</h3>
                <h4 className="text-xl text-green-500 mb-3">{exp.company}</h4>

                <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <FiCalendar className="mr-1" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="mr-1" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                <p className="mb-4 text-gray-700 dark:text-gray-300">{exp.description}</p>

                {activeExperience === exp.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <h5 className="font-bold mb-2 text-gray-700 dark:text-gray-300">Key Responsibilities:</h5>
                    <ul className="list-disc pl-5 mb-4 space-y-1 text-gray-600 dark:text-gray-400">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gradient-to-r from-green-200 via-blue-100 to-purple-200 dark:from-green-900 dark:via-blue-900 dark:to-purple-900 text-sm rounded-full font-semibold shadow-sm text-gray-800 dark:text-gray-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}