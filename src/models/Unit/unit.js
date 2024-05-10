const { DataTypes } = require("sequelize");
const {db1} = require("../../config/dbConnect");

const User = require("../User/user");

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
  },
  {
    tableName: "Units",
    freezeTableName: true,
  }
);

Unit.hasOne(User, { foreignKey: "unit_id" });

module.exports = Unit;
