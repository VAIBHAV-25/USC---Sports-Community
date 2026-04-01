"use client";
import { motion, useScroll, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./ClientInteractions.module.css";

export default function ClientInteractions() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'button' || 
        e.target.tagName.toLowerCase() === 'a' || 
        e.target.closest('button') || 
        e.target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // center the 32px ring
    cursorX.set(mousePosition.x - 16);
    cursorY.set(mousePosition.y - 16);
  }, [mousePosition, cursorX, cursorY]);

  if (!isMounted) return null;

  return (
    <>
      <motion.div className={styles.progressBar} style={{ scaleX }} />
      <motion.div 
        className={styles.customCursor} 
        style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
        animate={{ 
          scale: isHovering ? 1.5 : 1, 
          backgroundColor: isHovering ? "rgba(0, 255, 170, 0.2)" : "transparent"
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  );
}
