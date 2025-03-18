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
      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200; // Adding offset for better UX
      
      // Update navbar style when scrolled
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Find active section based on scroll position
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
  
  // Navigation items
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white dark:bg-gray-900 shadow-lg py-3' 
          : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <motion.a 
              href="#hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold"
            >
              SD
            </motion.a>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative font-medium transition-colors duration-300 ${
                    activeSection === item.id
                      ? 'text-green-500'
                      : 'text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 h-0.5 bg-green-500 w-full"
                      layoutId="navIndicator"
                    />
                  )}
                </a>
              ))}
              
              <a 
                href="https://drive.google.com/file/d/YOUR_UPDATED_RESUME_LINK/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors duration-300"
              >
                Resume
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden menu-button focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <FiX className="text-2xl" />
              ) : (
                <FiMenu className="text-2xl" />
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
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-b-lg mx-4 mt-2 py-4">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 px-6 ${
                  activeSection === item.id
                    ? 'bg-green-50 dark:bg-green-900 text-green-500'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.label}
              </a>
            ))}
            
            <a 
              href="https://drive.google.com/file/d/YOUR_UPDATED_RESUME_LINK/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-6 text-green-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Resume
            </a>
          </div>
        </motion.div>
      </nav>
      
      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}></div>
      )}
    </>
  );
}