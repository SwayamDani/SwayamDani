'use client'
import React from 'react';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { init } from 'ityped';
import * as THREE from 'three';

export default function Hero() {
  const textRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    // Typing animation
    if (textRef.current) {
      init(textRef.current, {
        showCursor: true,
        strings: [
          'Full-Stack Developer',
          'AI Enthusiast',
          'UI/UX Designer',
          'Cybersecurity Enthusiast',
        ],
        backDelay: 1500,
        backSpeed: 60,
        typeSpeed: 80,
      });
    }

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
      
      // Create particle system
      const particlesGeometry = new THREE.BufferGeometry();
      const count = 5000;
      
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      
      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
        colors[i] = Math.random();
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        sizeAttenuation: true,
      });
      
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
      
      camera.position.z = 3;
      
      // Animate
      const animate = () => {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;
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
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute w-full h-full" />
      
      <div className="relative z-10 text-center px-4">
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Swayam Dani
        </motion.h1>
        
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl mb-8 text-green-500 dark:text-green-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span ref={textRef}></span>
        </motion.h2>
        
        <motion.p 
          className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Building innovative solutions at the intersection of technology and business.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#projects" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300">
            View My Work
          </a>
          <a href="#contact" className="bg-transparent hover:bg-gray-700 text-gray-700 dark:text-white hover:text-white font-bold py-3 px-6 border border-gray-700 dark:border-white hover:border-transparent rounded-full transition duration-300">
            Contact Me
          </a>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="animate-bounce bg-white dark:bg-gray-800 p-2 w-10 h-10 ring-1 ring-gray-300 dark:ring-gray-700 shadow-lg rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}