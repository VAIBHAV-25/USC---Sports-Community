"use client";

import { useEffect, useState } from "react";
import styles from "./Admin.module.css";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("forms");
  const [forms, setForms] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  
  const [newEvent, setNewEvent] = useState({ title: "", date: "", description: "", location: "" });
  const [newPoll, setNewPoll] = useState({ question: "", options: "Option 1, Option 2" });

  useEffect(() => {
    if (activeTab === "forms") {
      fetch("/api/participations").then(r => r.json()).then(d => setForms(d.data || []));
    } else if (activeTab === "suggestions") {
      fetch("/api/suggestions").then(r => r.json()).then(d => setSuggestions(d.data || []));
    }
  }, [activeTab]);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent)
    });
    alert("Event created!");
    setNewEvent({ title: "", date: "", description: "", location: "" });
  };

  const handleCreatePoll = async (e) => {
    e.preventDefault();
    const optionsArray = newPoll.options.split(",").map(o => ({ text: o.trim(), votes: 0 }));
    await fetch("/api/polls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: newPoll.question, options: optionsArray })
    });
    alert("Poll created!");
    setNewPoll({ question: "", options: "Option 1, Option 2" });
  };

  const exportCSV = () => {
    const headers = ["Name,Contact,Sport,Availability,Date"];
    const rows = forms.map(f => `"${f.name}","${f.contact}","${f.preferredSport}","${f.availability}","${new Date(f.createdAt).toLocaleDateString()}"`);
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "participations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`container ${styles.adminPanel}`}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      
      <div className={styles.tabs}>
        <button className={activeTab === "forms" ? styles.activeTab : ""} onClick={() => setActiveTab("forms")}>Registrations</button>
        <button className={activeTab === "suggestions" ? styles.activeTab : ""} onClick={() => setActiveTab("suggestions")}>Suggestions</button>
        <button className={activeTab === "createEvent" ? styles.activeTab : ""} onClick={() => setActiveTab("createEvent")}>Create Event</button>
        <button className={activeTab === "createPoll" ? styles.activeTab : ""} onClick={() => setActiveTab("createPoll")}>Create Poll</button>
      </div>

      <div className={styles.content}>
        {activeTab === "forms" && (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
              <h2 style={{margin: 0}}>Participation Forms</h2>
              <button onClick={exportCSV} className={styles.submitBtn} style={{padding: '0.5rem 1rem'}}>Export CSV</button>
            </div>
            <div className={styles.tableRef}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Sport</th>
                    <th>Availability</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {forms.map(f => (
                    <tr key={f._id}>
                      <td>{f.name}</td>
                      <td>{f.contact}</td>
                      <td>{f.preferredSport}</td>
                      <td>{f.availability}</td>
                      <td>{new Date(f.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "suggestions" && (
          <div>
            <h2>Community Suggestions</h2>
            <ul className={styles.list}>
              {suggestions.map(s => (
                <li key={s._id} className={styles.listItem}>
                  <strong>{s.sportName}</strong> - {s.upvotes} upvotes
                  <p>{s.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "createEvent" && (
          <form className={styles.form} onSubmit={handleCreateEvent}>
            <h2>Create New Event</h2>
            <input placeholder="Title" required value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
            <input type="date" required value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
            <input placeholder="Location" required value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} />
            <textarea placeholder="Description" rows="4" required value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})}></textarea>
            <button type="submit" className={styles.submitBtn}>Create Event</button>
          </form>
        )}

        {activeTab === "createPoll" && (
          <form className={styles.form} onSubmit={handleCreatePoll}>
            <h2>Create New Poll</h2>
            <input placeholder="Poll Question" required value={newPoll.question} onChange={e => setNewPoll({...newPoll, question: e.target.value})} />
            <input placeholder="Options (comma separated)" required value={newPoll.options} onChange={e => setNewPoll({...newPoll, options: e.target.value})} />
            <button type="submit" className={styles.submitBtn}>Create Poll</button>
          </form>
        )}
      </div>
    </div>
  );
}
