const { DataTypes } = require("sequelize");
const { db1 } = require("../../config/dbConnect");

const Unit = require("../Unit/unit");
const User = require("../User/user");

const Department = db1.define(
  "Department",
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
    tableName: "Departments",
    freezeTableName: true,
  }
);

Department.hasMany(Unit, { foreignKey: "depart_id" }); 

module.exports = Department;
