const express = require("express");
const router = express.Router();
const leadController = require("../../controller/leads/leadController");

// Create Department API
router.post("/create", leadController.create);

// Update Department API
router.post("/update", leadController.update);

// Delete Department API
router.delete("/:id/delete", leadController.destroy);

// Get All Departments API
router.get("/get", leadController.get);

module.exports = router;
