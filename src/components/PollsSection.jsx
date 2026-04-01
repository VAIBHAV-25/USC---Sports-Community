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
      transition: { staggerChildren: 0.15 }
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
        >
          <h2 className={styles.heading}>Community <span className={styles.highlight}>Polls</span></h2>
          <p className={styles.subheading}>Have your say on what we play next!</p>
        </motion.div>

        {loading ? (
          <p className={styles.loading}>Loading polls...</p>
        ) : polls.length === 0 ? (
          <p className={styles.empty}>No active polls right now.</p>
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

