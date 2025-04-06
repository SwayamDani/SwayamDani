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

  useEffect(() => {
    // Fetch blog posts for the homepage
    async function fetchBlogPosts() {
      try {
        const response = await fetch('/api/blog/posts');
        const data = await response.json();
        setBlogPosts(data.posts.slice(0, 3)); // Get the first 3 posts
      } catch (error) {
        console.error('Error fetching blog posts:', error);
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

      {blogPosts.length > 0 && (
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