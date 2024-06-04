const { DataTypes } = require("sequelize");
const { db1, db3 } = require("../../config/dbConnect");
const Sale = require("../Sale/sale");

const Transactions = db1.define(
  "Transactions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    outstanding: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    acc_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    month: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Transactions",
    freezeTableName: true,
  }
);

Transactions.belongsTo(Sale, { foreignKey: 'sale_id' });

module.exports = Transactions;
