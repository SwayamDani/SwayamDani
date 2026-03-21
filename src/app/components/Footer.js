'use client'
import React from 'react';
import { FiLinkedin, FiGithub, FiMail } from 'react-icons/fi';

export default function Footer() {
    return (
      <footer className="bg-white dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">Swayam Dani</h2>
              <p className="text-gray-600 dark:text-gray-400">CS @ UCSD</p>
            </div>
            
            <div className="flex space-x-6">
              <a 
                href="https://www.linkedin.com/in/swayam-dani-554091299" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors duration-300"
              >
                <FiLinkedin className="text-xl" />
              </a>
              <a 
                href="https://github.com/SwayamDani" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors duration-300"
              >
                <FiGithub className="text-xl" />
              </a>
              <a 
                href="mailto:sdani025@ucsd.edu" 
                className="text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors duration-300"
              >
                <FiMail className="text-xl" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Swayam Dani. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }