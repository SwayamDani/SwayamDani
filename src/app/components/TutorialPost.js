'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiClock, FiArrowLeft, FiArrowRight, FiLinkedin, FiTwitter, FiShare2, FiCheck, FiCode, FiLayers } from 'react-icons/fi';

export default function TutorialPost({ tutorial }) {
  const [completedSteps, setCompletedSteps] = useState({});

  // Handle case when tutorial data is not available
  if (!tutorial) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Tutorial not found</h2>
        <p className="mb-8">The tutorial you're looking for doesn't exist or has been moved.</p>
        <Link 
          href="/tutorials" 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 inline-flex items-center"
        >
          <FiArrowLeft className="mr-2" /> Back to Tutorials
        </Link>
      </div>
    );
  }

  const toggleStepComplete = (stepIndex) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepIndex]: !prev[stepIndex]
    }));
  };

  return (
    <div className="container mx-auto pt-32 pb-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Back to tutorials button */}
          <Link 
            href="/tutorials" 
            className="inline-flex items-center text-green-500 hover:text-green-600 mb-8 font-medium"
          >
            <FiArrowLeft className="mr-2" /> Back to Tutorials
          </Link>
          
          {/* Tutorial header */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{tutorial.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-8">
            <div className="flex items-center">
              <FiCalendar className="mr-1" />
              <span>{tutorial.date}</span>
            </div>
            <div className="flex items-center">
              <FiClock className="mr-1" />
              <span>{tutorial.readTime}</span>
            </div>
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
              {tutorial.difficulty}
            </span>
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
              {tutorial.category.charAt(0).toUpperCase() + tutorial.category.slice(1)}
            </span>
          </div>
          
          {/* Featured image */}
          <div className="w-full rounded-xl overflow-hidden mb-12">
            <img
              src={tutorial.imagePath}
              alt={tutorial.title}
              className="w-auto max-w-75 h-auto max-h-96"
            />
          </div>
          
          {/* Share buttons */}
          <div className="flex space-x-4 mb-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-300">
              <FiLinkedin />
            </button>
            <button className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full transition-colors duration-300">
              <FiTwitter />
            </button>
            <button className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-full transition-colors duration-300">
              <FiShare2 />
            </button>
          </div>
          
          {/* Table of Contents */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
            <ol className="list-decimal list-inside space-y-2">
              {tutorial.steps && tutorial.steps.map((step, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  <a 
                    href={`#step-${index+1}`} 
                    className="hover:text-green-500 transition-colors duration-200"
                  >
                    {step.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
          
          {/* Introduction */}
          <div className="prose dark:prose-invert lg:prose-lg max-w-none mb-12">
            <h2>Introduction</h2>
            <p>{tutorial.introduction}</p>
            
            {/* Prerequisites */}
            {tutorial.prerequisites && (
              <>
                <h3>Prerequisites</h3>
                <ul>
                  {tutorial.prerequisites.map((prerequisite, index) => (
                    <li key={index}>{prerequisite}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          
          {/* Steps */}
          {tutorial.steps && tutorial.steps.map((step, index) => (
            <div 
              key={index} 
              id={`step-${index+1}`}
              className={`border-l-4 pl-6 py-2 mb-12 ${
                completedSteps[index] 
                  ? 'border-green-500' 
                  : 'border-gray-300 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className={`mr-4 flex items-center justify-center w-12 h-12 rounded-full text-white ${
                  completedSteps[index] ? 'bg-green-500' : 'bg-gray-500'
                }`}>
                  {completedSteps[index] ? <FiCheck className="text-xl" /> : <span>{index + 1}</span>}
                </div>
                <h2 className="text-2xl font-bold">{step.title}</h2>
              </div>
              
              <div className="prose dark:prose-invert lg:prose-lg max-w-none mb-6">
                {step.content}
              </div>
              
              {step.code && (
                <div className="mb-6 relative">
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button 
                      className="bg-gray-800 hover:bg-gray-700 text-white py-1 px-3 rounded text-xs"
                      onClick={() => navigator.clipboard.writeText(step.code)}
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{step.code}</code>
                  </pre>
                </div>
              )}
              
              {step.tip && (
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
                  <p className="text-blue-800 dark:text-blue-300 font-medium">Tip</p>
                  <p className="text-blue-700 dark:text-blue-200">{step.tip}</p>
                </div>
              )}
              
              <button
                onClick={() => toggleStepComplete(index)}
                className={`mt-4 inline-flex items-center ${
                  completedSteps[index]
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                } rounded-full px-4 py-2 transition-colors duration-200`}
              >
                {completedSteps[index] ? (
                  <>
                    <FiCheck className="mr-2" /> Completed
                  </>
                ) : (
                  'Mark as Complete'
                )}
              </button>
            </div>
          ))}
          
          {/* Conclusion */}
          <div className="prose dark:prose-invert lg:prose-lg max-w-none mb-12">
            <h2>Conclusion</h2>
            <p>{tutorial.conclusion}</p>
          </div>
          
          {/* Next Steps */}
          {tutorial.nextSteps && (
            <div className="prose dark:prose-invert lg:prose-lg max-w-none mb-12">
              <h2>Next Steps</h2>
              <ul>
                {tutorial.nextSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Related Tutorials */}
          {tutorial.relatedTutorials && tutorial.relatedTutorials.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6">Related Tutorials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutorial.relatedTutorials.map((relatedTutorial, index) => (
                  <Link 
                    key={index}
                    href={`/tutorials/${relatedTutorial.slug}`}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-md transition-shadow duration-200"
                  >
                    <h4 className="font-bold text-lg mb-2">{relatedTutorial.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{relatedTutorial.excerpt}</p>
                    <div className="flex items-center text-green-500">
                      <span>View Tutorial</span>
                      <FiArrowRight className="ml-2" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Author info */}
          <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-12 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 relative rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/assets/images/profile.jpg"
                alt="Swayam Dani"
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Written by Swayam Dani</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Computer Science & Business Applications student at UC Riverside with a passion for AI, cybersecurity, 
                and web development. Sharing knowledge to help others on their tech journey.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/in/swayam-dani-554091299" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <FiLinkedin className="text-xl" />
                </a>
                <a 
                  href="https://github.com/SwayamDani" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                >
                  <i className="fab fa-github text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}