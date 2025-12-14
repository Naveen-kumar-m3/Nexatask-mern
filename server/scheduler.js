// scheduler.js
const cron = require('node-cron');
const Expense = require('./models/Expense');
const Reminder = require('./models/Reminder');
const mongoose = require('mongoose');

const processRecurringExpenses = async () => {
  try {
    const now = new Date();
    // find recurring expenses whose nextRunAt <= now
    const due = await Expense.find({ 'recurring.isRecurring': true, 'recurring.nextRunAt': { $ne: null, $lte: now } });
    for (const ex of due) {
      // create a copy for this occurrence (nextRunAt used as date)
      const occ = await Expense.create({
        title: ex.title,
        amount: ex.amount,
        currency: ex.currency,
        category: ex.category,
        date: ex.recurring.nextRunAt || now,
        notes: ex.notes,
        createdBy: ex.createdBy,
        recurring: { isRecurring: ex.recurring.isRecurring, freq: ex.recurring.freq, nextRunAt: null }
      });

      // compute nextRunAt based on freq and update original
      let next = null;
      if (ex.recurring.freq === 'monthly') {
        const d = new Date(ex.recurring.nextRunAt || now);
        d.setMonth(d.getMonth() + 1);
        next = d;
      } else if (ex.recurring.freq === 'yearly') {
        const d = new Date(ex.recurring.nextRunAt || now);
        d.setFullYear(d.getFullYear() + 1);
        next = d;
      } else if (ex.recurring.freq === 'weekly') {
        const d = new Date(ex.recurring.nextRunAt || now);
        d.setDate(d.getDate() + 7);
        next = d;
      }

      await Expense.findByIdAndUpdate(ex._id, { 'recurring.nextRunAt': next });
      console.log('Created recurring expense occurrence', occ._id.toString());
    }
  } catch (err) {
    console.error('Recurring expense job error', err);
  }
};

const processDueReminders = async () => {
  try {
    const now = new Date();
    // find reminders due (notifyAt or dueDate) not completed
    const due = await Reminder.find({
      completed: false,
      $or: [
        { notifyAt: { $ne: null, $lte: now } },
        { notifyAt: null, dueDate: { $lte: now } }
      ]
    });

    for (const r of due) {
      // For now: log — you can extend to email or in-app notifications
      console.log('Reminder due for user', r.user.toString(), 'reminder:', r.title);

      // if recurrence is none -> do not reschedule
      if (r.recurrence === 'monthly') {
        const d = new Date(r.dueDate);
        d.setMonth(d.getMonth() + 1);
        await Reminder.findByIdAndUpdate(r._id, { dueDate: d });
      } else if (r.recurrence === 'yearly') {
        const d = new Date(r.dueDate);
        d.setFullYear(d.getFullYear() + 1);
        await Reminder.findByIdAndUpdate(r._id, { dueDate: d });
      } else {
        // leave it or mark as notified (optional)
      }
    }
  } catch (err) {
    console.error('Due reminders job error', err);
  }
};

// schedule every minute (change to hourly/daily for production)
cron.schedule('* * * * *', async () => {
  // ensure DB connection is ready
  if (mongoose.connection.readyState !== 1) return;
  await processRecurringExpenses();
  await processDueReminders();
});
