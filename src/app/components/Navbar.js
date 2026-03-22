'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection]   = useState('hero');

  useEffect(() => {
    const sections = ['hero', 'about', 'achievements', 'skills', 'projects', 'experience', 'blog', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      setScrolled(scrollPosition > 50);

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { id: 'hero',         label: 'Home' },
    { id: 'about',        label: 'About' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'skills',       label: 'Skills' },
    { id: 'projects',     label: 'Projects' },
    { id: 'experience',   label: 'Experience' },
    { id: 'contact',      label: 'Contact' },
  ];

  const linkBase = 'relative px-1 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#64ffda]';
  const linkActive = 'text-[#64ffda]';
  const linkIdle   = 'text-slate-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-white/80 dark:bg-[#0a0f1e]/90 border-b border-slate-200/50 dark:border-slate-800/50'
            : 'py-5 bg-transparent'
        }`}
        style={{ backdropFilter: scrolled ? 'blur(12px)' : 'none' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">

            {/* Logo mark */}
            <motion.a
              href="#hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="font-display text-xl font-bold tracking-tight"
            >
              <span className="text-[#64ffda]">S</span>
              <span className="text-gray-900 dark:text-white">D</span>
              <span className="text-[#64ffda] text-xs align-super ml-0.5">.</span>
            </motion.a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  className={`${linkBase} ${activeSection === item.id ? linkActive : linkIdle}`}
                >
                  {item.label}
                  {/* Underline indicator */}
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#64ffda] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}

              {process.env.NODE_ENV === 'development' && (
                <a
                  href="/blog"
                  className={`${linkBase} ${activeSection === 'blog' ? linkActive : linkIdle}`}
                >
                  Blog
                  {activeSection === 'blog' && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#64ffda] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              )}

              <a
                href="/resume"
                className="ml-4 px-5 py-2 border border-[#64ffda] text-[#64ffda] text-sm font-semibold rounded-sm hover:bg-[#64ffda]/10 transition-colors duration-200 font-mono"
              >
                Resume
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden menu-button p-1 text-slate-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen
                ? <FiX size={22} className="text-[#64ffda]" />
                : <FiMenu size={22} />
              }
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="mobile-menu md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mx-4 mt-2 mb-4 py-4 px-4 bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`/#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-3 px-2 text-base font-medium rounded transition-colors duration-150 ${
                      activeSection === item.id
                        ? 'text-[#64ffda]'
                        : 'text-slate-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {activeSection === item.id && (
                      <span className="text-[#64ffda] mr-2 font-mono text-xs">▸</span>
                    )}
                    {item.label}
                  </a>
                ))}
                {process.env.NODE_ENV === 'development' && (
                  <a
                    href="/blog"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 px-2 text-base font-medium text-slate-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white rounded transition-colors duration-150"
                  >
                    Blog
                  </a>
                )}
                <a
                  href="/resume"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 block py-3 px-2 text-center font-semibold text-[#64ffda] border border-[#64ffda] rounded-sm hover:bg-[#64ffda]/10 transition-colors duration-150"
                >
                  Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
