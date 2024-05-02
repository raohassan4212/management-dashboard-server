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
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING, 
      allowNull: false,
      defaultValue: "Open",
      validate: {
        isIn: [["Open", "In Progress", "Completed"]], 
      },
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
