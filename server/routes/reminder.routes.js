// routes/reminder.routes.js
const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminder.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/', protect, reminderController.createReminder);
router.get('/', protect, reminderController.listReminders);
router.put('/:id/complete', protect, reminderController.markComplete);

module.exports = router;
