import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.info}>
          <h3>🏅 SportsComm</h3>
          <p>Your local community for all things sports. Join us for weekly events, polls, and stay active!</p>
        </div>
        <div className={styles.links}>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#events">Upcoming Events</a></li>
            <li><a href="#polls">Vote on Sports</a></li>
            <li><a href="#suggestions">Suggest a Sport</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Sports Community. All rights reserved.</p>
      </div>
    </footer>
  );
}
