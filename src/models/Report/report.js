const { DataTypes } = require("sequelize");
const { db1 } = require("../../config/dbConnect");

const Report = db1.define(
  "Report",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // day: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // month: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // year: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // period_start: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    // },
    // period_end: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    // },
    total_sales: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total_profit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total_expenses: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    month: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // is_archived: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    // },
  },
  {
    tableName: "Reports",
    freezeTableName: true,
  }
);

module.exports = Report;
