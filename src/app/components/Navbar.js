'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar({ darkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'experience', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 200;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.menu-button')) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-lg bg-white/60 dark:bg-gray-900/60 shadow-xl py-2 border-b border-gradient-to-r from-green-400/30 via-blue-400/20 to-purple-500/30'
          : 'bg-transparent py-5'
      }`}
        style={{ WebkitBackdropFilter: 'blur(16px)', backdropFilter: 'blur(16px)' }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <motion.a
              href="#hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-extrabold bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight drop-shadow-sm"
            >
              SD
            </motion.a>
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-2 lg:space-x-6 items-center">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  className={`relative px-4 py-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400
                    ${activeSection === item.id
                      ? 'text-white bg-gradient-to-r from-green-400 to-blue-500 shadow-md'
                      : 'text-gray-700 dark:text-gray-200 hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800'}
                  `}
                  style={activeSection === item.id ? { boxShadow: '0 2px 16px 0 rgba(34,197,94,0.12)' } : {}}
                >
                  {item.label}
                  {/* No underline for active link */}
                </a>
              ))}
              {/* Blog link - separate from navItems */}
              <a
                href="/blog"
                className={`relative px-4 py-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400
                  ${activeSection === 'blog'
                    ? 'text-white bg-gradient-to-r from-green-400 to-blue-500 shadow-md'
                    : 'text-gray-700 dark:text-gray-200 hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800'}
                `}
                style={activeSection === 'blog' ? { boxShadow: '0 2px 16px 0 rgba(34,197,94,0.12)' } : {}}
              >
                Blog
                {/* No underline for active link */}
              </a>
              <a
                href="/resume"
                className="ml-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white px-5 py-2 rounded-full font-bold shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Resume
              </a>
            </div>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden menu-button focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FiX className="text-3xl text-green-400" />
              ) : (
                <FiMenu className="text-3xl text-green-400" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <motion.div
          className={`mobile-menu md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: mobileMenuOpen ? 1 : 0,
            y: mobileMenuOpen ? 0 : -20
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-white/90 dark:bg-gray-900/90 shadow-2xl rounded-2xl mx-4 mt-3 py-6 px-2 backdrop-blur-lg border border-white/20">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`/#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 px-6 my-1 rounded-lg font-semibold text-lg transition-all duration-200
                  ${activeSection === item.id
                    ? 'bg-gradient-to-r from-green-400 to-blue-400 text-white shadow-md'
                    : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-400'}
                `}
              >
                {item.label}
              </a>
            ))}
            {/* Blog link - separate from navItems */}
            <a
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-3 px-6 my-1 rounded-lg font-semibold text-lg transition-all duration-200
                ${activeSection === 'blog'
                  ? 'bg-gradient-to-r from-green-400 to-blue-400 text-white shadow-md'
                  : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-400'}
              `}
            >
              Blog
            </a>
            <a
              href="/resume"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-6 my-1 rounded-lg font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 shadow-lg hover:from-blue-500 hover:to-green-400 transition-all duration-300"
            >
              Resume
            </a>
          </div>
        </motion.div>
      </nav>
      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}></div>
      )}
    </>
  );
}