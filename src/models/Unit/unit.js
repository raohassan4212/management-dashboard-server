const { DataTypes } = require("sequelize");
const { db1 } = require("../../config/dbConnect");

const User = require("../User/user");
const Sale = require("../Sale/sale");
const Ticket = require("../Tickets/ticket");
const Project = require("../Project/project");
const Lead = require("../Lead/lead");

const Unit = db1.define(
  "Unit",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    depart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Departments",
        key: "id",
      },
    },
  },
  {
    tableName: "Units",
    freezeTableName: true,
  }
);

Unit.hasMany(User, { foreignKey: "unit_id" });
Unit.hasMany(Sale, { foreignKey: "unit_id" });
Unit.hasMany(Project, { foreignKey: "unit_id" });
Unit.hasMany(Lead, { foreignKey: "unit_id" });
Unit.hasMany(Ticket, { foreignKey: "unit_id" });

module.exports = Unit;
