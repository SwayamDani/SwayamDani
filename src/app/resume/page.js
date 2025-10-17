'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiDownload, FiArrowLeft } from 'react-icons/fi';

export default function ResumePage() {
  const pdfUrl = '/resume.pdf';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Swayam_Dani_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto py-32 px-4 relative min-h-screen">
      {/* Gradient background accent */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-0 w-2/3 h-96 bg-gradient-to-br from-green-200/40 via-blue-200/30 to-purple-200/20 rounded-full blur-3xl -translate-x-1/2"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
              Resume
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Swayam Dani - Computer Science Student
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="/"
              className="inline-flex items-center font-bold bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-2 border-gray-200/40 dark:border-gray-700/40 text-gray-900 dark:text-white px-6 py-3 rounded-full shadow-lg hover:border-green-400/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <FiArrowLeft className="mr-2" /> Back to Home
            </Link>
            <button
              onClick={handleDownload}
              className="inline-flex items-center font-bold bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-blue-500 hover:to-green-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <FiDownload className="mr-2" /> Download PDF
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="rounded-3xl bg-white/60 dark:bg-gray-900/60 shadow-2xl backdrop-blur-md border-2 border-gray-200/40 dark:border-gray-700/40 overflow-hidden">
          <div className="w-full" style={{ height: 'calc(100vh - 300px)', minHeight: '600px' }}>
            <iframe
              src={pdfUrl}
              className="w-full h-full"
              title="Resume PDF"
              style={{ border: 'none' }}
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            To update your resume, replace <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">public/resume.pdf</code> with your new PDF.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
