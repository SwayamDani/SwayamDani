'use client'
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle({ darkMode, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="fixed z-50 bottom-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg focus:outline-none"
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