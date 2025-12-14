import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/tasks",
});

// Create task
export const createTask = (token, data) =>
  API.post("/", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Get tasks
export const getTasks = (token) =>
  API.get("/", {
    headers: { Authorization: `Bearer ${token}` },
  });

// Update task
export const updateTask = (token, id, data) =>
  API.put(`/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Delete task
export const deleteTask = (token, id) =>
  API.delete(`/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
