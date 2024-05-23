const { DataTypes } = require("sequelize");
const { db1 } = require("../../config/dbConnect");

const Salary = require("../Salary/salary");
const CommissionRate = require("../CommissionRates/commissionRates");
const ProfileInfo = require("../ProfileInfo/profileInfo");
const Attendance = require("../Attendance/attendance");
const Allowance = require("../Allowance/allowance");
const Ticket = require("../Tickets/ticket");
const Lead = require("../Lead/lead");

const User = db1.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    serial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "agent",
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    has_salary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    has_commission: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    has_allowance: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "Users",
  }
);

User.hasOne(Allowance, { foreignKey: "user_id" });
User.hasMany(Attendance, { foreignKey: "user_id" });
User.hasOne(Salary, { foreignKey: "user_id" });
User.hasOne(CommissionRate, { foreignKey: "user_id" });
User.hasOne(ProfileInfo, { foreignKey: "user_id" });
User.hasMany(Ticket, { foreignKey: "user_id" });
User.hasMany(Lead, { foreignKey: "user_id" });

Lead.belongsTo(User, { foreignKey: "user_id" });
Attendance.belongsTo(User, { foreignKey: "user_id" });

module.exports = User;
