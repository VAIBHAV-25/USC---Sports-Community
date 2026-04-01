"use client";

import { useEffect, useState } from "react";
import styles from "./SuggestionsSection.module.css";

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

  return (
    <section id="suggestions" className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>Suggest a Sport</h2>
        <p className={styles.subheading}>Don&apos;t see your favorite? Suggest it here and upvote others!</p>
        
        <div className={styles.contentWrapper}>
          <div className={styles.formPanel}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="sportName">Sport Name</label>
                <input type="text" id="sportName" required value={formData.sportName} onChange={(e) => setFormData({...formData, sportName: e.target.value})} placeholder="e.g. Badminton" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="sportDesc">Description (Optional)</label>
                <textarea id="sportDesc" rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Why should we play this?"></textarea>
              </div>
              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Suggestion"}
              </button>
            </form>
          </div>

          <div className={styles.listPanel}>
            {loading ? (
              <p className={styles.msg}>Loading suggestions...</p>
            ) : suggestions.length === 0 ? (
              <p className={styles.msg}>No suggestions yet. Be the first!</p>
            ) : (
              <ul className={styles.list}>
                {suggestions.map((s) => (
                  <li key={s._id} className={styles.listItem}>
                    <div className={styles.itemInfo}>
                      <h4 className={styles.itemName}>{s.sportName}</h4>
                      {s.description && <p className={styles.itemDesc}>{s.description}</p>}
                    </div>
                    <button className={styles.upvoteBtn} onClick={() => handleUpvote(s._id)}>
                      <span className={styles.upvoteIcon}>▲</span>
                      {s.upvotes}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
