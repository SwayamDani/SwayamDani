'use client'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
  const [position, setPosition]     = useState({ x: 0, y: 0 });
  const [hidden, setHidden]         = useState(true);
  const [clicked, setClicked]       = useState(false);
  const [hoveringLink, setHoveringLink] = useState(false);

  useEffect(() => {
    // Only show on desktop
    if (window.innerWidth <= 768) return;
    setHidden(false);

    const onMove  = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const onDown  = () => setClicked(true);
    const onUp    = () => setClicked(false);

    const addLinkListeners = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', () => setHoveringLink(true));
        el.addEventListener('mouseleave', () => setHoveringLink(false));
      });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);
    addLinkListeners();

    // Re-attach after potential DOM changes
    const observer = new MutationObserver(addLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      observer.disconnect();
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Inner dot — snaps immediately */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] rounded-full"
        style={{
          width: 8,
          height: 8,
          backgroundColor: '#64ffda',
          mixBlendMode: 'difference',
        }}
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: clicked ? 0.4 : hoveringLink ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 28, mass: 0.3 }}
      />

      {/* Outer ring — lags slightly for a fluid feel */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99] rounded-full border"
        style={{
          width: hoveringLink ? 44 : 36,
          height: hoveringLink ? 44 : 36,
          borderColor: '#64ffda',
          opacity: 0.5,
        }}
        animate={{
          x: position.x - (hoveringLink ? 22 : 18),
          y: position.y - (hoveringLink ? 22 : 18),
          scale: clicked ? 0.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 22, mass: 0.6 }}
      />
    </>
  );
}
