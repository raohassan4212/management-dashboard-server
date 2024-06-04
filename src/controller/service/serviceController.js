const OptionsService = require("../../services/service/optionsService");
// const ServiceValidation = require("../../validation/attendence/attendenceValidation");
const errorLogger = require("../../functions/Logger");

const create = async (req, res) => {
  try {
    // const validatedService = await ServiceValidation.validate(req.body);
    const newService = await OptionsService.createService(req.body);
    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: newService,
    });
  } catch (error) {
    errorLogger("POST", 500, error, "Service", "1", "Error creating Service");
    res.status(500).json({
      success: false,
      message: "Failed to create Service",
      error: error.message,
    });
  }
};

const get = async (req, res) => {
  try {
    const response = await OptionsService.getAllServices(req.query);
    return res.status(response.code).json({
      success: response.code,
      message: response.message,
      pageSize: response.pageSize,
      totalCount: response.totalCount,
      data: response,
    });
  } catch (error) {
    errorLogger("GET", 500, error, "Service", "1", "Error retrieving Services");
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Services",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const response = await OptionsService.updateService(req.body);

    res.status(200).json({
      success: response.success,
      message: response.message,
      data: response,
    });
  } catch (error) {
    errorLogger("UPDATE", 500, error, "Service", "1", "Error updating Service");
    res.status(500).json({
      success: false,
      message: "Failed to update Service",
      error: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await OptionsService.deleteService(id);

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
      data: deletedService,
    });
  } catch (error) {
    errorLogger("DELETE", 500, error, "Service", "1", "Error deleting Service");
    res.status(500).json({
      success: false,
      message: "Failed to delete Service",
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
