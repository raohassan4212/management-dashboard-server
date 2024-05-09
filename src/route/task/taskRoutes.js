const express = require("express");
const router = express.Router();
const taskController = require('../../controller/task/taskController')

// Create task API
router.post('/tasks', taskController.createTask);
// Update task API
router.put('/update', taskController.updateTask);
// Delete task API
router.delete('/:id/delete', taskController.deleteTask);
// Task By ID API
router.get('/get', taskController.getTask);


module.exports = router;