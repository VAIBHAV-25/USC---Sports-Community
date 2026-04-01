"use client";
import styles from "./Hero.module.css";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse moves
  const springX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  // Orb 1 moves with the mouse (mildly)
  const orb1X = useTransform(springX, (v) => v * 0.15);
  const orb1Y = useTransform(springY, (v) => v * 0.15);

  // Orb 2 moves in opposite direction
  const orb2X = useTransform(springX, (v) => v * -0.15);
  const orb2Y = useTransform(springY, (v) => v * -0.15);
  
  // Floating sports elements
  const floatElX1 = useTransform(springX, (v) => v * 0.05);
  const floatElY1 = useTransform(springY, (v) => v * -0.05);

  const floatElX2 = useTransform(springX, (v) => v * -0.08);
  const floatElY2 = useTransform(springY, (v) => v * 0.08);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handlePointerMove = (e) => {
    if (typeof window === "undefined") return;
    const { clientX, clientY } = e;
    mouseX.set(clientX - window.innerWidth / 2);
    mouseY.set(clientY - window.innerHeight / 2);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", bounce: 0.6, duration: 0.8 }
    }
  };

  const floatAnimation = {
    float: {
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <section className={styles.hero} onPointerMove={handlePointerMove}>
      {isMounted && (
        <>
          <motion.div className={styles.glowOrb1} style={{ x: orb1X, y: orb1Y }}></motion.div>
          <motion.div className={styles.glowOrb2} style={{ x: orb2X, y: orb2Y }}></motion.div>
          
          <motion.div 
            className={`${styles.floatingEmoji} ${styles.emoji1}`} 
            style={{ x: floatElX1, y: floatElY1 }}
            variants={floatAnimation}
            animate="float"
            whileHover={{ scale: 1.5, rotate: 360, transition: { duration: 0.5 } }}
          >
            🏀
          </motion.div>

          <motion.div 
            className={`${styles.floatingEmoji} ${styles.emoji2}`} 
            style={{ x: floatElX2, y: floatElY2 }}
            variants={floatAnimation}
            animate="float"
            whileHover={{ scale: 1.5, rotate: -360, transition: { duration: 0.5 } }}
          >
            🎾
          </motion.div>

          <motion.div 
            className={`${styles.floatingEmoji} ${styles.emoji3}`} 
            variants={floatAnimation}
            animate="float"
            style={{ x: floatElX1, y: floatElY2, animationDelay: "1s" }}
            whileHover={{ scale: 1.5, rotate: 360, transition: { duration: 0.5 } }}
          >
            ⚽
          </motion.div>
        </>
      )}
      
      <motion.div 
        className={`container ${styles.heroContainer}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={styles.title} variants={itemVariants}>
          Play. Compete. <span className={styles.gradientText}>Connect.</span>
        </motion.h1>
        
        <motion.p className={styles.subtitle} variants={itemVariants}>
          Join the most active local sports community. Discover upcoming events,
          vote on your favorite sports, and suggest new activities. Let&apos;s get moving!
        </motion.p>
        
        <motion.div className={styles.ctaGroup} variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="#events" className={styles.primaryBtn}>
              Find Events
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="#polls" className={styles.secondaryBtn}>
              Vote Now
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      <div className={styles.patternOverlay}></div>
    </section>
  );
}

