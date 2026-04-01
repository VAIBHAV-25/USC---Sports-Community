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
      transition: { staggerChildren: 0.15 }
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
        >
          Upcoming <span className={styles.highlight}>Events</span>
        </motion.h2>

        {loading ? (
          <p className={styles.loading}>Loading events...</p>
        ) : events.length === 0 ? (
          <p className={styles.empty}>No upcoming events found. Check back later!</p>
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

