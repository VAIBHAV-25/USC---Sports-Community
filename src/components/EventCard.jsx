"use client";
import styles from "./EventCard.module.css";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export default function EventCard({ event }) {
  const dateObj = new Date(event.date);
  const month = dateObj.toLocaleString("default", { month: "short" });
  const day = dateObj.getDate();

  const cardVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -15 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      className={styles.card}
      variants={cardVariants}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0, 255, 170, 0.2)" }}
    >
      {event.mediaUrl && (
        <div className={styles.mediaContainer}>
          {event.mediaType === "video" ? (
            <video src={event.mediaUrl} controls className={styles.media} />
          ) : (
            <Image 
              src={event.mediaUrl} 
              alt={event.title} 
              fill
              className={styles.media} 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <div className={styles.overlay}></div>
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.dateBadge}>
          <span className={styles.day}>{day}</span>
          <span className={styles.month}>{month}</span>
        </div>
        <div className={styles.details}>
          <h3 className={styles.title}>{event.title}</h3>
          <p className={styles.location}>
            <span className={styles.locationIcon}>❖</span> {event.location}
          </p>
          <p className={styles.description}>{event.description}</p>
          <motion.button 
            className={styles.registerBtn}
            whileHover={{ scale: 1.05, backgroundColor: "var(--primary)", color: "var(--background)" }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </div>
      </div>
      <div className={styles.neonLine}></div>
    </motion.div>
  );
}

