'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiUser, FiAward, FiCalendar } from 'react-icons/fi';

export default function About() {
  const skills = [
    "JavaScript", "React", "Python", "Node.js", "TypeScript", 
    "Next.js", "FastAPI", "Firebase", "Git", "UI/UX Design"
  ];

  return (
    <div className="container mx-auto py-20 px-4">
      <h2 className="text-4xl font-bold mb-4 text-center">About Me</h2>
      <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
        A passionate developer at the intersection of technology and business.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="w-full h-[450px] relative rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/assets/images/profile.jpg"
              alt="Swayam Dani"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          
          <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-green-500 rounded-xl -z-10"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-6">Computer Science & Business Applications Student</h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            I'm a Computer Science and Business Applications student at UC Riverside with a passion for creating 
            innovative technology solutions. Combining strong technical skills in software development, AI/ML, 
            and cybersecurity with a business-focused approach, I build projects that solve real-world problems.
          </p>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            My goal is to develop software that makes a positive impact while maintaining the highest standards 
            of security and user experience. I'm particularly interested in the intersection of AI and practical 
            business applications.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FiUser className="text-green-600 dark:text-green-300 text-xl" />
              </div>
              <h4 className="font-bold mb-1">Experience</h4>
              <p className="text-gray-600 dark:text-gray-400">3+ Years Coding</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FiAward className="text-green-600 dark:text-green-300 text-xl" />
              </div>
              <h4 className="font-bold mb-1">Education</h4>
              <p className="text-gray-600 dark:text-gray-400">BS CSBA @ UCR</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FiCalendar className="text-green-600 dark:text-green-300 text-xl" />
              </div>
              <h4 className="font-bold mb-1">Projects</h4>
              <p className="text-gray-600 dark:text-gray-400">10+ Completed</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-6">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
          
          <div className="mt-8">
            <a 
              href="#contact"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 inline-flex items-center"
            >
              Let's Connect
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}