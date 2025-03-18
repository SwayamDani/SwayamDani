'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';

export default function Experience() {
  const [activeExperience, setActiveExperience] = useState(null);
  
  const experiences = [
    {
      id: 1,
      role: "Bourns College of Engineering - Ambassador",
      company: "University of California - Riverside",
      location: "Riverside, CA",
      duration: "April 2024 - Present",
      description: "Representing the College of Engineering to prospective students and the community.",
      responsibilities: [
        "Deliver engaging technical presentations, translating complex engineering concepts for diverse audiences",
        "Develop technical documentation and educational materials used by 500+ engineering students",
        "Represent the College at recruitment events, contributing to a 15% increase in STEM program applications",
        "Collaborate with faculty to create innovative outreach programs, expanding department visibility"
      ],
      skills: ["Presentation", "Technical Writing", "Leadership", "Communication"]
    },
    {
      id: 2,
      role: "Intern",
      company: "Magnum Equity Broking Limited",
      location: "Mumbai, India",
      duration: "March 2022 - May 2022",
      description: "Streamlined client onboarding and documentation processes for a major equity broking firm.",
      responsibilities: [
        "Optimized client onboarding process, reducing verification time by 30% while maintaining compliance",
        "Streamlined documentation workflow for 50,000+ client records, implementing digital efficiency measures",
        "Conducted 80+ client interviews with a 98% accuracy rate for financial information verification",
        "Proposed and implemented a digital classification system that improved interdepartmental communication"
      ],
      skills: ["Data Management", "Process Optimization", "KYC Regulations", "Client Relations"]
    },
    {
      id: 3,
      role: "Tech Intern",
      company: "High School Moms",
      location: "Mumbai, India",
      duration: "March 2021 - May 2021",
      description: "Contributed to the development of an educational technology platform to help students find academic opportunities.",
      responsibilities: [
        "Collaborated with a global team to develop the GIDE.AI educational technology platform",
        "Compiled a comprehensive database of 200+ universities and academic programs",
        "Implemented data organization protocols that improved search efficiency by 40%",
        "Created user-focused documentation that resulted in a 25% increase in platform adoption rate"
      ],
      skills: ["Database Management", "Research", "Data Organization", "Documentation"]
    }
  ];

  return (
    <div className="container mx-auto py-20 px-4">
      <h2 className="text-4xl font-bold mb-4 text-center">Experience</h2>
      <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
        My professional journey and the skills I've developed along the way.
      </p>

      <div className="relative">
        {/* Timeline connector */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-green-200 dark:bg-green-900"></div>
        
        {/* Experience items */}
        {experiences.map((exp, index) => (
          <motion.div 
            key={exp.id}
            className={`mb-12 flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="md:w-1/2"></div>
            
            <div className="flex items-center justify-center">
              <div className="absolute bg-white dark:bg-gray-900 p-2 rounded-full border-4 border-green-500">
                <FiBriefcase className="text-green-500 text-2xl" />
              </div>
            </div>
            
            <div className="md:w-1/2 pt-4 md:pt-0 pl-8 md:pl-0 md:pr-8 md:mr-auto md:text-right md:items-end">
              <div 
                className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${
                  activeExperience === exp.id ? 'transform scale-105 shadow-xl border-l-4 border-green-500' : 'hover:shadow-xl'
                }`}
                onClick={() => setActiveExperience(activeExperience === exp.id ? null : exp.id)}
              >
                <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
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
                
                <p className="mb-4">{exp.description}</p>
                
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
                          className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}