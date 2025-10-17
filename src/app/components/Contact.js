'use client'
import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: null });
    
    try {
      // Replace 'xxxxxxxz' with your actual Formspree form ID
      const response = await fetch('https://formspree.io/f/myzezqdg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }
      
      setFormStatus({ submitting: false, submitted: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus({ submitting: false, submitted: false, error: null });
      }, 5000);
    } catch (error) {
      setFormStatus({ 
        submitting: false, 
        submitted: false, 
        error: 'There was an error submitting the form. Please try again.' 
      });
    }
  };

  return (
    <div className="container mx-auto py-24 px-4 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-0 w-2/3 h-96 bg-gradient-to-br from-green-200/40 via-blue-200/30 to-purple-200/20 rounded-full blur-3xl -translate-x-1/2"></div>
      </div>
      <h2 className="text-4xl font-extrabold mb-4 text-center bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">Contact Me</h2>
      <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
        Have a question or want to work together? Feel free to reach out!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="rounded-3xl bg-white/60 dark:bg-gray-900/60 shadow-2xl backdrop-blur-md border border-white/20 p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Get In Touch</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 p-3 rounded-lg mr-4 shadow-md">
                  <FiMail className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Email</h4>
                  <p className="text-gray-600 dark:text-gray-400">swayamdani@swayamdani.com</p>
                  <p className="text-gray-600 dark:text-gray-400">swayamashishdani@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 p-3 rounded-lg mr-4 shadow-md">
                  <FiPhone className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-400">+1 341-224-3555</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 p-3 rounded-lg mr-4 shadow-md">
                  <FiMapPin className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Location</h4>
                  <p className="text-gray-600 dark:text-gray-400">La Jolla, CA</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4">Connect With Me</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/swayam-dani-554091299"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 p-3 rounded-lg text-white hover:scale-105 shadow-md transition-all duration-300"
                >
                  <FiLinkedin className="text-xl" />
                </a>
                <a
                  href="https://github.com/SwayamDani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 p-3 rounded-lg text-white hover:scale-105 shadow-md transition-all duration-300"
                >
                  <FiGithub className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="rounded-3xl bg-white/60 dark:bg-gray-900/60 shadow-2xl backdrop-blur-md border border-white/20 p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send Me a Message</h3>
            {formStatus.submitted ? (
              <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg">
                <p className="font-medium">Thank you for your message!</p>
                <p>I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400 transition-all duration-200"
                    required
                  ></textarea>
                </div>
                {formStatus.error && (
                  <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
                    {formStatus.error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={formStatus.submitting}
                  className={`w-full px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-full shadow-lg hover:from-blue-500 hover:to-green-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                    formStatus.submitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {formStatus.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}