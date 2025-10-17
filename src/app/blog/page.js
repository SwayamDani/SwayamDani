'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiClock, FiTag, FiSearch } from 'react-icons/fi';
import { urlFor } from '@/lib/sanity';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Extract unique categories from posts
  const categories = posts.length > 0 
    ? ['all', ...new Set(posts.map(post => post.category).filter(Boolean))] 
    : ['all'];

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/blog/post');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Blog posts data:', data);
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Filter posts based on search term and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto py-32 px-4 relative">
      {/* Gradient background accent */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-0 w-2/3 h-96 bg-gradient-to-br from-green-200/40 via-blue-200/30 to-purple-200/20 rounded-full blur-3xl -translate-x-1/2"></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Where computer science meets curiosity — exploring code, systems, and student life.
          </p>
        </div>
        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-grow max-w-2xl">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-2xl bg-white/60 dark:bg-gray-900/60 border border-white/30 dark:border-gray-700 shadow-md backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <div className="flex-shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-2xl bg-white/60 dark:bg-gray-900/60 border border-white/30 dark:border-gray-700 shadow-md backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">No Posts Found</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or category filter.'
                : 'No blog posts have been published yet.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ duration: 0.3, delay: idx * 0.07 }}
                className="rounded-3xl bg-white/60 dark:bg-gray-900/60 shadow-2xl backdrop-blur-md border-2 border-gray-200/40 dark:border-gray-700/40 overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-green-200/40 hover:border-green-400/60 group"
              >
                {post.mainImage && (
                  <Link href={`/blog/${post.slug.current}`} className="block relative h-48 w-full overflow-hidden">
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                )}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-sm ${
                      post.category?.toLowerCase() === 'security'
                        ? 'bg-red-100/80 dark:bg-red-900/80 text-red-800 dark:text-red-200'
                        : post.category?.toLowerCase() === 'ai'
                        ? 'bg-purple-100/80 dark:bg-purple-900/80 text-purple-800 dark:text-purple-200'
                        : 'bg-blue-100/80 dark:bg-blue-900/80 text-blue-800 dark:text-blue-200'
                    }`}>
                      <FiTag className="inline mr-1" />
                      {post.category || 'General'}
                    </span>
                  </div>
                  <Link href={`/blog/${post.slug.current}`}>
                    <h2 className="text-xl font-extrabold mb-3 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent group-hover:drop-shadow-lg transition-all">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-auto">
                    <FiCalendar className="mr-1" />
                    <span className="mr-4">{formatDate(post.date)}</span>
                    <FiClock className="mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="inline-flex items-center font-bold bg-gradient-to-r from-green-400 to-blue-500 text-white px-5 py-2 rounded-full shadow-lg hover:from-blue-500 hover:to-green-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    Read Article →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}