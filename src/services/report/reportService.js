const Report = require("../../models/Report/report");

const createReport = async (reportData) => {
  try {
    const newReport = await Report.create(reportData);
    return newReport;
  } catch (error) {
    throw new Error("Failed to create report: " + error.message);
  }
};

const getAllReports = async () => {
  try {
    const reports = await Report.findAll();
    return reports;
  } catch (error) {
    throw new Error("Failed to fetch reports: " + error.message);
  }
};

const getReportById = async (reportId) => {
  try {
    const report = await Report.findOne({ where: { id: reportId } });
    if (!report) {
      throw new Error("Report not found");
    }
    return report;
  } catch (error) {
    throw new Error("Failed to fetch report: " + error.message);
  }
};

const updateReport = async (reportId, updatedData) => {
  try {
    const report = await Report.findOne({ where: { id: reportId } });
    if (!report) {
      throw new Error("Report not found");
    }
    await report.update(updatedData);
    const updatedReport = await Report.findOne({ where: { id: reportId } });
    return updatedReport;
  } catch (error) {
    throw new Error("Failed to update report: " + error.message);
  }
};

const deleteReport = async (reportId) => {
  try {
    const report = await Report.findOne({ where: { id: reportId } });
    if (!report) {
      throw new Error("Report not found");
    }
    await report.destroy();
    return report;
  } catch (error) {
    throw new Error("Failed to delete report: " + error.message);
  }
};

module.exports = {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
};
