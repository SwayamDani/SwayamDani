'use client'
import React from 'react';
import { FiLinkedin, FiGithub, FiMail } from 'react-icons/fi';

const quickLinks = [
  { label: 'About',      href: '/#about' },
  { label: 'Projects',   href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact',    href: '/#contact' },
  { label: 'Resume',     href: '/resume' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-[#0d1117] border-t border-slate-200 dark:border-slate-800/60">
      <div className="container mx-auto px-6 lg:px-8 py-10">

        {/* Quick links row */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
          {quickLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-xs font-mono text-slate-400 dark:text-slate-500 hover:text-[#64ffda] transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Wordmark */}
          <div>
            <span className="font-display text-lg font-bold">
              <span className="text-[#64ffda]">S</span>
              <span className="text-gray-900 dark:text-white">D</span>
              <span className="text-[#64ffda] text-xs align-super ml-0.5">.</span>
            </span>
            <p className="text-xs text-slate-400 dark:text-slate-600 mt-0.5 font-mono">
              CS @ UCSD
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/in/swayam-dani-554091299"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-400 hover:text-[#64ffda] transition-colors duration-200"
            >
              <FiLinkedin size={18} />
            </a>
            <a
              href="https://github.com/SwayamDani"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-slate-400 hover:text-[#64ffda] transition-colors duration-200"
            >
              <FiGithub size={18} />
            </a>
            <a
              href="mailto:sdani025@ucsd.edu"
              aria-label="Email"
              className="text-slate-400 hover:text-[#64ffda] transition-colors duration-200"
            >
              <FiMail size={18} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-slate-400 dark:text-slate-600 font-mono">
            &copy; {new Date().getFullYear()} Swayam Dani
          </p>
        </div>
      </div>
    </footer>
  );
}
