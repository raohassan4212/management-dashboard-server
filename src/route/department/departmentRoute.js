const express = require("express");
const router = express.Router();
const departmentController = require("../../controller/department/departmentController");

// Create Department API
router.post("/create", departmentController.create);

// Update Department API
router.post("/update", departmentController.update);

// Delete Department API
router.delete("/:id", departmentController.destroy);

// Get All Departments API
router.get("/get", departmentController.get);

module.exports = router;
