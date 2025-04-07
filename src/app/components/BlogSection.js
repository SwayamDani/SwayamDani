'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import { urlFor } from '@/lib/sanity';

export default function BlogSection({ posts }) {
  // Handle case when no posts are provided
  if (!posts || posts.length === 0) {
    return null;
  }

  // Use only the first 3 posts for the homepage section
  const displayPosts = posts.slice(0, 3);

  return (
    <div className="container mx-auto py-20 px-4">
      <h2 className="text-4xl font-bold mb-4 text-center">Latest from the Blog</h2>
      <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
        Insights and tutorials on technology, cybersecurity, and development
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayPosts.map((post, index) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full"
          >
            {post.mainImage && (
              <div className="relative h-48 w-full">
                <Image 
                  src={urlFor(post.mainImage).url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="p-6 flex-grow">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  post.category?.toLowerCase() === 'security' 
                    ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' 
                    : post.category?.toLowerCase() === 'ai'
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                    : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                }`}>
                  {post.category || 'General'}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-3">{post.title}</h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {post.excerpt}
              </p>
              
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-auto">
                <FiCalendar className="mr-1" />
                <span className="mr-4">{new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
                <FiClock className="mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>
            
            <div className="p-6 pt-0 mt-auto">
              <Link 
                href={`/blog/${post.slug.current}`}
                className="inline-flex items-center text-green-500 font-medium hover:text-green-600 transition-colors"
              >
                Read Article <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link 
          href="/blog"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 inline-flex items-center"
        >
          View All Articles <FiArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
}