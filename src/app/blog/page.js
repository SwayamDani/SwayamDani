'use client'
import React from 'react'
import Blogs from '../components/Blog'
import { motion } from 'framer-motion'

export default function BlogPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-16"
    >
      <Blogs />
    </motion.div>
  )
}