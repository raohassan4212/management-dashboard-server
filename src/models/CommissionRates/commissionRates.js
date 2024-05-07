const { DataTypes } = require("sequelize");
const { db1 } = require("../../config/dbConnect");

const User = require("../User/user");

const CommissionRate = db1.define(
  "CommissionRate",
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
    rate: {
      type: DataTypes.FLOAT,
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
    tableName: "CommissionRates",
    freezeTableName: true,
  }
);

module.exports = CommissionRate;
