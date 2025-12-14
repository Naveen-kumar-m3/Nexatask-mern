import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/expenses",
});

// Get all expenses
export const getExpenses = (token) =>
  API.get("/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Create expense
export const createExpense = (token, data) =>
  API.post("/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
