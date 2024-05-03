const express = require('express');
const router = express.Router();
const attendanceController = require('../../controller/Attendence/attendenceController');

// Create attendance API
router.post('/attendances', attendanceController.createAttendance);

// Update attendance API
router.put('/attendances/updateattendance', attendanceController.updateAttendance);

// Delete attendance API
router.delete('/attendances/:attendanceId', attendanceController.deleteAttendance);

// Attendance By ID 
router.get('/attendances/:attendanceId', attendanceController.getAttendanceById);

// Get All Attendances API
router.get('/attendances', attendanceController.getAllAttendances);


module.exports = router;
  
