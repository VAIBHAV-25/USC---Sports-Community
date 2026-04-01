import styles from "./Hero.module.css";
import Link from "next/link";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        <h1 className={styles.title}>
          Play. Compete. <span>Connect.</span>
        </h1>
        <p className={styles.subtitle}>
          Join the most active local sports community. Discover upcoming events,
          vote on your favorite sports, and suggest new activities. Let&apos;s get moving!
        </p>
        <div className={styles.ctaGroup}>
          <Link href="#events" className={styles.primaryBtn}>
            Find Events
          </Link>
          <Link href="#polls" className={styles.secondaryBtn}>
            Vote Now
          </Link>
        </div>
      </div>
      <div className={styles.patternOverlay}></div>
    </section>
  );
}
