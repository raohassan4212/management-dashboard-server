const { DataTypes } = require("sequelize");
const {db1} = require("../../config/dbConnect");

const Attendance = db1.define(
  "Attendances",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATETIME,
      allowNull: false,
    },
    clock_in: {
      type: DataTypes.DATETIME,
      allowNull: false,
      unique: true,
    },
    clock_out: {
      type: DataTypes.DATETIME,
      allowNull: false,
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },

  {
    tableName: "Attendances",
    freezeTableName: true,
  }
);

module.exports = Attendance;
