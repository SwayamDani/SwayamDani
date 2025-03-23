'use client'
import React from 'react'
import Tutorials from '../components/Tutorials'
import { motion } from 'framer-motion'

export default function TutorialsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-16"
    >
      <Tutorials />
    </motion.div>
  )
}