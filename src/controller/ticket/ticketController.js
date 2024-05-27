const TicketService = require("../../services/ticket/ticketService");
const ticketValidation = require("../../validation/ticket/ticketValidation");
const errorLogger = require("../../functions/Logger");

const create = async (req, res) => {
  try {
    const validatedTicket = await ticketValidation.ticketSchema.validate(req.body);

    const newTicket = await TicketService.create(validatedTicket);

    return res.status(201).json({
      code: 201,
      success: true,
      message: "Ticket created successfully",
      data: newTicket,
    });
  } catch (error) {
    errorLogger("POST", 500, error, "TICKET", "1", "Error creating ticket");

    return res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to create ticket",
      error: error.message,
    });
  }
};

const get = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const response = await TicketService.get(req.query);
      return res.status(response.code).json({
        code: response.code,
        success: response.success,
        message: response.message,
        data: response.data,
      });
    }
    if (!id) {
      const response = await TicketService.get(req.query);
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
    let errorMessage = "Error founding user";

    // Handle specific errors and set appropriate status code/message
    errorLogger("GET", statusCode, error, "TICKET", "1", errorMessage);

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

    if (id == undefined || id == null) {
      return res.status(422).json({
        code: 422,
        success: false,
        message: "Required parameter is missing: id",
        error: "Mission Parameter",
      });
    }

    const response = await TicketService.update(req.body);
    if (!response) {
      return res.status(201).json({
        code: 404,
        success: false,
        message: "ticket not updated",
        data: null,
      });
    }
    return res.status(201).json({
      code: 201,
      success: true,
      message: "ticket updated successfully",
      data: response,
    });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Error updating user";

    // Handle specific errors and set appropriate status code/message
    errorLogger("UPDATE", statusCode, error, "TICKET", "1", errorMessage);
    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
    });
  }
};

const paranoid = async (req, res) => {
  try {
    const { id } = req.query;


    if (!id) {
      return res.status(422).json({
        code: 422,
        success: false,
        message: "Missing required parameter: id",
      });
    }

    // Validate user update data (using Joi or custom logic)
    const deletedTicket = await TicketService.paranoid(id);
    if (!deletedTicket.success) {
      return res.status(200).json({
        code: 404,
        success: false,
        message: "ticket not deleted",
      });
    }
    if (deletedTicket.success) {
      return res.status(200).json({
        code: 200,
        success: true,
        message: "ticket deleted successfully",
        data: deletedTicket,
      });
    }
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Error deleting user";

    // Handle specific errors and set appropriate status code/message
    errorLogger("DELETE", statusCode, error, "TICKET", "1", errorMessage);
    return res.status(statusCode).json({
      code: statusCode,
      success: false,
      message: errorMessage,
    });
  }
};

module.exports = {
  create,
  update,
  get,
  paranoid,
};
