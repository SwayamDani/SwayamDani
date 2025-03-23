'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiClock, FiArrowRight, FiCode, FiLayers, FiTerminal } from 'react-icons/fi';
import { getAllTutorials } from '../utils/tutorialData';

export default function Tutorials() {
  const [filter, setFilter] = useState('all');
  
  // Get tutorials from the data utility
  const tutorials = getAllTutorials();
  
  // Filter tutorials based on selected category
  const filteredTutorials = filter === 'all' 
    ? tutorials 
    : tutorials.filter(tutorial => tutorial.category === filter);

  // Get unique categories from tutorials for filter buttons
  const categories = ['all', ...new Set(tutorials.map(tutorial => tutorial.category))];

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
      <h2 className="text-4xl font-bold mb-4 text-center">Tutorials</h2>
      <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
        Step-by-step guides to help you build impressive projects and enhance your skills.
      </p>

      <div className="flex justify-center mb-12">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full ${
                filter === category 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              } hover:bg-green-500 hover:text-white transition duration-300`}
            >
              {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Tutorial - First Post Only */}
      {filteredTutorials.length > 0 && (
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link href={`/tutorials/${filteredTutorials[0].slug}`} className="block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 md:h-auto">
                <div className="w-full h-full relative rounded-t-xl md:rounded-l-xl md:rounded-tr-none overflow-hidden">
                  <Image
                    src={filteredTutorials[0].imagePath}
                    alt={filteredTutorials[0].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full">
                    Featured
                  </span>
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                    {filteredTutorials[0].difficulty}
                  </span>
                  <div className="flex items-center">
                    <FiClock className="mr-1" />
                    <span>{filteredTutorials[0].readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold mb-4">{filteredTutorials[0].title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{filteredTutorials[0].excerpt}</p>
                <div className="inline-flex items-center text-green-500 font-medium">
                  Start Tutorial <FiArrowRight className="ml-2" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {filteredTutorials.slice(1).map((tutorial) => (
          <motion.div
            key={tutorial.slug}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            variants={item}
          >
            <Link href={`/tutorials/${tutorial.slug}`} className="block">
              <div className="relative h-48 w-full">
                <Image
                  src={tutorial.imagePath}
                  alt={tutorial.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                    {tutorial.difficulty}
                  </span>
                  <div className="flex items-center">
                    <FiClock className="mr-1" />
                    <span>{tutorial.readTime}</span>
                  </div>
                  <div className="flex items-center">
                    <FiCode className="mr-1" />
                    <span>{tutorial.category.charAt(0).toUpperCase() + tutorial.category.slice(1)}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{tutorial.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{tutorial.excerpt}</p>
                <div className="inline-flex items-center text-green-500 font-medium">
                  Start Tutorial <FiArrowRight className="ml-2" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}