const { DataTypes } = require("sequelize");
const {db1} = require("../../config/dbConnect");

const Task = db1.define(
  "Task",
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
      unique: true,
    },
    due_date: {
      type: DataTypes.DATETIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Open", "In Progress", "Completed"),
      allowNull: false,
      defaultValue: "Open",
    },
    last_updated: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Tasks",
    freezeTableName: true,
  }
);

module.exports = Task;
