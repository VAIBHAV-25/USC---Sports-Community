"use client";
import styles from "./Hero.module.css";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.glowOrb1}></div>
      <div className={styles.glowOrb2}></div>
      
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

