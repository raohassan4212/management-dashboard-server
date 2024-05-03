const saleValidation = require("../../validation/sale/saleValidation");
const saleServices = require("../../services/sale/saleService");
const errorLogger = require("../../functions/Logger");

const create = async (req, res) => {
  try {
    console.log(`Req: POST, Update Sale`);
    const validatedSaleInfo = await saleValidation.validate(req.body);
    const response = await saleServices.create(validatedSaleInfo);

    return res.status(201).json({
      code: response.code,
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle specific errors and set appropriate status code/message
      errorLogger("Created", 400, error, "Sales", "3", error.errors);
      return res.status(400).json({
        code: 400,
        success: false,
        message: "error",
        errors: error.errors,
      });
    }

    // Handle specific errors and set appropriate status code/message
    errorLogger("Created", 500, error, "Sales", "3", error);
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Error creating Sale",
      error: error,
    });
  }
};

const update = async (req, res) => {
  try {
    let { id } = req.body;

    if (id == undefined || id == null) {
      return res.status(422).json({
        code: 422,
        success: false,
        message: "Required parameter is missing: id",
        error: "Mission Parameter",
      });
    }

    const validatedSaleInfo = await saleValidation.validate(req.body);
    const response = await saleServices.update(validatedSaleInfo);

    return res.status(200).json({
      code: response.code,
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle specific errors and set appropriate status code/message
      errorLogger("Created", 400, error, "Sales", "3", error.errors);
      return res.status(400).json({
        code: 400,
        success: false,
        message: "error",
        errors: error.errors,
      });
    }

    // Handle specific errors and set appropriate status code/message
    errorLogger("Updated", 500, error, "Sales", "3", error);
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Error updating Sale",
      error: error,
    });
  }
};

const paranoid = async (req, res) => {
  try {
    let { id } = req.query;

    if (id == undefined || id == null) {
      return res.status(422).json({
        code: 422,
        success: false,
        message: "Required parameter is missing: id",
        error: "Mission Parameter",
      });
    }

    const response = await saleServices.paranoid(id);
    return res.status(200).json({
      code: response.code,
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    // Handle specific errors and set appropriate status code/message
    errorLogger("Deleted", 500, error, "Sales", "3", error);
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Error Deleting Sale",
      error: error,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const response = await saleServices.getAll(page, pageSize);

    return res.status(response.code).json({
      code: response.code,
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    // Handle specific errors and set appropriate status code/message
    errorLogger("Get All", 500, error, "Sales", "3", error);
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Error Getting All Sale",
      error: error,
    });
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.query;

    if (id == undefined || id == null) {
      return res.status(422).json({
        code: 422,
        success: false,
        message: "Required parameter is missing: id",
        error: "Mission Parameter",
      });
    }
    const response = await saleServices.getById(id);

    return res.status(response.code).json({
      code: response.code,
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    // Handle specific errors and set appropriate status code/message
    errorLogger("Updated", 500, error, "Sales", "3", error);
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Error Getting Sale By User Id",
      error: error,
    });
  }
};
module.exports = { create, update, paranoid, getAll, getById };
