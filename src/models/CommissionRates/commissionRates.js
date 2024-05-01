const { DataTypes } = require("sequelize");
const {db1} = require("../../config/dbConnect");

const User = require("../User/user");

const CommissionRate = db1.define(
  "CommissionRate",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rate: {
      type: DataTypes.FLOAT,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
    },
  },
  {
    tableName: "CommissionRates",
    freezeTableName: true,
  }
);

module.exports = CommissionRate;
