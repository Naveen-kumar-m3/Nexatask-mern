const Expense = require("../models/Expense");

/**
 * Create a new expense
 */
exports.createExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category || "general",
      date: req.body.date || new Date(),
      user: req.user._id,
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error("Create expense error:", error);
    res.status(500).json({ message: "Failed to create expense" });
  }
};

/**
 * Get all expenses for logged-in user
 */
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({
      date: -1,
    });

    res.json(expenses);
  } catch (error) {
    console.error("Get expenses error:", error);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};
