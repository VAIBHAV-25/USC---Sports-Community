"use client";

import { useEffect, useState } from "react";
import PollCard from "./PollCard";
import styles from "./PollsSection.module.css";
import { motion } from "framer-motion";

export default function PollsSection() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/polls")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPolls(data.data);
        }
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, type: "spring", bounce: 0.4 }
    }
  };

  const wobbleVariants = {
    wobble: {
      rotate: [0, -10, 10, -10, 10, 0],
      scale: [1, 1.1, 1],
      transition: { duration: 1.5, repeat: Infinity, repeatDelay: 1 }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="polls" className={styles.section}>
      <div className="container">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <h2 className={styles.heading}>Community <span className={styles.highlight}>Polls</span></h2>
          <p className={styles.subheading}>Have your say on what we play next!</p>
        </motion.div>

        {loading ? (
          <p className={styles.loading}>Loading polls...</p>
        ) : polls.length === 0 ? (
          <motion.div 
            className={styles.emptyState}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <motion.div className={styles.iconWrapper} variants={wobbleVariants} animate="wobble">
              <span className={styles.emojiLarge}>🎯</span>
              <span className={styles.emojiLarge}>⏱️</span>
            </motion.div>
            <h3 className={styles.emptyTitle}>The crowd is waiting...</h3>
            <p className={styles.emptyDesc}>There are no active polls right now. We need you to take the court!</p>
          </motion.div>
        ) : (
          <motion.div 
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {polls.map((poll) => (
              <PollCard key={poll._id} poll={poll} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

