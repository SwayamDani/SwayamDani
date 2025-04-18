'use client'

import React, { useState, useEffect } from 'react'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import ThemeToggle from './components/ThemeToggle'
import Script from 'next/script'

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(true)
  
  useEffect(() => {
    // Check for saved theme preference or use dark as default
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      if (savedTheme) {
        setDarkMode(savedTheme === 'dark')
      } else {
        setDarkMode(prefersDark)
      }
    }
  }, [])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light')
  }

  return (
    <html lang="en" className={darkMode ? 'dark' : ''}>
      <head>
      <Script
        id="cloudflare-analytics"
        strategy="afterInteractive"
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "c8307c0beb59419a8aac8f45eb964228"}'
      />
        <title>Swayam Dani | Portfolio</title>
        <meta name="description" content="Portfolio of Swayam Dani - Computer Science student specializing in AI, web development, and cybersecurity" />
      </head>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
        <Cursor />
        <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
        <Navbar darkMode={darkMode} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}