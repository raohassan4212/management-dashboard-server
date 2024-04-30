const { DataTypes } = require("sequelize");
const {db1} = require("../../config/dbConnect");

const User = require("../User/user");

const Salary = db1.define(
  "Salary",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
    },
  },
  {
    tableName: "Salaries",
    freezeTableName: true,
  }
);

module.exports = Salary;
