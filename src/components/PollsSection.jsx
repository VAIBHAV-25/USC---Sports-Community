"use client";

import { useEffect, useState } from "react";
import PollCard from "./PollCard";
import styles from "./PollsSection.module.css";

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

  return (
    <section id="polls" className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>Community Polls</h2>
        <p className={styles.subheading}>Have your say on what we play next!</p>
        {loading ? (
          <p className={styles.loading}>Loading polls...</p>
        ) : polls.length === 0 ? (
          <p className={styles.empty}>No active polls right now.</p>
        ) : (
          <div className={styles.grid}>
            {polls.map((poll) => (
              <PollCard key={poll._id} poll={poll} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
