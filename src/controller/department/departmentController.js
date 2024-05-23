const DepartmentService = require("../../services/department/departmentService");
// const DepartmentValidation = require("../../validation/attendence/attendenceValidation");
const errorLogger = require("../../functions/Logger");

const create = async (req, res) => {
  try {
    // const validatedDepartment = await DepartmentValidation.validate(req.body);
    const newDepartment = await DepartmentService.createDepartment(req.body);
    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: newDepartment,
    });
  } catch (error) {
    errorLogger(
      "POST",
      500,
      error,
      "Department",
      "1",
      "Error creating Department"
    );
    res.status(500).json({
      success: false,
      message: "Failed to create Department",
      error: error.message,
    });
  }
};

const get = async (req, res) => {
  try {
    const response = await DepartmentService.getAllDepartments(req.query);
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
      "Department",
      "1",
      "Error retrieving Departments"
    );
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Departments",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const response = await DepartmentService.updateDepartment(req.body);

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
      "Department",
      "1",
      "Error updating Department"
    );
    res.status(500).json({
      success: false,
      message: "Failed to update Department",
      error: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDepartment = await DepartmentService.deleteDepartment(id);

    res.status(200).json({
      success: true,
      message: "Department deleted successfully",
      data: deletedDepartment,
    });
  } catch (error) {
    errorLogger(
      "DELETE_Department",
      500,
      error,
      "Department",
      "1",
      "Error deleting Department"
    );
    res.status(500).json({
      success: false,
      message: "Failed to delete Department",
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
