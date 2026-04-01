"use client";

import { useEffect, useState } from "react";
import styles from "./GallerySection.module.css";
import { motion } from "framer-motion";
import Image from "next/image";

export default function GallerySection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setItems(data.data);
        }
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="gallery" className={styles.section}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.heading}>Past Events <span className={styles.highlight}>Gallery</span></h2>
          <p className={styles.subheading}>Highlights from our recent meetups.</p>
        </motion.div>
        
        {loading ? (
          <p className={styles.msg}>Loading gallery...</p>
        ) : items.length === 0 ? (
          <p className={styles.msg}>No gallery items available right now.</p>
        ) : (
          <motion.div 
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {items.map((item) => (
              <motion.div 
                key={item._id} 
                className={styles.item}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02, zIndex: 10, boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
              >
                {item.mediaType === "video" ? (
                  <video src={item.mediaUrl} controls className={styles.media} />
                ) : (
                  <Image 
                    src={item.mediaUrl} 
                    alt={item.description || "Gallery Item"} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.media} 
                  />
                )}
                {item.description && (
                  <div className={styles.overlay}>
                    <p>{item.description}</p>
                  </div>
                )}
                <div className={styles.neonBorder}></div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

