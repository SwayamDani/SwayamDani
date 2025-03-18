'use client'
import React from 'react';
export default function Footer() {
    return (
      <footer className="bg-white dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">Swayam Dani</h2>
              <p className="text-gray-600 dark:text-gray-400">CS & Business Applications @ UCR</p>
            </div>
            
            <div className="flex space-x-6">
              <a 
                href="https://www.linkedin.com/in/swayam-dani-554091299" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors duration-300"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a 
                href="https://github.com/SwayamDani" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors duration-300"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a 
                href="mailto:sdani025@ucr.edu" 
                className="text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors duration-300"
              >
                <i className="fas fa-envelope text-xl"></i>
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