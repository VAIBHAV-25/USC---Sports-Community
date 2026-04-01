import styles from "./EventCard.module.css";

export default function EventCard({ event }) {
  const dateObj = new Date(event.date);
  const month = dateObj.toLocaleString("default", { month: "short" });
  const day = dateObj.getDate();

  return (
    <div className={styles.card}>
      {event.mediaUrl && (
        <div className={styles.mediaContainer}>
          {event.mediaType === "video" ? (
            <video src={event.mediaUrl} controls className={styles.media} />
          ) : (
            <img src={event.mediaUrl} alt={event.title} className={styles.media} />
          )}
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.dateBadge}>
          <span className={styles.month}>{month}</span>
          <span className={styles.day}>{day}</span>
        </div>
        <div className={styles.details}>
          <h3 className={styles.title}>{event.title}</h3>
          <p className={styles.location}>📍 {event.location}</p>
          <p className={styles.description}>{event.description}</p>
          <button className={styles.registerBtn}>Register</button>
        </div>
      </div>
    </div>
  );
}
