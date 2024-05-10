const express = require("express");
const router = express.Router();
const attendanceController = require("../../controller/Attendence/attendenceController");

// Create attendance API
router.post("/create", attendanceController.create);

// Update attendance API
router.post("/update", attendanceController.update);

// Delete attendance API
router.delete("/:id", attendanceController.destroy);

// Get All Attendances API
router.get("/get", attendanceController.get);

module.exports = router;
