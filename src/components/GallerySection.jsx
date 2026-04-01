"use client";

import { useEffect, useState } from "react";
import styles from "./GallerySection.module.css";

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

  return (
    <section id="gallery" className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>Past Events Gallery</h2>
        <p className={styles.subheading}>Highlights from our recent meetups.</p>
        
        {loading ? (
          <p className={styles.msg}>Loading gallery...</p>
        ) : items.length === 0 ? (
          <p className={styles.msg}>No gallery items available right now.</p>
        ) : (
          <div className={styles.grid}>
            {items.map((item) => (
              <div key={item._id} className={styles.item}>
                {item.mediaType === "video" ? (
                  <video src={item.mediaUrl} controls className={styles.media} />
                ) : (
                  <img src={item.mediaUrl} alt={item.description || "Gallery Item"} className={styles.media} />
                )}
                {item.description && (
                  <div className={styles.overlay}>
                    <p>{item.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
