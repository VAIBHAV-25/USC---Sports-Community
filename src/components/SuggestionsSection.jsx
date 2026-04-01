"use client";

import { useEffect, useState } from "react";
import styles from "./SuggestionsSection.module.css";
import { motion, AnimatePresence } from "framer-motion";

export default function SuggestionsSection() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ sportName: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const res = await fetch("/api/suggestions");
      const data = await res.json();
      if (data.success) setSuggestions(data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async (id) => {
    try {
      const res = await fetch(`/api/suggestions/${id}/upvote`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSuggestions(suggestions.map(s => s._id === id ? data.data : s));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.sportName) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSuggestions([data.data, ...suggestions]);
        setFormData({ sportName: "", description: "" });
      }
    } catch (e) {
      console.error(e);
    }
    setIsSubmitting(false);
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="suggestions" className={styles.section}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.heading}>Suggest a <span className={styles.highlight}>Sport</span></h2>
          <p className={styles.subheading}>Don&apos;t see your favorite? Suggest it here and upvote others!</p>
        </motion.div>
        
        <div className={styles.contentWrapper}>
          <motion.div 
            className={styles.formPanel}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.panelGlow}></div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="sportName">Sport Name</label>
                <input type="text" id="sportName" required value={formData.sportName} onChange={(e) => setFormData({...formData, sportName: e.target.value})} placeholder="e.g. Badminton" />
                <div className={styles.inputLine}></div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="sportDesc">Description (Optional)</label>
                <textarea id="sportDesc" rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Why should we play this?"></textarea>
                <div className={styles.inputLine}></div>
              </div>
              <motion.button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Adding..." : "Add Suggestion"}
              </motion.button>
            </form>
          </motion.div>

          <div className={styles.listPanel}>
            {loading ? (
              <p className={styles.msg}>Loading suggestions...</p>
            ) : suggestions.length === 0 ? (
              <p className={styles.msg}>No suggestions yet. Be the first!</p>
            ) : (
              <motion.ul 
                className={styles.list}
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <AnimatePresence>
                  {suggestions.map((s) => (
                    <motion.li 
                      key={s._id} 
                      className={styles.listItem}
                      variants={itemVariants}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <div className={styles.itemInfo}>
                        <h4 className={styles.itemName}>{s.sportName}</h4>
                        {s.description && <p className={styles.itemDesc}>{s.description}</p>}
                      </div>
                      <motion.button 
                        className={styles.upvoteBtn} 
                        onClick={() => handleUpvote(s._id)}
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 240, 255, 0.2)" }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span className={styles.upvoteIcon}>▲</span>
                        {s.upvotes}
                      </motion.button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

