'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Hero from './components/Hero'
import About from './components/About'
import BlogSection from './components/BlogSection'
import Achievements from './components/Achievements'
import Skills from './components/Skills'
import BackToTop from './components/BackToTop'

// Section wrapper — fades in on scroll
function Section({ id, className = '', children }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.section>
  )
}

export default function Home() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/blog/post');
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setBlogPosts(data.posts);
      } catch {
        setBlogPosts([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogPosts();
  }, []);

  return (
    <>
      {/* Hero — always dark */}
      <section id="hero">
        <Hero />
      </section>

      {/* About — standard base */}
      <Section id="about" className="bg-white dark:bg-[#0a0f1e]">
        <About />
      </Section>

      {/* Achievements — accent stripe */}
      <Section id="achievements" className="bg-slate-50 dark:bg-[#0d1117]">
        <Achievements />
      </Section>

      {/* Skills — base */}
      <Section id="skills" className="bg-white dark:bg-[#0a0f1e]">
        <Skills />
      </Section>

      {/* Projects — alt */}
      <Section id="projects" className="bg-slate-50 dark:bg-[#0d1117]">
        <Projects />
      </Section>

      {/* Experience — base */}
      <Section id="experience" className="bg-white dark:bg-[#0a0f1e]">
        <Experience />
      </Section>

      {/* Blog — alt (only when posts exist) */}
      {!isLoading && blogPosts.length > 0 && (
        <Section id="blog" className="bg-slate-50 dark:bg-[#0d1117]">
          <BlogSection posts={blogPosts} />
        </Section>
      )}

      {/* Contact — base */}
      <Section id="contact" className="bg-white dark:bg-[#0a0f1e]">
        <Contact />
      </Section>

      <BackToTop />
    </>
  )
}
