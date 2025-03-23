'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiClock, FiArrowLeft, FiLinkedin, FiTwitter, FiShare2 } from 'react-icons/fi';

export default function BlogPost({ post }) {
  // Handle case when post data is not available
  if (!post) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
        <p className="mb-8">The post you're looking for doesn't exist or has been moved.</p>
        <Link 
          href="/blog" 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 inline-flex items-center"
        >
          <FiArrowLeft className="mr-2" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-32 pb-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Back to blog button */}
          <Link 
            href="/blog" 
            className="inline-flex items-center text-green-500 hover:text-green-600 mb-8 font-medium"
          >
            <FiArrowLeft className="mr-2" /> Back to Blog
          </Link>
          
          {/* Post header */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-8">
            <div className="flex items-center">
              <FiCalendar className="mr-1" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <FiClock className="mr-1" />
              <span>{post.readTime}</span>
            </div>
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </span>
          </div>
          
          {/* Featured image */}
          <div className="relative w-full h-96 rounded-xl overflow-hidden mb-12">
            <Image
              src={post.imagePath}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
          
          {/* Share buttons */}
          <div className="flex space-x-4 mb-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-300">
              <FiLinkedin />
            </button>
            <button className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full transition-colors duration-300">
              <FiTwitter />
            </button>
            <button className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-full transition-colors duration-300">
              <FiShare2 />
            </button>
          </div>
          
          {/* Post content */}
          <div className="prose dark:prose-invert lg:prose-lg max-w-none">
            {post.content}
          </div>
          
          {/* Author info */}
          <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-12 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 relative rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/assets/images/profile.jpg"
                alt="Swayam Dani"
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Written by Swayam Dani</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Computer Science & Business Applications student at UC Riverside with a passion for AI, cybersecurity, 
                and web development. Sharing insights and knowledge to help others in their tech journey.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/in/swayam-dani-554091299" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <FiLinkedin className="text-xl" />
                </a>
                <a 
                  href="https://github.com/SwayamDani" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                >
                  <i className="fab fa-github text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}