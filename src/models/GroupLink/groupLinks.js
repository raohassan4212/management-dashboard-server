const { DataTypes } = require("sequelize");
const { db1 } = require("../../config/dbConnect");

const GroupLinks = db1.define(
  "GroupLinks",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    group_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    authorized: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false
    },
  },
  {
    tableName: "GroupLinks",
    freezeTableName: true,
  }
);

module.exports = GroupLinks;
