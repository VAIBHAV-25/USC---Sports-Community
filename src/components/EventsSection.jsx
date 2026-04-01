"use client";

import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import styles from "./EventsSection.module.css";
import { motion } from "framer-motion";

export default function EventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEvents(data.data);
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

  const bounceVariants = {
    hover: {
      y: [0, -15, 0],
      rotate: [0, 15, -15, 0],
      transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="events" className={styles.section}>
      <div className="container">
        <motion.h2 
          className={styles.heading}
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          Upcoming <span className={styles.highlight}>Events</span>
        </motion.h2>

        {loading ? (
          <p className={styles.loading}>Loading events...</p>
        ) : events.length === 0 ? (
          <motion.div 
            className={styles.emptyState}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          >
            <motion.div className={styles.iconWrapper} variants={bounceVariants} animate="hover">
              <span className={styles.emoji}>⚽</span>
              <span className={styles.emoji}>🏀</span>
              <span className={styles.emoji}>🎾</span>
            </motion.div>
            <h3 className={styles.emptyTitle}>The field is empty!</h3>
            <p className={styles.emptyDesc}>No games lined up yet. Suggest a new match to get things started.</p>
          </motion.div>
        ) : (
          <motion.div 
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

