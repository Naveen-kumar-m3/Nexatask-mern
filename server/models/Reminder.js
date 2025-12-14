// server/models/Reminder.js
const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  dueDate: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // 'monthly' | 'yearly' | 'none' (simple recurrence)
  recurrence: { type: String, enum: ['none','monthly','yearly'], default: 'none' },
  // mark completed when paid or done
  completed: { type: Boolean, default: false },
  // optional link to a Task or Expense
  linkedTask: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: null },
  linkedExpense: { type: mongoose.Schema.Types.ObjectId, ref: 'Expense', default: null },
  notifyAt: { type: Date } // optional separate notify time
}, { timestamps: true });

module.exports = mongoose.model('Reminder', reminderSchema);
