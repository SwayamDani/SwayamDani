'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Hero from './components/Hero'
import About from './components/About'
import BlogSection from './components/BlogSection'

export default function Home() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch blog posts for the homepage
    async function fetchBlogPosts() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/blog/posts');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setBlogPosts(data.posts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Set to empty array on error
        setBlogPosts([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  return (
    <>
      <section id="hero">
        <Hero />
      </section>

      <motion.section 
        id="about"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <About />
      </motion.section>

      <motion.section 
        id="projects"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }} 
      >
        <Projects />
      </motion.section>

      <motion.section 
        id="skills"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Skills />
      </motion.section>

      <motion.section 
        id="experience"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Experience />
      </motion.section>

      {!isLoading && blogPosts.length > 0 && (
        <motion.section 
          id="blog"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <BlogSection posts={blogPosts} />
        </motion.section>
      )}

      <motion.section 
        id="contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Contact />
      </motion.section>
    </>
  )
}