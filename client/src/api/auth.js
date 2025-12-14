import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Register
export const registerUser = (data) => API.post("/auth/register", data);

// Login
export const loginUser = (data) => API.post("/auth/login", data);

// Get logged-in user
export const getMe = (token) =>
  API.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
