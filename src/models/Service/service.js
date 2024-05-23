const { DataTypes } = require("sequelize");
const { db1 } = require("../../config/dbConnect");

const Service = db1.define(
  "Service",
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
  },
  {
    tableName: "Services",
    freezeTableName: true,
  }
);

module.exports = Service;
