const transactionValidation = require("../../validation/transaction/transactionValidation");
const transactionService = require("../../services/transaction/transactionService");
const errorLogger = require("../../functions/Logger");

const create = async (req, res) => {
  console.log(req.file);
  try {
    const validatedTransactionInfo = await transactionValidation.validate(
      req.body
    );
    const response = await transactionService.create(
      validatedTransactionInfo,
      req.file
    );

    return res.status(201).json({
      code: response.code,
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle specific errors and set appropriate status code/message
      errorLogger("POST", 400, error, "Transaction", "2", error);
      return res.status(400).json({
        code: 400,
        success: false,
        message: "error",
        errors: error,
      });
    }

    // Handle specific errors and set appropriate status code/message
    errorLogger("POST", 500, error, "Transaction", "3", error);
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Error creating Transaction",
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
    const response = await transactionService.get(req.query);

    return res.status(response.code).json({
      code: response.code,
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    // Handle specific errors and set appropriate status code/message
    errorLogger("GET", 500, error, "Transaction", "3", error);
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Error Getting All Transactions",
      error: error,
    });
  }
};

const getByQuery = async (req, res) => {
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
module.exports = { create, update, paranoid, getAll, getByQuery };
