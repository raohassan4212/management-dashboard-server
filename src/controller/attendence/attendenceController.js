const attendanceService = require("../../services/attendence/attendenceService");
const attendanceValidation = require("../../validation/attendence/attendenceValidation");
const errorLogger = require("../../functions/Logger");

const create = async (req, res) => {
  try {
    const validatedAttendance = await attendanceValidation.validate(req.body);
    const newAttendance = await attendanceService.createAttendance(
      validatedAttendance
    );
    res.status(201).json({
      success: true,
      message: "Attendance created successfully",
      data: newAttendance,
    });
  } catch (error) {
    errorLogger(
      "POST",
      500,
      error,
      "ATTENDANCE",
      "1",
      "Error creating attendance"
    );
    res.status(500).json({
      success: false,
      message: "Failed to create attendance",
      error: error.message,
    });
  }
};

const get = async (req, res) => {
  try {
    const response = await attendanceService.getAllAttendances(req.query);
    return res.status(response.code).json({
      success: response.code,
      message: response.message,
      pageSize: response.pageSize,
      totalCount: response.totalCount,
      data: response,
    });
  } catch (error) {
    errorLogger(
      "GET",
      500,
      error,
      "ATTENDANCE",
      "1",
      "Error retrieving attendances"
    );
    res.status(500).json({
      success: false,
      message: "Failed to retrieve attendances",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const response = await attendanceService.updateAttendance(req.body);

    res.status(200).json({
      success: response.success,
      message: response.message,
      data: response,
    });
  } catch (error) {
    errorLogger(
      "UPDATE",
      500,
      error,
      "ATTENDANCE",
      "1",
      "Error updating attendance"
    );
    res.status(500).json({
      success: false,
      message: "Failed to update attendance",
      error: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAttendance = await attendanceService.deleteAttendance(id);

    res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
      data: deletedAttendance,
    });
  } catch (error) {
    errorLogger(
      "DELETE_ATTENDANCE",
      500,
      error,
      "ATTENDANCE",
      "1",
      "Error deleting attendance"
    );
    res.status(500).json({
      success: false,
      message: "Failed to delete attendance",
      error: error.message,
    });
    W;
  }
};

module.exports = {
  create,
  get,
  update,
  destroy,
};
