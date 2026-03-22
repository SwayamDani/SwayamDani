'use client'

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { FiArrowRight, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';

// Dark mode target: #64ffda  Light mode target: #0891b2
const DARK_COLOR  = { r: 100 / 255, g: 255 / 255, b: 218 / 255 };
const LIGHT_COLOR = { r:   8 / 255, g: 145 / 255, b: 178 / 255 };

export default function Hero() {
  const canvasRef    = useRef();
  const targetColor  = useRef({ ...DARK_COLOR }); // lerp target, updated on theme change
  const currentColor = useRef({ ...DARK_COLOR }); // lerp current, updated every frame

  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting]   = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);

  const taglines = ['AI/ML Engineer', 'Full Stack Developer', 'CS Major @ UCSD', 'Problem Solver'];

  // Track theme — only updates UI colors, does NOT restart Three.js
  useEffect(() => {
    const check = () => {
      const dark = document.documentElement.classList.contains('dark');
      setIsDark(dark);
      targetColor.current = dark ? { ...DARK_COLOR } : { ...LIGHT_COLOR };
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Typewriter
  useEffect(() => {
    const current = taglines[taglineIndex % taglines.length];
    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      return () => clearTimeout(t);
    } else if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
      return () => clearTimeout(t);
    } else if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(t);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTaglineIndex((prev) => prev + 1);
    }
  }, [displayed, deleting, taglineIndex]);

  // Three.js — runs ONCE on mount, never restarts on theme change.
  // Colors are lerped each frame towards targetColor.current.
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas   = canvasRef.current;
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    const COUNT        = 130;
    const CONNECT_DIST = 2.4;
    const LERP         = 0.04; // ~25 frames to reach target at 60fps ≈ 400ms

    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;
      vel[i * 3]     = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
    }

    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(pos.slice(), 3).setUsage(THREE.DynamicDrawUsage));
    const ptMat = new THREE.PointsMaterial({
      size: 0.045,
      color: new THREE.Color(currentColor.current.r, currentColor.current.g, currentColor.current.b),
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(ptGeo, ptMat));

    const maxLines     = Math.ceil(COUNT * (COUNT - 1) / 2);
    const linePosArr   = new Float32Array(maxLines * 6);
    const lineColorArr = new Float32Array(maxLines * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePosArr, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeo.setAttribute('color',    new THREE.BufferAttribute(lineColorArr, 3).setUsage(THREE.DynamicDrawUsage));
    const lineMat  = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true });
    scene.add(new THREE.LineSegments(lineGeo, lineMat));

    const mouse = { worldX: 0, worldY: 0 };
    const onMouseMove = (e) => {
      const fov = camera.fov * Math.PI / 180;
      const h   = 2 * Math.tan(fov / 2) * camera.position.z;
      const w   = h * camera.aspect;
      mouse.worldX = ((e.clientX / window.innerWidth) * 2 - 1)   * w / 2;
      mouse.worldY = (-(e.clientY / window.innerHeight) * 2 + 1) * h / 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const workPos = pos.slice();

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Lerp current color towards target — this drives smooth theme transition on canvas
      const cc = currentColor.current;
      const tc = targetColor.current;
      cc.r += (tc.r - cc.r) * LERP;
      cc.g += (tc.g - cc.g) * LERP;
      cc.b += (tc.b - cc.b) * LERP;
      ptMat.color.setRGB(cc.r, cc.g, cc.b);

      if (!prefersReducedMotion) {
        for (let i = 0; i < COUNT; i++) {
          workPos[i * 3]     += vel[i * 3];
          workPos[i * 3 + 1] += vel[i * 3 + 1];
          if (workPos[i * 3]     >  8) workPos[i * 3]     = -8;
          if (workPos[i * 3]     < -8) workPos[i * 3]     =  8;
          if (workPos[i * 3 + 1] >  5) workPos[i * 3 + 1] = -5;
          if (workPos[i * 3 + 1] < -5) workPos[i * 3 + 1] =  5;
          const dx = workPos[i * 3]     - mouse.worldX;
          const dy = workPos[i * 3 + 1] - mouse.worldY;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 1.8 && d > 0.001) {
            const force = (1.8 - d) / 1.8 * 0.004;
            workPos[i * 3]     += (dx / d) * force;
            workPos[i * 3 + 1] += (dy / d) * force;
          }
        }
        ptGeo.attributes.position.array.set(workPos);
        ptGeo.attributes.position.needsUpdate = true;
      }

      // Rebuild lines using lerped color
      let lineIdx = 0;
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx   = workPos[i * 3]     - workPos[j * 3];
          const dy   = workPos[i * 3 + 1] - workPos[j * 3 + 1];
          const dz   = workPos[i * 3 + 2] - workPos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.5;
            const r = cc.r * alpha;
            const g = cc.g * alpha;
            const b = cc.b * alpha;
            const base = lineIdx * 6;
            linePosArr[base]     = workPos[i * 3];
            linePosArr[base + 1] = workPos[i * 3 + 1];
            linePosArr[base + 2] = workPos[i * 3 + 2];
            linePosArr[base + 3] = workPos[j * 3];
            linePosArr[base + 4] = workPos[j * 3 + 1];
            linePosArr[base + 5] = workPos[j * 3 + 2];
            lineColorArr[base]     = r; lineColorArr[base + 1] = g; lineColorArr[base + 2] = b;
            lineColorArr[base + 3] = r; lineColorArr[base + 4] = g; lineColorArr[base + 5] = b;
            lineIdx++;
          }
        }
      }
      lineGeo.setDrawRange(0, lineIdx * 2);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate    = true;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      ptGeo.dispose(); ptMat.dispose();
      lineGeo.dispose(); lineMat.dispose();
      renderer.dispose();
    };
  }, []); // empty dep array — runs once, never restarts

  const accent = isDark ? '#64ffda' : '#0891b2';

  return (
    <div className="relative h-screen flex items-center overflow-hidden bg-white dark:bg-[#0a0f1e]">
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-[350ms] ${isDark ? 'opacity-100' : 'opacity-25'}`}
      />

      {/* Overlay — in light mode a strong directional gradient shields text from the canvas */}
      <div
        className="absolute inset-0 transition-[background] duration-[350ms]"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(10,15,30,0.7) 100%)'
            : 'linear-gradient(to right, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.92) 35%, rgba(255,255,255,0.55) 60%, rgba(255,255,255,0.05) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-20 max-w-6xl mx-auto w-full">

        {/* Status badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-sm font-mono border transition-colors duration-[350ms]"
          style={{
            borderColor: isDark ? 'rgba(100,255,218,0.3)' : 'rgba(8,145,178,0.35)',
            backgroundColor: isDark ? 'rgba(100,255,218,0.05)' : 'rgba(8,145,178,0.06)',
            color: accent,
          }}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
          Available for opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-[clamp(3.5rem,10vw,7.5rem)] font-bold leading-[0.92] tracking-tight text-gray-900 dark:text-white mb-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Swayam<br />
          <span className="transition-colors duration-[350ms]" style={{ color: accent }}>Dani</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          className="flex items-center gap-1 text-xl sm:text-2xl font-mono text-slate-500 dark:text-slate-400 mb-6 h-9"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span>{displayed}</span>
          <span className="animate-pulse font-light transition-colors duration-[350ms]" style={{ color: accent }}>_</span>
        </motion.div>

        {/* One-liner */}
        <motion.p
          className="max-w-md text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Building at the intersection of AI/ML, full-stack, and cybersecurity.
          Currently developing proprietary AI systems at HandsInTech.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-7 py-3 border font-semibold rounded-sm transition-colors duration-[350ms] hover:bg-[currentColor]/5"
            style={{ borderColor: accent, color: accent }}
            aria-label="View My Work"
          >
            View My Work
            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 text-slate-500 dark:text-slate-400 font-semibold hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            aria-label="Contact Me"
          >
            <FiMail className="transition-colors duration-[350ms]" style={{ color: accent }} />
            Contact Me
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex items-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a
            href="https://github.com/SwayamDani"
            target="_blank" rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-slate-400 dark:text-slate-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            <FiGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/swayam-dani-554091299"
            target="_blank" rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-slate-400 dark:text-slate-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            <FiLinkedin size={20} />
          </a>
          <span className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-1" />
          <a
            href="mailto:sdani025@ucsd.edu"
            className="text-slate-400 dark:text-slate-500 font-mono text-sm hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            sdani025@ucsd.edu
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <span className="text-slate-600 dark:text-slate-500 text-xs font-mono tracking-widest uppercase">scroll</span>
        <motion.div
          className="w-px h-10 transition-[background] duration-[350ms]"
          style={{ background: `linear-gradient(to bottom, ${accent}99, transparent)` }}
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
}
