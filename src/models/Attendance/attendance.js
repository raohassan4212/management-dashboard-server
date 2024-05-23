const { DataTypes } = require("sequelize");
const { db1 } = require("../../config/dbConnect");

const Attendance = db1.define(
  "Attendances",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    clock_in: {
      type: DataTypes.TIME,
      allowNull: false,
      unique: true,
    },
    clock_out: {
      type: DataTypes.TIME,
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
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },

  {
    tableName: "Attendances",
    freezeTableName: true,
  }
);

module.exports = Attendance;
