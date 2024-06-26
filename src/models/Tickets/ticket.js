const { DataTypes } = require("sequelize");
const { db1 } = require("../../config/dbConnect");

const Ticket = db1.define(
  "Ticket",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    serial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    approved_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    closed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Tickets",
    freezeTableName: true,
  }
);

module.exports = Ticket;
