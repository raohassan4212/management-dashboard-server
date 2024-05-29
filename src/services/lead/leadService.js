const { Op } = require("sequelize");
const Lead = require("../../models/Lead/lead");
const User = require("../../models/User/user");
const moment = require("moment");
const Unit = require("../../models/Unit/unit");
const Department = require("../../models/Department/department");

const create = async (leadData) => {
  const serial = Math.floor(100 + Math.random() * 9000);
  try {
    const newLead = await Lead.create({ ...leadData, serial: `LD-${serial}` });
    if (newLead) {
      return {
        code: 200,
        success: true,
        message: "Lead created successfully",
        data: newLead,
      };
    }
  } catch (error) {
    throw new Error("Failed to create lead: " + error.message);
  }
};

const get = async (reqData) => {
  const { id, status, type, month, user_id, serial, unit_id, potential } =
    reqData;

  let whereClause = {};

  if (id) whereClause.id = id || "";
  if (user_id) whereClause.user_id = user_id || "";
  if (unit_id) whereClause.unit_id = unit_id || "";
  // if (date) whereClause.date = moment.utc(date).toISOString();
  if (month) whereClause.month = month;
  if (status) whereClause.status = status;
  if (type) whereClause.type = type;
  if (serial) whereClause.serial = serial;
  if (potential) whereClause.potential = potential;

  const page = parseInt(reqData.page) || 0;
  const pageSize = parseInt(reqData.pageSize) || 10;

  const zeroBasedPage = Math.max(0, page - 1);
  const offset = zeroBasedPage * pageSize;

  let totalCount;
  let leads;

  totalCount = await Lead.count({ where: whereClause });
  leads = await Lead.findAll({
    where: whereClause,
    include: [
      {
        model: User,
      },
      {
        model: Unit,
        include: [{ model: Department }],
      },
    ],
    offset,
    limit: pageSize,
  });
  if (leads) {
    return {
      code: 200,
      success: true,
      message: "Leads retrieved successfully",
      data: leads,
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      totalCount,
    };
  }
};

const update = async (reqData) => {
  console.log(reqData, "eq");
  if (!reqData) {
    return {
      code: 304,
      success: false,
      message: "No request body",
      data: null,
    };
  }
  const leads = await Lead.upsert(reqData);

  if (!leads) {
    return {
      code: 304,
      success: true,
      message: "Leads not updated",
      data: leads,
    };
  }

  if (leads) {
    return {
      code: 200,
      success: true,
      message: "Leads updated successfully",
      data: leads,
    };
  }
};

const destroy = async (id) => {
  console.log(id);
  const Lead = await Lead.findOne({ where: { id: id } });

  if (!Lead) {
    throw new Error("Lead not found");
  }

 const destoryedLead =  await Lead.destroy();

  return destoryedLead;
};

module.exports = {
  create,
  get,
  update,
  destroy,
};
