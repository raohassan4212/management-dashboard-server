const { DataTypes } = require("sequelize");
const { db1, db3 } = require("../../config/dbConnect");

const Sale = db1.define(
  "Sales",
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
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sale_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Upfront",
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platform_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client_username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "Sales",
    freezeTableName: true,
  }
);

module.exports = Sale;
