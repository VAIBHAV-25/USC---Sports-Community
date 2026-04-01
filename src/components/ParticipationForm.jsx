"use client";

import { useState } from "react";
import styles from "./ParticipationForm.module.css";

export default function ParticipationForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    preferredSport: "",
    availability: "",
    requirements: ""
  });
  const [status, setStatus] = useState("idle");

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

  return (
    <section id="register" className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.formWrapper}>
          <h2 className={styles.heading}>Register Interest</h2>
          <p className={styles.subheading}>Join our upcoming sessions. Let us know what you want to play!</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name *</label>
              <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contact">Email or Phone *</label>
              <input type="text" id="contact" name="contact" required value={formData.contact} onChange={handleChange} />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="preferredSport">Preferred Sport *</label>
                <select id="preferredSport" name="preferredSport" required value={formData.preferredSport} onChange={handleChange}>
                  <option value="">Select a sport</option>
                  <option value="Football">Football</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Tennis">Tennis</option>
                  <option value="Volleyball">Volleyball</option>
                  <option value="Cricket">Cricket</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="availability">Availability *</label>
                <select id="availability" name="availability" required value={formData.availability} onChange={handleChange}>
                  <option value="">Select availability</option>
                  <option value="Weekdays (Evening)">Weekdays (Evening)</option>
                  <option value="Weekends (Morning)">Weekends (Morning)</option>
                  <option value="Weekends (Evening)">Weekends (Evening)</option>
                  <option value="Anytime">Anytime</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="requirements">Any other requirements?</label>
              <textarea id="requirements" name="requirements" rows="3" value={formData.requirements} onChange={handleChange} placeholder="Skill level, equipment needs, etc."></textarea>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={status === "submitting"}>
              {status === "submitting" ? "Submitting..." : "Submit Registration"}
            </button>

            {status === "success" && <p className={styles.successMsg}>✅ Successfully registered! We&apos;ll be in touch.</p>}
            {status === "error" && <p className={styles.errorMsg}>❌ Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
