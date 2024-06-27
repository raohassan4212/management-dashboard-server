const ReportService = require('../../services/report/reportService');
const reportValidation = require('../../validation/report/reportValidation');
const errorLogger = require('../../functions/Logger');

const createReport = async (req, res) => {
  try {
    const validatedReport = await reportValidation.validate(req.body);
    const newReport = await ReportService.createReport(validatedReport);

    return res.status(201).json({
      code: 201,
      success: true,
      message: 'Report created successfully',
      data: newReport,
    });
  } catch (error) {
    errorLogger('CREATE_REPORT', 500, error, 'REPORT', '1', 'Error creating report');

    return res.status(500).json({
      code: 500,
      success: false,
      message: 'Failed to create report',
      error: error.message,
    });
  }
};

const getAllReports = async (req, res) => {
  try {
    const { filter } = req.query;
    const reports = await ReportService.getAllReports(filter);

    return res.status(200).json({
      code: 200,
      success: true,
      message: 'Reports retrieved successfully',
      data: reports,
    });
  } catch (error) {
    errorLogger('GET_ALL_REPORTS', 500, error, 'REPORT', '1', 'Error retrieving reports');

    return res.status(500).json({
      code: 500,
      success: false,
      message: 'Failed to retrieve reports',
      error: error.message,
    });
  }
};

const getReportById = async (req, res) => {
  try {
    const { reportId } = req.params;
    const report = await ReportService.getReportById(reportId);

    if (!report) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: 'Report not found',
        data: null,
      });
    }

    return res.status(200).json({
      code: 200,
      success: true,
      message: 'Report retrieved successfully',
      data: report,
    });
  } catch (error) {
    errorLogger('GET_REPORT_BY_ID', 500, error, 'REPORT', '1', 'Error retrieving report');

    return res.status(500).json({
      code: 500,
      success: false,
      message: 'Failed to retrieve report',
      error: error.message,
    });
  }
};

const updateReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const updatedData = req.body;

    const updatedReport = await ReportService.updateReport(reportId, updatedData);

    return res.status(200).json({
      code: 200,
      success: true,
      message: 'Report updated successfully',
      data: updatedReport,
    });
  } catch (error) {
    errorLogger('UPDATE_REPORT', 500, error, 'REPORT', '1', 'Error updating report');

    return res.status(500).json({
      code: 500,
      success: false,
      message: 'Failed to update report',
      error: error.message,
    });
  }
};

const deleteReport = async (req, res) => {
  try {
    const { reportId } = req.params;

    const deletedReport = await ReportService.deleteReport(reportId);

    return res.status(200).json({
      code: 200,
      success: true,
      message: 'Report deleted successfully',
      data: deletedReport,
    });
  } catch (error) {
    errorLogger('DELETE_REPORT', 500, error, 'REPORT', '1', 'Error deleting report');

    return res.status(500).json({
      code: 500,
      success: false,
      message: 'Failed to delete report',
      error: error.message,
    });
  }
};


module.exports = {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
};
