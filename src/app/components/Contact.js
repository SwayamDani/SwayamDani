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
      // In a real application, you would send this data to your backend
      // For demo purposes, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus({ submitting: false, submitted: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus({ submitting: false, submitted: false, error: null });
      }, 5000);
    } catch (error) {
      setFormStatus({ submitting: false, submitted: false, error: 'There was an error submitting the form. Please try again.' });
    }
  };

  return (
    <div className="container mx-auto py-20 px-4">
      <h2 className="text-4xl font-bold mb-4 text-center">Contact Me</h2>
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
          <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg mr-4">
                <FiMail className="text-green-600 dark:text-green-300 text-xl" />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-1">Email</h4>
                <p className="text-gray-600 dark:text-gray-400">sdani025@ucr.edu</p>
                <p className="text-gray-600 dark:text-gray-400">swayamashishdani@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg mr-4">
                <FiPhone className="text-green-600 dark:text-green-300 text-xl" />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-1">Phone</h4>
                <p className="text-gray-600 dark:text-gray-400">+1 341-224-3555</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg mr-4">
                <FiMapPin className="text-green-600 dark:text-green-300 text-xl" />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-1">Location</h4>
                <p className="text-gray-600 dark:text-gray-400">Riverside, CA</p>
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
                className="bg-green-100 dark:bg-green-900 p-3 rounded-lg text-green-600 dark:text-green-300 hover:bg-green-500 hover:text-white transition-colors duration-300"
              >
                <FiLinkedin className="text-xl" />
              </a>
              <a 
                href="https://github.com/SwayamDani" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-100 dark:bg-green-900 p-3 rounded-lg text-green-600 dark:text-green-300 hover:bg-green-500 hover:text-white transition-colors duration-300"
              >
                <FiGithub className="text-xl" />
              </a>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
          
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
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className={`w-full px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors duration-300 ${
                  formStatus.submitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {formStatus.submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}