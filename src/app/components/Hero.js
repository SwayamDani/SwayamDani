'use client'

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { FaArrowRight, FaEnvelope } from 'react-icons/fa';

export default function Hero() {

  const canvasRef = useRef();
  const [typeIndex, setTypeIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const taglines = [
    'CS Major @ UCSD',
    'AI/ML Engineer',
    'Full Stack Developer',
    'Problem Solver',
    'Open Source Contributor',
  ];

  // Typewriter effect for tagline
  useEffect(() => {
    const current = taglines[taglineIndex % taglines.length];
    if (!deleting && displayed.length < current.length) {
      setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (deleting && displayed.length > 0) {
      setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (!deleting && displayed.length === current.length) {
      setTimeout(() => setDeleting(true), 1200);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTaglineIndex((prev) => prev + 1);
    }
  }, [displayed, deleting, taglineIndex, taglines]);

  useEffect(() => {
    // Three.js animation
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
      });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Create improved particle system with color gradient
      const particlesGeometry = new THREE.BufferGeometry();
      const count = 6000;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 12;
        positions[i3 + 1] = (Math.random() - 0.5) * 8;
        positions[i3 + 2] = (Math.random() - 0.5) * 10;
        // Gradient: green to blue
        colors[i3] = 0.2 + 0.8 * (i / count); // R
        colors[i3 + 1] = 0.7 - 0.5 * (i / count); // G
        colors[i3 + 2] = 1.0 - 0.7 * (i / count); // B
      }
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.025,
        vertexColors: true,
        sizeAttenuation: true,
        opacity: 0.7,
        transparent: true,
      });
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
      camera.position.z = 3.5;
      // Animate
      const animate = () => {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.0007;
        particles.rotation.y += 0.0009;
        renderer.render(scene, camera);
      };
      animate();
      // Handle window resize
      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526]">
      <canvas ref={canvasRef} className="absolute w-full h-full" />
      {/* Glassmorphism card */}
      <div className="relative z-10 text-center px-4 py-10 rounded-3xl bg-white/30 dark:bg-gray-900/40 shadow-2xl backdrop-blur-md max-w-2xl mx-auto border border-white/20">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Swayam Dani
        </motion.h1>
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl mb-4 font-semibold text-gray-800 dark:text-gray-100 flex items-center justify-center gap-2 min-h-[2.5rem]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
          <span>{displayed}</span>
          <span className="text-green-400">|</span>
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl max-w-xl mx-auto mb-8 text-gray-700 dark:text-gray-300 font-medium"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          I love building innovative solutions at the intersection of technology, design, and business. Let’s create something awesome together.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="group bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-bold py-3 px-7 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label="View My Work"
          >
            View My Work <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a
            href="#contact"
            className="group bg-white/80 dark:bg-gray-800/80 hover:bg-white hover:shadow-xl text-gray-800 dark:text-white font-bold py-3 px-7 rounded-full border border-gray-300 dark:border-gray-600 flex items-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Contact Me"
          >
            <FaEnvelope className="text-green-400" /> Contact Me
          </a>
        </motion.div>
      </div>
      {/* Animated scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="animate-bounce bg-white/80 dark:bg-gray-800/80 p-2 w-12 h-12 ring-1 ring-gray-300 dark:ring-gray-700 shadow-lg rounded-full flex items-center justify-center">
          <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}