const Report = require("../../models/Report/report");
const { Op } = require("sequelize");
const moment = require("moment");

const createReport = async (reportData) => {
  try {
    const newReport = await Report.create(reportData);
    return newReport;
  } catch (error) {
    throw new Error("Failed to create report: " + error.message);
  }
};

const getAllReports = async (filter) => {
  try {
    const options = {
      order: [["createdAt", "DESC"]], // Sort by createdAt field, newest first
    };
    const dateFilter = getDateFilter(filter);
    if (dateFilter) {
      options.where = {
        ...options.where,
        createdAt: dateFilter,
      };
    }
    const reports = await Report.findAll(options);
    // Calculate individual grand totals
    const grandTotalSales = reports.reduce(
      (total, report) => total + report.total_sales,
      0
    );
    const grandTotalProfit = reports.reduce(
      (total, report) => total + report.total_profit,
      0
    );
    const grandTotalExpenses = reports.reduce(
      (total, report) => total + report.total_expenses,
      0
    );
    return {
      data: reports,
      grand_total_sales: grandTotalSales,
      grand_total_profit: grandTotalProfit,
      grand_total_expenses: grandTotalExpenses,
    };
  } catch (error) {
    throw new Error("Failed to fetch reports: " + error.message);
  }
};

const getDateFilter = (filter) => {
  const now = moment().endOf("day");
  let startDate, endDate;

  if (filter === "currentMonth") {
    startDate = now.clone().startOf("month");
    endDate = now;
  } else if (filter === "previousMonth") {
    startDate = now.clone().subtract(1, "month").startOf("month");
    endDate = now.clone().subtract(1, "month").endOf("month");
  } else if (filter === "lastSixMonths") {
    startDate = now.clone().subtract(6, "months").startOf("month");
    endDate = now;
  } else if (filter === "lastTwelveMonths") {
    startDate = now.clone().subtract(12, "months").startOf("month");
    endDate = now;
  } else {
    return null;
  }

  return {
    [Op.gte]: startDate.toDate(),
    [Op.lte]: endDate.toDate(),
  };
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
