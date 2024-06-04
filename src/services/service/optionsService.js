const { Op } = require("sequelize");
const Service = require("../../models/Service/Service");
const User = require("../../models/User/user");
const moment = require("moment");

const createService = async (reqData) => {
  try {
    const newService = await Service.create(reqData);
    if (newService) {
      return {
        code: 200,
        success: true,
        message: "Services created successfully",
        data: newService,
      };
    }
  } catch (error) {
    throw new Error("Failed to create Service: " + error.message);
  }
};

const getAllServices = async (reqData) => {
  let whereClause = {};
  const page = parseInt(reqData.page) || 0;
  const pageSize = parseInt(reqData.pageSize) || 10;

  const zeroBasedPage = Math.max(0, page - 1);
  const offset = zeroBasedPage * pageSize;

  let totalCount;
  let Services;

  totalCount = await Service.count({ where: whereClause });
  Services = await Service.findAll({
    where: whereClause,
    offset,
    limit: pageSize,
  });
  if (Services) {
    return {
      code: 200,
      success: true,
      message: "Services retrieved successfully",
      data: Services,
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      totalCount,
    };
  }
};

const updateService = async (reqData) => {
  if (!reqData) {
    return {
      code: 304,
      success: false,
      message: "No request body",
      data: null,
    };
  }
  const Service = await Service.upsert(reqData);

  if (!Service) {
    return {
      code: 304,
      success: true,
      message: "Services not updated",
      data: Service,
    };
  }

  if (Service) {
    return {
      code: 200,
      success: true,
      message: "Services updated successfully",
      data: Service,
    };
  }
};

const deleteService = async (id) => {
  const deletedService = await Service.destroy({ where: { id: id } });

  if (!deletedService) {
    throw new Error("Service not found");
  }

  if (deletedService) {
    return {
      code: 200,
      success: true,
      message: "Service deleted successfully",
      data: deletedService,
    };
  }
};

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};
