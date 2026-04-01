"use client";

import { useState } from "react";
import styles from "./PollCard.module.css";

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

  return (
    <div className={styles.card}>
      <h3 className={styles.question}>{updatedPoll.question}</h3>
      <div className={styles.options}>
        {updatedPoll.options.map((opt, i) => {
          const percent = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);
          return (
            <button
              key={i}
              className={`${styles.optionBtn} ${voted ? styles.votedMode : ""}`}
              onClick={() => handleVote(i)}
              disabled={voted || isSubmitting}
            >
              <div
                className={styles.progress}
                style={{ width: voted ? `${percent}%` : "0%" }}
              ></div>
              <span className={styles.optText}>{opt.text}</span>
              {voted && <span className={styles.optPercent}>{percent}%</span>}
            </button>
          );
        })}
      </div>
      <p className={styles.totalVotes}>{totalVotes} votes</p>
    </div>
  );
}
