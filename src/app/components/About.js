'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiUser, FiAward, FiCalendar } from 'react-icons/fi';

export default function About() {
  const skills = [
    "Python", "JavaScript", "TypeScript", "React", "Next.js",
    "FastAPI", "Node.js", "TensorFlow", "PyTorch", "Firebase",
    "Redis", "MongoDB", "Git", "GCP", "UI/UX Design"
  ];

  return (
    <div className="container mx-auto py-24 px-4">
      <h2 className="text-4xl font-extrabold mb-3 text-center bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">About Me</h2>
      <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-4 max-w-2xl mx-auto font-semibold tracking-wide">
        <span className="inline-block px-4 py-2 rounded-xl bg-white/60 dark:bg-gray-900/60 shadow-md backdrop-blur-md border border-white/20">
          My mission: <span className="text-green-500 font-bold">Build beautiful, impactful technology for real people.</span>
        </span>
      </p>
      <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
        A passionate developer at the intersection of technology and business.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Profile Image with gradient/shape */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="w-full h-[450px] relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30">
            <Image
              src="/assets/images/profile.jpg"
              alt="Swayam Dani"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Abstract gradient shape */}
            <div className="absolute -z-10 -right-10 -bottom-10 w-72 h-72 bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 opacity-60 rounded-full blur-2xl"></div>
          </div>
        </motion.div>

        {/* Glassmorphism card for text content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="rounded-3xl bg-white/60 dark:bg-gray-900/60 shadow-2xl backdrop-blur-md border border-white/20 p-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Computer Science Student • UC San Diego</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              I'm a Computer Science student at  UC San Diego. 
              With hands-on experience in AI/ML, full-stack development, and cybersecurity, I build innovative 
              solutions that solve real-world problems and make a tangible impact.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Currently working as an AI/ML Intern at HandsInTech, where I develop proprietary political strategy 
              generators using LLaMA 3.1-8B with RAG architecture. I'm passionate about leveraging cutting-edge 
              AI technologies and creating software that combines technical excellence with practical business value.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-xl shadow-md flex flex-col items-center">
                <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <FiUser className="text-green-600 dark:text-green-300 text-xl" />
                </div>
                <h4 className="font-bold mb-1">Experience</h4>
                <p className="text-gray-600 dark:text-gray-400">3+ Years Coding</p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-xl shadow-md flex flex-col items-center">
                <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <FiAward className="text-green-600 dark:text-green-300 text-xl" />
                </div>
                <h4 className="font-bold mb-1">Education</h4>
                <p className="text-gray-600 dark:text-gray-400">UCSD (Transfer)</p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-xl shadow-md flex flex-col items-center">
                <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <FiCalendar className="text-green-600 dark:text-green-300 text-xl" />
                </div>
                <h4 className="font-bold mb-1">Projects</h4>
                <p className="text-gray-600 dark:text-gray-400">10+ Completed</p>
              </div>
            </div>

            {/* Animated skill tags */}
            <motion.div
              className="flex flex-wrap gap-2 mt-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.07
                  }
                }
              }}
            >
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-sm font-semibold shadow-sm hover:bg-green-100 dark:hover:bg-green-900 transition-colors duration-200 cursor-pointer"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            <div className="mt-8 text-center">
              <a
                href="#contact"
                className="group bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-bold py-3 px-7 rounded-full shadow-lg transition-all duration-300 inline-flex items-center focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Let's Connect
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}