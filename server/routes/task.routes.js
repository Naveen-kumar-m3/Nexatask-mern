// routes/task.routes.js
const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { protect } = require('../middleware/auth.middleware');

// Create task
router.post(
  '/',
  protect,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('status').optional().isIn(['todo','inprogress','done','blocked']),
    body('priority').optional().isIn(['low','medium','high','urgent'])
  ],
  taskController.createTask
);

// Get all tasks for logged-in user
router.get('/', protect, taskController.getTasks);

// Get single task (only if createdBy = user)
router.get('/:id', protect, taskController.getTaskById || ((req,res)=>res.status(404).end()));

// Update task
router.put('/:id', protect, taskController.updateTask);

// Delete task
router.delete('/:id', protect, taskController.deleteTask);

module.exports = router;
