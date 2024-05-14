const express = require("express");
const router = express.Router();
const tasksController = require("../../controller/ticket/ticketController");

// Create task API
router.post("/create", tasksController.create);
// Get task API
router.get("/get", tasksController.get);
//Update Task API
router.post("/update", tasksController.update);
// Delete task API
router.delete("/tasks/:taskId", tasksController.paranoid);

module.exports = router;
