'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiDownload, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';

export default function ResumePage() {
  const [latexSource, setLatexSource] = useState('');
  const [renderedHTML, setRenderedHTML] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCompiling, setIsCompiling] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadResume();
  }, []);

  const loadResume = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Load both LaTeX source (for PDF compilation) and rendered HTML
      const [sourceResponse, renderResponse] = await Promise.all([
        fetch('/api/resume/source'),
        fetch('/api/resume/render')
      ]);
      
      if (!sourceResponse.ok) {
        throw new Error('Failed to load LaTeX source');
      }
      
      const sourceData = await sourceResponse.json();
      setLatexSource(sourceData.latexContent);
      
      // Handle render response
      if (renderResponse.ok) {
        try {
          const contentType = renderResponse.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const renderData = await renderResponse.json();
            setRenderedHTML(renderData.html || '');
          } else {
            // If it's not JSON, it might be HTML error page
            const text = await renderResponse.text();
            console.warn('Received non-JSON response from render API:', text.substring(0, 100));
            setError('Failed to render resume HTML - received invalid response');
          }
        } catch (parseError) {
          console.error('Error parsing render response:', parseError);
          setError('Failed to parse resume HTML response');
        }
      } else {
        try {
          const errorData = await renderResponse.json();
          console.warn('HTML rendering failed:', errorData);
          setError(errorData.error || 'Failed to render resume HTML');
        } catch (parseError) {
          const text = await renderResponse.text();
          console.error('Error parsing error response:', text.substring(0, 100));
          setError('Failed to render resume HTML');
        }
      }
    } catch (err) {
      console.error('Error loading resume:', err);
      setError(err.message || 'Failed to load resume');
    } finally {
      setIsLoading(false);
    }
  };


  const handleDownloadPDF = async () => {
    try {
      setIsCompiling(true);
      setError(null);

      const response = await fetch('/api/resume/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latexContent: latexSource }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to compile PDF');
      }

      // Get the PDF blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Swayam_Dani_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading PDF:', err);
      setError(err.message);
      alert(`Error generating PDF: ${err.message}`);
    } finally {
      setIsCompiling(false);
    }
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

          <div className="flex gap-4 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center font-bold bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-2 border-gray-200/40 dark:border-gray-700/40 text-gray-900 dark:text-white px-6 py-3 rounded-full shadow-lg hover:border-green-400/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <FiArrowLeft className="mr-2" /> Back to Home
            </Link>
            <button
              onClick={handleDownloadPDF}
              disabled={isCompiling || !latexSource}
              className="inline-flex items-center font-bold bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-blue-500 hover:to-green-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCompiling ? (
                <>
                  <FiRefreshCw className="mr-2 animate-spin" /> Compiling...
                </>
              ) : (
                <>
                  <FiDownload className="mr-2" /> Download PDF
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg text-red-700 dark:text-red-400">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Resume Content - Rendered from LaTeX */}
        <div className="rounded-3xl bg-white dark:bg-gray-900 shadow-2xl border-2 border-gray-200/40 dark:border-gray-700/40 overflow-hidden">
          {isLoading ? (
            <div className="w-full flex items-center justify-center py-32">
              <div className="text-center">
                <FiRefreshCw className="mx-auto mb-4 text-4xl text-green-400 animate-spin" />
                <p className="text-gray-600 dark:text-gray-400">Loading resume...</p>
              </div>
            </div>
          ) : error ? (
            <div className="w-full flex items-center justify-center py-32">
              <div className="text-center">
                <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Please use the Download PDF button to view the resume.</p>
              </div>
            </div>
          ) : renderedHTML ? (
            <div 
              className="w-full"
              style={{ 
                minHeight: '600px'
              }}
              dangerouslySetInnerHTML={{ __html: renderedHTML }}
            />
          ) : (
            <div className="w-full flex items-center justify-center py-32">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400">No resume content available.</p>
              </div>
            </div>
          )}
        </div>

      </motion.div>
    </div>
  );
}
