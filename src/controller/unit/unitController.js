const UnitService = require("../../services/Unit/UnitService");
// const UnitValidation = require("../../validation/attendence/attendenceValidation");
const errorLogger = require("../../functions/Logger");

const create = async (req, res) => {
  try {
    // const validatedUnit = await UnitValidation.validate(req.body);
    const newUnit = await UnitService.createUnit(req.body);
    res.status(201).json({
      success: true,
      message: "Unit created successfully",
      data: newUnit,
    });
  } catch (error) {
    errorLogger(
      "POST",
      500,
      error,
      "Unit",
      "1",
      "Error creating Unit"
    );
    res.status(500).json({
      success: false,
      message: "Failed to create Unit",
      error: error.message,
    });
  }
};

const get = async (req, res) => {
  try {
    const response = await UnitService.getAllUnits(req.query);
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
      "Unit",
      "1",
      "Error retrieving Units"
    );
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Units",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const response = await UnitService.updateUnit(req.body);

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
      "Unit",
      "1",
      "Error updating Unit"
    );
    res.status(500).json({
      success: false,
      message: "Failed to update Unit",
      error: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUnit = await UnitService.deleteUnit(id);

    res.status(200).json({
      success: true,
      message: "Unit deleted successfully",
      data: deletedUnit,
    });
  } catch (error) {
    errorLogger(
      "DELETE",
      500,
      error,
      "Unit",
      "1",
      "Error deleting Unit"
    );
    res.status(500).json({
      success: false,
      message: "Failed to delete Unit",
      error: error.message,
    });
  }
};

module.exports = {
  create,
  get,
  update,
  destroy,
};
