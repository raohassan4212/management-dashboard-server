const { Op } = require("sequelize");
const Department = require("../../models/Department/department");
const User = require("../../models/User/user");
const moment = require("moment");

const createDepartment = async (reqData) => {
  try {
    const newDepartment = await Department.create(reqData);
    if (newDepartment) {
      return {
        code: 200,
        success: true,
        message: "Departments created successfully",
        data: newDepartment,
      };
    }
  } catch (error) {
    throw new Error("Failed to create Department: " + error.message);
  }
};

const getAllDepartments = async (reqData) => {
  const { name, date, user_id } = reqData;

  let whereClause = {};

  if (date) whereClause.date = moment.utc(date).toISOString();
  if (user_id) whereClause.user_id = user_id || "";

  const page = parseInt(reqData.page) || 0;
  const pageSize = parseInt(reqData.pageSize) || 10;

  const zeroBasedPage = Math.max(0, page - 1);
  const offset = zeroBasedPage * pageSize;

  let totalCount;
  let Departments;

  totalCount = await Department.count({ where: whereClause });
  Departments = await Department.findAll({
    where: whereClause,
    offset,
    limit: pageSize,
  });
  if (Departments) {
    return {
      code: 200,
      success: true,
      message: "Departments retrieved successfully",
      data: Departments,
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      totalCount,
    };
  }
};

const updateDepartment = async (reqData) => {
  if (!reqData) {
    return {
      code: 304,
      success: false,
      message: "No request body",
      data: null,
    };
  }
  const Department = await Department.upsert(reqData);

  if (!Department) {
    return {
      code: 304,
      success: true,
      message: "Departments not updated",
      data: Department,
    };
  }

  if (Department) {
    return {
      code: 200,
      success: true,
      message: "Departments updated successfully",
      data: Department,
    };
  }
};

const deleteDepartment = async (id) => {
  const Department = await Department.findOne({ where: { id: DepartmentId } });

  if (!Department) {
    throw new Error("Department not found");
  }

  await Department.destroy();

  return Department;
};

module.exports = {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
};
