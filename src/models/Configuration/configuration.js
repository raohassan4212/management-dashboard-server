const { DataTypes } = require("sequelize");
const { db1 } = require("../../config/dbConnect");

const User = require("../User/user");

const Configuration = db1.define(
  "Configuration",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.JSON,
    },
    designation: {
      type: DataTypes.JSON,
    },
    platforms: {
      type: DataTypes.JSON,
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
    tableName: "Configurations",
    freezeTableName: true,
  }
);

module.exports = Configuration;
