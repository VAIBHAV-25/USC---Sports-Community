import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.icon}>🏅</span>
          SportsComm
        </Link>
        <ul className={styles.navLinks}>
          <li><Link href="#events">Events</Link></li>
          <li><Link href="#polls">Polls</Link></li>
          <li><Link href="#suggestions">Suggestions</Link></li>
          <li><Link href="#gallery">Gallery</Link></li>
        </ul>
        <div className={styles.actions}>
          <Link href="/admin" className={styles.adminBtn}>Admin</Link>
        </div>
      </div>
    </nav>
  );
}
