const errorLogger = require("../../functions/Logger");
const leadValidation = require("../../validation/lead/leadValidation");

const leadService = require("../../services/lead/leadService");

const create = async (req, res) => {
  try {
    const validatedLeadInfo = await leadValidation.validate(req.body);
    console.log(validatedLeadInfo);
    const response = await leadService.create(validatedLeadInfo);

    if (!response) {
      return res.status(201).json({
        code: 404,
        success: false,
        message: "Lead not created ",
        data: null,
      });
    }
    return res.status(201).json({
      code: 201,
      success: true,
      message: "Lead created successfully ",
      data: response,
    });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Error creating lead";

    // Handle specific errors and set appropriate status code/message
    errorLogger("POST", statusCode, error, "LEADS", "1", errorMessage);
    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
    });
  }
};

const update = async (req, res) => {
  try {
    let { id } = req.body;

    console.log(req.body);
    if (id == undefined || id == null) {
      return res.status(422).json({
        code: 422,
        success: false,
        message: "Required parameter is missing: id",
        error: "Mission Parameter",
      });
    }
    const validatedLead= await leadValidation.validate(req.body);
    const response = await leadService.update(validatedLead);

    if (!response) {
      return res.status(201).json({
        code: 404,
        success: false,
        message: "Lead not updated ",
        data: null,
      });
    }
    return res.status(201).json({
      code: 201,
      success: true,
      message: "Lead updated successfully ",
      data: response,
    });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Error updating lead";

    // Handle specific errors and set appropriate status code/message
    errorLogger("UPDATE", statusCode, error, "LEAD", "1", errorMessage);
    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(422).json({
        code: 422,
        success: false,
        message: "Missing required parameter: id",
      });
    }

    // Validate user update data (using Joi or custom logic)
    const updatedUser = await leadService.delete(id);

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Lead deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Error lead profile";

    // Handle specific errors and set appropriate status code/message
    errorLogger("DELETE", statusCode, error, "LEAD", "1", errorMessage);
    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
    });
  }
};

const get = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const response = await leadService.get(req.query);
      return res.status(response.code).json({
        code: response.code,
        success: response.success,
        message: response.message,
        data: response.data,
      });
    }
    if (!id) {
      const response = await leadService.get(req.query);
      return res.status(response.code).json({
        code: response.code,
        success: response.success,
        message: response.message,
        data: response.data,
        pageSize: response.pageSize,
        totalCount: response.totalCount,
      });
    }
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Error founding lead";

    // Handle specific errors and set appropriate status code/message
    errorLogger("GET", statusCode, error, "LEAD", "1", errorMessage);

    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
    });
  }
};
module.exports = { update, get, create, destroy };
