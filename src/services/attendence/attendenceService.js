const { Op } = require("sequelize");
const Attendance = require("../../models/Attendance/attendance");
const User = require("../../models/User/user");
const moment = require("moment");

const createAttendance = async (attendanceData) => {
  try {
    const newAttendance = await Attendance.create(attendanceData);
    if (newAttendance) {
      return {
        code: 200,
        success: true,
        message: "Attendances created successfully",
        data: newAttendance,
      };
    }
  } catch (error) {
    throw new Error("Failed to create attendance: " + error.message);
  }
};

const getAllAttendances = async (reqData) => {
  const { name, date, user_id } = reqData;

  let whereClause = {};

  if (date)
    whereClause.date = moment.utc(date).toISOString()
  if (user_id) whereClause.user_id = user_id || "";

  const page = parseInt(reqData.page) || 0;
  const pageSize = parseInt(reqData.pageSize) || 10;

  const zeroBasedPage = Math.max(0, page - 1);
  const offset = zeroBasedPage * pageSize;

  let totalCount;
  let attendances;

  totalCount = await Attendance.count({ where: whereClause });
  attendances = await Attendance.findAll({
    where: whereClause,
    include: [
      {
        model: User,
        where: {
          name: { [Op.substring]: `%${name || ""}%` },
        },
      },
    ],
    offset,
    limit: pageSize,
  });
  if (attendances) {
    return {
      code: 200,
      success: true,
      message: "Attendances retrieved successfully",
      data: attendances,
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      totalCount,
    };
  }
};

const updateAttendance = async (reqData) => {
  if (!reqData) {
    return {
      code: 304,
      success: false,
      message: "No request body",
      data: null,
    };
  }
  const attendance = await Attendance.upsert(reqData);

  if (!attendance) {
    return {
      code: 304,
      success: true,
      message: "Attendances not updated",
      data: attendance,
    };
  }

  if (attendance) {
    return {
      code: 200,
      success: true,
      message: "Attendances updated successfully",
      data: attendance,
    };
  }
};

const deleteAttendance = async (attendanceId) => {
  const attendance = await Attendance.findOne({ where: { id: attendanceId } });

  if (!attendance) {
    throw new Error("Attendance not found");
  }

  await attendance.destroy();

  return attendance;
};

module.exports = {
  createAttendance,
  getAllAttendances,
  updateAttendance,
  deleteAttendance,
};
