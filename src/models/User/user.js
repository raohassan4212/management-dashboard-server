const { DataTypes } = require("sequelize");
const { db1 } = require("../../config/dbConnect");

const PaymentMethod = require("../PaymentMethod/paymentMethod");
const Salary = require("../Salary/salary");
const CommissionRate = require("../CommissionRates/commissionRates");
const ProfileInfo = require("../ProfileInfo/profileInfo");

const User = db1.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      defaultValue: "Agent",
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
  },
  {
    tableName: "Users",
  }
);

User.hasOne(PaymentMethod, { foreignKey: "user_id" });
User.hasOne(Salary, { foreignKey: "user_id" });
User.hasOne(CommissionRate, { foreignKey: "user_id" });
User.hasOne(ProfileInfo, { foreignKey: "user_id" });

module.exports = User;
