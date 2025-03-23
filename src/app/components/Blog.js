'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';

export default function Blogs() {
  const [filter, setFilter] = useState('all');
  
  // Sample blog posts - you can replace with real data later
  const blogs = [
    {
      id: 1,
      slug: 'cybersecurity-best-practices-2025',
      title: 'Cybersecurity Best Practices for 2025',
      excerpt: 'A comprehensive guide to protecting your digital assets with modern security techniques.',
      date: 'March 15, 2025',
      readTime: '8 min read',
      category: 'security',
      imagePath: '/assets/images/blog/cybersecurity.jpg',
      featured: true
    },
    {
      id: 2,
      slug: 'integrating-ai-into-web-applications',
      title: 'Integrating AI Into Modern Web Applications',
      excerpt: 'Learn how to leverage AI capabilities in your next web project without complex infrastructure.',
      date: 'February 28, 2025',
      readTime: '6 min read',
      category: 'ai',
      imagePath: '/assets/images/blog/ai-web.jpg',
      featured: true
    },
    {
      id: 3,
      slug: 'nextjs-15-features',
      title: 'Exploring Next.js 15: Key Features for Developers',
      excerpt: 'A deep dive into the most impactful features in the latest Next.js release.',
      date: 'February 10, 2025',
      readTime: '7 min read',
      category: 'web',
      imagePath: '/assets/images/blog/nextjs.jpg',
      featured: false
    },
    {
      id: 4,
      slug: 'data-structures-algorithm-efficiency',
      title: 'Optimizing Algorithm Efficiency with Advanced Data Structures',
      excerpt: 'Practical techniques to improve performance in your applications using the right data structures.',
      date: 'January 25, 2025',
      readTime: '9 min read',
      category: 'algorithms',
      imagePath: '/assets/images/blog/algorithms.jpg',
      featured: false
    },
    {
      id: 5,
      slug: 'building-password-security-tool',
      title: 'Building a Password Security Assessment Tool from Scratch',
      excerpt: 'A technical walkthrough of creating a tool to evaluate and enhance password security.',
      date: 'January 12, 2025',
      readTime: '10 min read',
      category: 'security',
      imagePath: '/assets/images/blog/password-security.jpg',
      featured: true
    },
    {
      id: 6,
      slug: 'ai-fashion-assistant-development',
      title: 'Developing an AI Fashion Assistant: Challenges and Solutions',
      excerpt: 'Behind the scenes of creating StyleAI - an AI-powered fashion recommendation system.',
      date: 'December 20, 2024',
      readTime: '8 min read',
      category: 'ai',
      imagePath: '/assets/images/blog/fashion-ai.jpg',
      featured: true
    }
  ];

  const filteredBlogs = filter === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.category === filter);

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
      <h2 className="text-4xl font-bold mb-4 text-center">Blog</h2>
      <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
        Sharing my insights on technology, development, and industry trends.
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
            onClick={() => setFilter('algorithms')}
            className={`px-6 py-2 rounded-full ${
              filter === 'algorithms' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            } hover:bg-green-500 hover:text-white transition duration-300`}
          >
            Algorithms
          </button>
        </div>
      </div>

      {/* Featured Post - First Post Only */}
      {filteredBlogs.length > 0 && filteredBlogs[0].featured && (
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link href={`/blog/${filteredBlogs[0].slug}`} className="block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 md:h-auto">
                <div className="w-full h-full relative rounded-t-xl md:rounded-l-xl md:rounded-tr-none overflow-hidden">
                  <Image
                    src={filteredBlogs[0].imagePath}
                    alt={filteredBlogs[0].title}
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
                  <div className="flex items-center">
                    <FiCalendar className="mr-1" />
                    <span>{filteredBlogs[0].date}</span>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="mr-1" />
                    <span>{filteredBlogs[0].readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold mb-4">{filteredBlogs[0].title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{filteredBlogs[0].excerpt}</p>
                <div className="inline-flex items-center text-green-500 font-medium">
                  Read Article <FiArrowRight className="ml-2" />
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
        {filteredBlogs.slice(1).map((blog) => (
          <motion.div
            key={blog.id}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            variants={item}
          >
            <Link href={`/blog/${blog.slug}`} className="block">
              <div className="relative h-48 w-full">
                <Image
                  src={blog.imagePath}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <FiCalendar className="mr-1" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="mr-1" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{blog.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{blog.excerpt}</p>
                <div className="inline-flex items-center text-green-500 font-medium">
                  Read More <FiArrowRight className="ml-2" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}