'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Read the class already applied by the inline script — no flicker
    setDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className="fixed z-50 bottom-6 right-20 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: darkMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {darkMode ? (
          <FiSun className="text-yellow-500 text-xl" />
        ) : (
          <FiMoon className="text-gray-700 text-xl" />
        )}
      </motion.div>
    </button>
  );
}