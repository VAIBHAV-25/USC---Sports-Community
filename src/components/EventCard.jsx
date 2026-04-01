import styles from "./EventCard.module.css";
import { motion } from "framer-motion";
import Image from "next/image";

export default function EventCard({ event }) {
  const dateObj = new Date(event.date);
  const month = dateObj.toLocaleString("default", { month: "short" });
  const day = dateObj.getDate();

  const cardVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -15 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div 
      className={styles.card}
      variants={cardVariants}
      whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0, 240, 255, 0.2)" }}
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

