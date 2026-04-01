"use client";

import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import styles from "./EventsSection.module.css";

export default function EventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEvents(data.data);
        }
        setLoading(false);
      });
  }, []);

  return (
    <section id="events" className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>Upcoming Events</h2>
        {loading ? (
          <p className={styles.loading}>Loading events...</p>
        ) : events.length === 0 ? (
          <p className={styles.empty}>No upcoming events found. Check back later!</p>
        ) : (
          <div className={styles.grid}>
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
