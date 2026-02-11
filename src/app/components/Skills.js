'use client'
import React from 'react';
import { motion } from 'framer-motion';

export default function Skills() {
  // Technical skills data
  const technicalSkills = [
    {
      category: "Programming Languages",
      skills: [
        "Python", "Java", "JavaScript", "TypeScript", "C++", "SQL", "HTML", "CSS"
      ]
    },
    {
      category: "AI/ML Libraries",
      skills: [
        "NumPy", "pandas", "scikit-learn", "TensorFlow", "PyTorch", "OpenCV", "Hugging Face Transformers"
      ]
    },
    {
      category: "Frameworks & Libraries",
      skills: [
        "FastAPI", "React", "Node.js", "Next.js", "Streamlit", "Firebase", "Redis", "MongoDB"
      ]
    },
    {
      category: "Cloud & DevOps",
      skills: [
        "Google Cloud Platform (GCP)", "Heroku", "Git", "SQLite"
      ]
    },
    {
      category: "Security & Authentication",
      skills: [
        "Argon2", "JWT", "API Encryption", "k-Anonymity"
      ]
    },
    {
      category: "Tools & Methodologies",
      skills: [
        "Agile", "Asynchronous Programming", "Data Visualization", "Figma"
      ]
    }
  ];

  return (
    <div className="container mx-auto py-32 px-4 md:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold mb-4 text-center bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">Technical Skills</h2>
      <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
        My technical toolkit across different technologies.
      </p>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {technicalSkills.map((skillGroup, groupIndex) => (
          <motion.div
            key={groupIndex}
            className="rounded-3xl bg-white/70 dark:bg-gray-900/70 shadow-2xl backdrop-blur-md border border-white/20 p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{skillGroup.category}</h3>
            <div className="flex flex-wrap gap-3">
              {skillGroup.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-green-200 via-blue-100 to-purple-200 dark:from-green-900 dark:via-blue-900 dark:to-purple-900 rounded-full text-sm font-semibold shadow-sm text-gray-800 dark:text-gray-200 hover:scale-105 transition-transform duration-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: (groupIndex * 0.1) + (index * 0.05) }}
                  viewport={{ once: true }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="mt-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-8 text-center">Specialized Areas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { name: "AI/ML Engineering", icon: "fas fa-brain" },
            { name: "Full-Stack Development", icon: "fas fa-laptop-code" },
            { name: "Cybersecurity", icon: "fas fa-shield-alt" },
            { name: "Cloud Computing", icon: "fas fa-cloud" },
            { name: "API Development", icon: "fas fa-code-branch" },
            { name: "Data Analytics", icon: "fas fa-chart-line" },
            { name: "LLM Fine-tuning", icon: "fas fa-robot" },
            { name: "RAG Architecture", icon: "fas fa-network-wired" }
          ].map((specialty, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <i className={`${specialty.icon} text-4xl text-green-500 mb-4`}></i>
              <h4 className="font-bold">{specialty.name}</h4>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}