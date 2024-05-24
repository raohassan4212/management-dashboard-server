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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    serial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sale_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Upfront",
    },
    image: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    total: {
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
