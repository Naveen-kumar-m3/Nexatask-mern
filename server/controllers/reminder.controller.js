// controllers/reminder.controller.js
const Reminder = require('../models/Reminder');

// Create reminder
exports.createReminder = async (req, res) => {
  try {
    const payload = {
      title: req.body.title,
      description: req.body.description || '',
      dueDate: new Date(req.body.dueDate),
      user: req.user._id,
      recurrence: req.body.recurrence || 'none',
      completed: !!req.body.completed,
      notifyAt: req.body.notifyAt ? new Date(req.body.notifyAt) : null,
      linkedExpense: req.body.linkedExpense || null,
      linkedTask: req.body.linkedTask || null
    };
    const r = await Reminder.create(payload);
    res.status(201).json(r);
  } catch (err) {
    console.error('Create reminder error', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// List reminders (upcoming or all)
exports.listReminders = async (req, res) => {
  try {
    const q = { user: req.user._id };
    if (req.query.upcoming === 'true') q.dueDate = { $gte: new Date() };
    const items = await Reminder.find(q).sort({ dueDate: 1 });
    res.json(items);
  } catch (err) {
    console.error('List reminders error', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Mark complete
exports.markComplete = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { completed: true },
      { new: true }
    );
    if (!reminder) return res.status(404).json({ message: 'Reminder not found' });
    res.json(reminder);
  } catch (err) {
    console.error('Mark complete error', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
