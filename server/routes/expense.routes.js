const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");

const {
  createExpense,
  getExpenses,
} = require("../controllers/expense.controller");

// Create new expense
router.post("/", protect, createExpense);

// Get all expenses
router.get("/", protect, getExpenses);

module.exports = router;
