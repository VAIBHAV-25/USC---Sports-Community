"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export default function Navbar() {
  const linkVariants = {
    hover: { scale: 1.05, color: "var(--primary)", textShadow: "0 0 8px var(--primary)" }
  };

  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <motion.div
            whileHover={{ rotate: 180, scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <Activity className={styles.icon} size={28} />
          </motion.div>
          <span>SportsComm</span>
        </Link>
        <ul className={styles.navLinks}>
          {['Events', 'Polls', 'Suggestions', 'Gallery'].map((item) => (
            <motion.li key={item} variants={linkVariants} whileHover="hover">
              <Link href={`#${item.toLowerCase()}`}>
                {item}
              </Link>
            </motion.li>
          ))}
        </ul>
        <div className={styles.actions}>
          <motion.div whileHover={{ scale: 1.05, boxShadow: "0 0 15px var(--accent)" }} whileTap={{ scale: 0.95 }}>
            <Link href="/admin" className={styles.adminBtn}>Admin</Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}

