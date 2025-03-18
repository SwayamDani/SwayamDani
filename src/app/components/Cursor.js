'use client'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  
  useEffect(() => {
    // Only show custom cursor on desktop devices
    if (window.innerWidth > 768) {
      setHidden(false);
      
      const updatePosition = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };
      
      const handleLinkHoverEvents = () => {
        document.querySelectorAll('a, button').forEach(el => {
          el.addEventListener('mouseenter', () => setLinkHovered(true));
          el.addEventListener('mouseleave', () => setLinkHovered(false));
        });
      };
      
      const handleMouseDown = () => setClicked(true);
      const handleMouseUp = () => setClicked(false);
      
      window.addEventListener('mousemove', updatePosition);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('DOMContentLoaded', handleLinkHoverEvents);
      
      // Add event after component mount as well
      handleLinkHoverEvents();
      
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener('mousemove', updatePosition);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        document.querySelectorAll('a, button').forEach(el => {
          el.removeEventListener('mouseenter', () => setLinkHovered(true));
          el.removeEventListener('mouseleave', () => setLinkHovered(false));
        });
      };
    }
  }, []);
  
  if (hidden) return null;
  
  return (
    <>
      <motion.div
        className="cursor-dot fixed top-0 left-0 w-3 h-3 bg-green-500 rounded-full pointer-events-none z-[100]"
        style={{ mixBlendMode: 'difference' }}
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: clicked ? 0.5 : linkHovered ? 0.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      
      <motion.div
        className="cursor-ring fixed top-0 left-0 w-10 h-10 border-2 border-green-500 rounded-full pointer-events-none z-[99]"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: clicked ? 1.2 : linkHovered ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 20,
          mass: 0.8,
        }}
      />
    </>
  );
}