'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiClock, FiArrowLeft, FiShare2, FiTag } from 'react-icons/fi';
import { urlFor } from '@/lib/sanity';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState('');

  // Process the markdown content to fix common formatting issues
  const preprocessContent = (rawContent) => {
    if (!rawContent) return '';
    
    // Fix lists with dashes that don't have proper spacing
    let processed = rawContent.replace(/- ([A-Za-z])/g, '- $1');
    
    // Ensure there are proper line breaks before and after headings
    processed = processed.replace(/([^\n])#{1,6} /g, '$1\n\n# ');
    
    // Add proper line breaks around lists
    processed = processed.replace(/\n([*-]) /g, '\n\n$1 ');
    
    // Fix bullet points missing spacing
    processed = processed.replace(/([^\n])- /g, '$1\n- ');
    
    // Ensure dash lists are properly formatted as bullet points
    processed = processed.replace(/^- /gm, '* ');
    processed = processed.replace(/\n- /g, '\n* ');
    
    return processed;
  };

  useEffect(() => {
    async function fetchPost() {
      if (!params.slug) return;
      
      try {
        setIsLoading(true);
        console.log(`Fetching post with slug: ${params.slug}`);
        const response = await fetch(`/api/blog/post/${params.slug}`);
        
        if (!response.ok) {
          console.error(`Error response: ${response.status}`);
          if (response.status === 404) {
            throw new Error('Post not found');
          }
          const errorData = await response.json();
          console.error('Error data:', errorData);
          throw new Error(`Error: ${response.status} - ${errorData.error || 'Unknown error'}`);
        }
        
        const data = await response.json();
        console.log('Post data received:', data);
        setPost(data.post);
        setRelatedPosts(data.relatedPosts || []);
        
        // Extract content from the body field
        if (data.post.body) {
          if (typeof data.post.body === 'string') {
            // If body is a plain string, use it directly
            setContent(preprocessContent(data.post.body));
          } else if (Array.isArray(data.post.body)) {
            // If body is an array (Portable Text format), try to extract text
            let extractedContent = '';
            data.post.body.forEach(block => {
              if (block._type === 'block' && block.children) {
                block.children.forEach(child => {
                  if (child.text) {
                    extractedContent += child.text + ' ';
                  }
                });
                extractedContent += '\n\n';
              }
            });
            setContent(preprocessContent(extractedContent || JSON.stringify(data.post.body)));
          } else {
            // If it's another format, stringify it
            setContent(preprocessContent(JSON.stringify(data.post.body)));
          }
        }
        
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (params.slug) {
      fetchPost();
    }
  }, [params.slug]);

  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Function to handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: 'Check out this blog post',
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch((err) => console.error('Could not copy text: ', err));
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-32 px-4 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-32 px-4 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">{error}</p>
        <Link 
          href="/blog"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 inline-flex items-center"
        >
          <FiArrowLeft className="mr-2" /> Back to Blog
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto py-32 px-4 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
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
    <div className="container mx-auto py-32 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <Link 
            href="/blog"
            className="inline-flex items-center text-green-500 hover:text-green-600 font-medium"
          >
            <FiArrowLeft className="mr-2" /> Back to Blog
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs ${
                post.category?.toLowerCase() === 'security' 
                  ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' 
                  : post.category?.toLowerCase() === 'ai'
                  ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                  : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
              }`}>
                <FiTag className="inline mr-1" />
                {post.category || 'General'}
              </span>
              
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <FiCalendar className="mr-1" />
                <span className="mr-4">{formatDate(post.date)}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <FiClock className="mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
            
            {post.author && (
              <div className="flex items-center mb-8">
                {post.author.image && (
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={urlFor(post.author.image).url()}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  {post.author.bio && <p className="text-sm text-gray-500 dark:text-gray-400">{post.author.bio}</p>}
                </div>
              </div>
            )}
          </div>
          
          {post.mainImage && (
            <div className="relative w-full h-96 md:h-[500px] mb-8 rounded-xl overflow-hidden">
              <Image 
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}
          
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            {content ? (
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                <p className="text-center">No content available for this post.</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center border-t border-b border-gray-200 dark:border-gray-700 py-6 my-12">
            <button 
              onClick={handleShare}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors"
            >
              <FiShare2 className="mr-2" /> Share this article
            </button>
          </div>
          
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <div 
                    key={relatedPost._id}
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    {relatedPost.mainImage && (
                      <div className="relative h-40 w-full">
                        <Image 
                          src={urlFor(relatedPost.mainImage).url()}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="p-4">
                      <h3 className="font-bold mb-2">{relatedPost.title}</h3>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                        <span>{formatDate(relatedPost.date)}</span>
                        <span className="mx-2">•</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                      <Link 
                        href={`/blog/${relatedPost.slug.current}`}
                        className="text-green-500 text-sm font-medium hover:text-green-600 transition-colors"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}