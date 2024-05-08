const express = require("express");
const router = express.Router();
const tasksController = require('../../controller/task/taskController')

// Create task API
router.post('/tasks', tasksController.createTask);
// Complete task API
router.put('/tasks/:taskId/complete', tasksController.completeTask);
// Delete task API
router.delete('/tasks/:taskId', tasksController.deleteTask);
// Task By ID API
router.get('/tasks/:taskId', tasksController.getTaskById);
// Get All Task API
router.get('/tasks', tasksController.getAllTasks);

module.exports = router;