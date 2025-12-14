import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const load = async () => {
    try {
      const res = await getTasks(token);
      setTasks(res.data);
    } catch (err) {
      alert("Failed to load tasks");
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!title) return alert("Title required");
    try {
      await createTask(token, { title });
      setTitle("");
      load();
    } catch (err) {
      alert("Create failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    await deleteTask(token, id);
    load();
  };

  return (
    <div style={{ maxWidth: 800, margin: "24px auto" }}>
      <h2>Dashboard</h2>

      <div style={{ marginBottom: 12 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task title" />
        <button onClick={handleCreate} style={{ marginLeft: 8 }}>Add</button>
      </div>

      <ul>
        {tasks.length === 0 && <li>No tasks</li>}
        {tasks.map(t => (
          <li key={t._id} style={{ marginBottom: 8 }}>
            <strong>{t.title}</strong> — {t.status} — {t.priority}
            <button style={{ marginLeft: 8 }} onClick={() => handleDelete(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
