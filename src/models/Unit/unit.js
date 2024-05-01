const { DataTypes } = require("sequelize");
const {db1} = require("../../config/dbConnect");

const ProfileInfo = require("../ProfileInfo/profileInfo");

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

Unit.hasOne(ProfileInfo, { foreignKey: "unit_id" });

module.exports = Unit;
