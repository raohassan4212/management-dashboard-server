const { Op } = require("sequelize");
const Unit = require("../../models/Unit/Unit");
const User = require("../../models/User/user");
const moment = require("moment");

const createUnit = async (reqData) => {
  try {
    const newUnit = await Unit.create(reqData);
    if (newUnit) {
      return {
        code: 200,
        success: true,
        message: "Units created successfully",
        data: newUnit,
      };
    }
  } catch (error) {
    throw new Error("Failed to create Unit: " + error.message);
  }
};

const getAllUnits = async (reqData) => {
  const { name, date, user_id } = reqData;

  let whereClause = {};

  if (date) whereClause.date = moment.utc(date).toISOString();
  if (user_id) whereClause.user_id = user_id || "";

  const page = parseInt(reqData.page) || 0;
  const pageSize = parseInt(reqData.pageSize) || 10;

  const zeroBasedPage = Math.max(0, page - 1);
  const offset = zeroBasedPage * pageSize;

  let totalCount;
  let Units;

  totalCount = await Unit.count({ where: whereClause });
  Units = await Unit.findAll({
    where: whereClause,
    offset,
    limit: pageSize,
  });
  if (Units) {
    return {
      code: 200,
      success: true,
      message: "Units retrieved successfully",
      data: Units,
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      totalCount,
    };
  }
};

const updateUnit = async (reqData) => {
  if (!reqData) {
    return {
      code: 304,
      success: false,
      message: "No request body",
      data: null,
    };
  }
  const Unit = await Unit.upsert(reqData);

  if (!Unit) {
    return {
      code: 304,
      success: true,
      message: "Units not updated",
      data: Unit,
    };
  }

  if (Unit) {
    return {
      code: 200,
      success: true,
      message: "Units updated successfully",
      data: Unit,
    };
  }
};

const deleteUnit = async (id) => {
  const deletedUnit = await Unit.destroy({ where: { id: id } });

  if (!deletedUnit) {
    throw new Error("Unit not found");
  }

  if (deletedUnit) {
    return {
      code: 200,
      success: true,
      message: "Unit deleted successfully",
      data: deletedUnit,
    };
  }
};

module.exports = {
  createUnit,
  getAllUnits,
  updateUnit,
  deleteUnit,
};
