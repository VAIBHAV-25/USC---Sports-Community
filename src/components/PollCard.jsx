"use client";

import { useState } from "react";
import styles from "./PollCard.module.css";
import { motion, AnimatePresence } from "framer-motion";

export default function PollCard({ poll }) {
  const [voted, setVoted] = useState(false);
  const [updatedPoll, setUpdatedPoll] = useState(poll);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalVotes = updatedPoll.options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = async (index) => {
    if (voted || isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`/api/polls/${poll._id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionIndex: index }),
      });
      const data = await res.json();
      if (data.success) {
        setUpdatedPoll(data.data);
        setVoted(true);
      }
    } catch (e) {
      console.error(e);
    }
    setIsSubmitting(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div 
      className={styles.card}
      variants={cardVariants}
      whileHover={{ y: -8, boxShadow: "0 10px 30px rgba(0, 240, 255, 0.15)" }}
    >
      <h3 className={styles.question}>{updatedPoll.question}</h3>
      <div className={styles.options}>
        {updatedPoll.options.map((opt, i) => {
          const percent = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);
          return (
            <motion.button
              key={i}
              className={`${styles.optionBtn} ${voted ? styles.votedMode : ""}`}
              onClick={() => handleVote(i)}
              disabled={voted || isSubmitting}
              whileHover={!voted ? { scale: 1.02, backgroundColor: "rgba(0, 240, 255, 0.1)" } : {}}
              whileTap={!voted ? { scale: 0.98 } : {}}
            >
              <div
                className={styles.progress}
                style={{ width: voted ? `${percent}%` : "0%" }}
              ></div>
              <span className={styles.optText}>{opt.text}</span>
              <AnimatePresence>
                {voted && (
                  <motion.span 
                    className={styles.optPercent}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {percent}%
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
      <p className={styles.totalVotes}>{totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}</p>
      <div className={styles.neonGlow}></div>
    </motion.div>
  );
}

