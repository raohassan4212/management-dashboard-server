const { DataTypes } = require("sequelize");
const { db1, db3 } = require("../../config/dbConnect");

const Sale = db1.define(
  "Sales",
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Upfront",
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    month: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Sales",
    freezeTableName: true,
  }
);

module.exports = Sale;
