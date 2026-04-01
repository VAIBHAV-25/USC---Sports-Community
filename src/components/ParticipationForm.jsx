"use client";

import { useState } from "react";
import styles from "./ParticipationForm.module.css";
import { motion, AnimatePresence } from "framer-motion";

export default function ParticipationForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    preferredSport: "",
    availability: "",
    requirements: ""
  });
  const [status, setStatus] = useState("idle");
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/participations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", contact: "", preferredSport: "", availability: "", requirements: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="register" className={styles.section}>
      <div className={`container ${styles.container}`}>
        <motion.div 
          className={styles.formWrapper}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={styles.glowDecor1}></div>
          <div className={styles.glowDecor2}></div>
          
          <div className={styles.headerContent}>
            <h2 className={styles.heading}>Register <span className={styles.highlight}>Interest</span></h2>
            <p className={styles.subheading}>Join our upcoming sessions. Let us know what you want to play!</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={`${styles.formGroup} ${focusedField === 'name' ? styles.focused : ''}`}>
              <label htmlFor="name">Full Name *</label>
              <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} />
              <div className={styles.inputLine}></div>
            </div>

            <div className={`${styles.formGroup} ${focusedField === 'contact' ? styles.focused : ''}`}>
              <label htmlFor="contact">Email or Phone *</label>
              <input type="text" id="contact" name="contact" required value={formData.contact} onChange={handleChange} onFocus={() => setFocusedField('contact')} onBlur={() => setFocusedField(null)} />
              <div className={styles.inputLine}></div>
            </div>

            <div className={styles.formRow}>
              <div className={`${styles.formGroup} ${focusedField === 'sport' ? styles.focused : ''}`}>
                <label htmlFor="preferredSport">Preferred Sport *</label>
                <select id="preferredSport" name="preferredSport" required value={formData.preferredSport} onChange={handleChange} onFocus={() => setFocusedField('sport')} onBlur={() => setFocusedField(null)}>
                  <option value="">Select a sport</option>
                  <option value="Football">Football</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Tennis">Tennis</option>
                  <option value="Volleyball">Volleyball</option>
                  <option value="Cricket">Cricket</option>
                  <option value="Other">Other</option>
                </select>
                <div className={styles.inputLine}></div>
              </div>

              <div className={`${styles.formGroup} ${focusedField === 'availability' ? styles.focused : ''}`}>
                <label htmlFor="availability">Availability *</label>
                <select id="availability" name="availability" required value={formData.availability} onChange={handleChange} onFocus={() => setFocusedField('availability')} onBlur={() => setFocusedField(null)}>
                  <option value="">Select availability</option>
                  <option value="Weekdays (Evening)">Weekdays (Evening)</option>
                  <option value="Weekends (Morning)">Weekends (Morning)</option>
                  <option value="Weekends (Evening)">Weekends (Evening)</option>
                  <option value="Anytime">Anytime</option>
                </select>
                <div className={styles.inputLine}></div>
              </div>
            </div>

            <div className={`${styles.formGroup} ${focusedField === 'requirements' ? styles.focused : ''}`}>
              <label htmlFor="requirements">Any other requirements?</label>
              <textarea id="requirements" name="requirements" rows="3" value={formData.requirements} onChange={handleChange} placeholder="Skill level, equipment needs, etc." onFocus={() => setFocusedField('requirements')} onBlur={() => setFocusedField(null)}></textarea>
              <div className={styles.inputLine}></div>
            </div>

            <motion.button 
              type="submit" 
              className={styles.submitBtn} 
              disabled={status === "submitting"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {status === "submitting" ? (
                <span className={styles.loader}></span>
              ) : "Submit Registration"}
            </motion.button>

            <AnimatePresence>
              {status === "success" && (
                <motion.div 
                  className={styles.successMsg}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <span className={styles.checkIcon}>✓</span> Successfully registered! We&apos;ll be in touch.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div 
                  className={styles.errorMsg}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <span className={styles.errorIcon}>⚠</span> Something went wrong. Please try again.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

