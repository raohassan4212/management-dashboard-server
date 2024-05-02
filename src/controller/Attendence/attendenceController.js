const attendanceService = require('../../services/Attendence/attendenceService');
const errorLogger = require("../../functions/Logger");
const attendanceValidation = require("../../validation/Attendence/attendenceValidation");


const createAttendance = async (req, res) => {
    try {
      const validatedAttendance = await attendanceValidation.validateCreateAttendance(req.body);
      const newAttendance = await AttendanceService.createAttendance(validatedAttendance);
  
      res.status(201).json({
        success: true,
        message: 'Attendance created successfully',
        data: newAttendance,
      });
    } catch (error) {
      errorLogger('CREATE_ATTENDANCE', 500, error, 'ATTENDANCE', '1', 'Error creating attendance');
      res.status(500).json({
        success: false,
        message: 'Failed to create attendance',
        error: error.message,
      });
    }
  };
  

  const getAllAttendances = async (req, res) => {
    try {
      const attendances = await AttendanceService.getAllAttendances();
  
      res.status(200).json({
        success: true,
        message: 'Attendances retrieved successfully',
        data: attendances,
      });
    } catch (error) {
      errorLogger('GET_ALL_ATTENDANCES', 500, error, 'ATTENDANCE', '1', 'Error retrieving attendances');
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve attendances',
        error: error.message,
      });
    }
  };
  

const getAttendanceById = async (req, res) => {
    try {
      const { id } = req.params;
      const attendance = await AttendanceService.getAttendanceById(id);
  
      if (!attendance) {
        return res.status(404).json({
          success: false,
          message: 'Attendance not found',
          data: null,
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Attendance retrieved successfully',
        data: attendance,
      });
    } catch (error) {
      errorLogger('GET_ATTENDANCE_BY_ID', 500, error, 'ATTENDANCE', '1', 'Error retrieving attendance');
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve attendance',
        error: error.message,
      });
    }
  };
  

const updateAttendance = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedAttendance = await AttendanceService.updateAttendance(id, req.body);
  
      res.status(200).json({
        success: true,
        message: 'Attendance updated successfully',
        data: updatedAttendance,
      });
    } catch (error) {
      errorLogger('UPDATE_ATTENDANCE', 500, error, 'ATTENDANCE', '1', 'Error updating attendance');
      res.status(500).json({
        success: false,
        message: 'Failed to update attendance',
        error: error.message,
      });
    }
  };
  

  const deleteAttendance = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedAttendance = await AttendanceService.deleteAttendance(id);
  
      res.status(200).json({
        success: true,
        message: 'Attendance deleted successfully',
        data: deletedAttendance,
      });
    } catch (error) {
      errorLogger('DELETE_ATTENDANCE', 500, error, 'ATTENDANCE', '1', 'Error deleting attendance');
      res.status(500).json({
        success: false,
        message: 'Failed to delete attendance',
        error: error.message,
      });
    }
  };
  
  module.exports = { createAttendance, getAllAttendances, getAttendanceById, updateAttendance, deleteAttendance };
