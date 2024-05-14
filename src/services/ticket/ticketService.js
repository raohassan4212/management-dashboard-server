const Ticket = require("../../models/Tickets/ticket");

const create = async (reqData) => {
  try {
    if (!reqData) {
      return {
        code: 301,
        success: false,
        message: "ticket data is missing",
        data: null,
      };
    }

    // Create a new task in the database
    const newTicket = await Ticket.create(reqData);

    if (newTicket) {
      return {
        code: 301,
        success: true,
        message: "Ticket created successfully",
        data: newTask,
      };
    } else {
      return {
        code: 301,
        success: false,
        message: "Failed to create ticket",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error creating task:", error);
    return {
      code: 500,
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
};

const update = async (reqData) => {
  try {
    if (!reqData) {
      return {
        code: 301,
        success: false,
        message: "ticket data is missing",
        data: null,
      };
    }

    // Create a new task in the database
    const updatedTicket = await Ticket.update(reqData);

    if (updatedTicket) {
      return {
        code: 301,
        success: true,
        message: "Ticket updated successfully",
        data: updatedTicket,
      };
    } else {
      return {
        code: 301,
        success: false,
        message: "Failed to update ticket",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error updating task:", error);
    return {
      code: 500,
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
};

const get = async (reqData) => {
  const { title, approved, user_id, id } = reqData;
  let whereClause = {};

  if (id) whereClause.id = id || "";
  if (user_id) whereClause.user_id = user_id || "";
  if (title) whereClause.title = title || "";
  if (approved) whereClause.approved = approved || "";

  const page = parseInt(reqData.page) || 0;
  const pageSize = parseInt(reqData.pageSize) || 10;

  const zeroBasedPage = Math.max(0, page - 1);
  const offset = zeroBasedPage * pageSize;

  let totalCount;
  let tickets;

  totalCount = await Ticket.count({ where: whereClause });
  tickets = await Ticket.findAll({
    where: whereClause,
    offset,
    limit: pageSize,
  });
  if (tickets) {
    return {
      code: 200,
      success: true,
      message: "tickets retrieved successfully",
      data: tickets,
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      totalCount,
    };
  }
};

const paranoid = async (reqData, res) => {
  let parameter = "id";
  if (reqData) {
    const deletedTicket = await Ticket.destroy({
      where: { id: reqData },
    });

    if (deletedTicket) {
      return {
        code: 200,
        success: true,
        message: "ticket deleted",
        data: deletedTicket,
      };
    }
    if (!deletedTicket) {
      return {
        code: 301,
        success: false,
        message: "ticket not deleted",
        data: null,
      };
    }
  }
  if (!reqData) {
    return {
      code: 301,
      success: false,
      message: `${parameter} missing value`,
      data: null,
    };
  }
};

module.exports = {
  create,
  update,
  get,
  paranoid,
};
