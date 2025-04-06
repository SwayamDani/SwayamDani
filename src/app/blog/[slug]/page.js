'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiClock, FiArrowLeft, FiLinkedin, FiTwitter, FiShare2 } from 'react-icons/fi';
import { useParams } from 'next/navigation';

export default function BlogPostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    async function fetchPost() {
      try {
        // Fetch posts from API endpoint
        const response = await fetch(`/api/blog/posts/${slug}`);
        const data = await response.json();
        
        if (data.post) {
          setPost(data.post);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto py-20 px-4 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Handle case when post is not found
  if (!post) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
        <p className="mb-8">The article you're looking for doesn't exist or has been moved.</p>
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
          
          {/* Category label */}
          {post.category && (
            <div className="mb-4">
              <span className={`px-3 py-1 rounded-full text-sm ${
                post.category === 'security' 
                  ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' 
                  : post.category === 'ai'
                  ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                  : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
              }`}>
                {post.category}
              </span>
            </div>
          )}
          
          {/* Post header */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-8">
            {post.date && (
              <div className="flex items-center">
                <FiCalendar className="mr-1" />
                <span>{new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            )}
            {post.readTime && (
              <div className="flex items-center">
                <FiClock className="mr-1" />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>
          
          {/* Featured image */}
          {post.imagePath && (
            <div className="relative w-full h-96 rounded-xl overflow-hidden mb-12">
              <Image
                src={post.imagePath}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          )}
          
          {/* Share buttons */}
          <div className="flex items-center mb-12">
            <span className="mr-4 text-gray-700 dark:text-gray-300 font-medium">Share this article:</span>
            <div className="flex space-x-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-300">
                <FiLinkedin />
              </button>
              <button className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full transition-colors duration-300">
                <FiTwitter />
              </button>
              <button className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-2 rounded-full transition-colors duration-300">
                <FiShare2 />
              </button>
            </div>
          </div>
          
          {/* Post content */}
          <div 
            className="prose dark:prose-invert lg:prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
          
          {/* Author info */}
          <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 text-xl font-bold flex-shrink-0">
                SD
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">About the Author</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Swayam Dani is a Computer Science student at UC Riverside with a passion for programming, AI, and cybersecurity. 
                  He shares insights and practical tutorials to help others on their tech journey.
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Newsletter signup */}
          <div className="mt-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-8 text-white shadow-lg">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Enjoyed this article?</h3>
              <p>Subscribe to get notified when new content is published.</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-lg flex-grow text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button 
                type="submit" 
                className="bg-white text-green-600 hover:bg-gray-100 transition-colors font-medium px-6 py-3 rounded-lg"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm text-center mt-4 text-white/80">
              No spam ever. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}