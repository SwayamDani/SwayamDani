'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, submitted: false, error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });
    try {
      const res = await fetch('https://formspree.io/f/myzezqdg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setStatus({ submitting: false, submitted: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus({ submitting: false, submitted: false, error: null }), 5000);
    } catch {
      setStatus({ submitting: false, submitted: false, error: 'Something went wrong. Please try again.' });
    }
  };

  const inputClass =
    'w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 rounded text-gray-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-[#64ffda] focus:ring-1 focus:ring-[#64ffda]/30 transition-colors duration-200';

  return (
    <div className="py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">

        {/* Section header */}
        <motion.p
          className="text-[#64ffda] font-mono text-sm mb-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          06. contact
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          className="text-slate-500 dark:text-slate-400 max-w-xl mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Whether you have a question, opportunity, or just want to say hi — my inbox is open.
        </motion.p>

        <div className="grid md:grid-cols-5 gap-12 lg:gap-16">

          {/* Contact info — narrower column */}
          <motion.div
            className="md:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {[
              { Icon: FiMail,    label: 'Email',    value: 'sdani025@ucsd.edu',  href: 'mailto:sdani025@ucsd.edu' },
              { Icon: FiMapPin,  label: 'Location', value: 'San Diego, CA',      href: null },
            ].map(({ Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded border border-slate-200 dark:border-slate-700/60 flex items-center justify-center bg-white dark:bg-[#0d1117]">
                  <Icon size={16} className="text-[#64ffda]" />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm text-gray-700 dark:text-slate-300 hover:text-[#64ffda] transition-colors duration-200">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-700 dark:text-slate-300">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <p className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Elsewhere</p>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/swayam-dani-554091299"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded border border-slate-200 dark:border-slate-700/60 flex items-center justify-center bg-white dark:bg-[#0d1117] text-slate-500 hover:text-[#64ffda] hover:border-[#64ffda]/40 transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin size={16} />
                </a>
                <a
                  href="https://github.com/SwayamDani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded border border-slate-200 dark:border-slate-700/60 flex items-center justify-center bg-white dark:bg-[#0d1117] text-slate-500 hover:text-[#64ffda] hover:border-[#64ffda]/40 transition-all duration-200"
                  aria-label="GitHub"
                >
                  <FiGithub size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form — wider column */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {status.submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[320px] text-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#64ffda] flex items-center justify-center">
                  <FiSend size={20} className="text-[#64ffda]" />
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">Message sent!</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-slate-500 dark:text-slate-500 mb-2 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-slate-500 dark:text-slate-500 mb-2 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-mono text-slate-500 dark:text-slate-500 mb-2 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-slate-500 dark:text-slate-500 mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell me what you have in mind..."
                    className={inputClass}
                    required
                  />
                </div>

                {status.error && (
                  <p className="text-sm text-red-500 dark:text-red-400">{status.error}</p>
                )}

                <button
                  type="submit"
                  disabled={status.submitting}
                  className="inline-flex items-center gap-2 px-7 py-3 border border-[#64ffda] text-[#64ffda] text-sm font-semibold rounded-sm hover:bg-[#64ffda]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 accent-glow"
                >
                  <FiSend size={15} />
                  {status.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
