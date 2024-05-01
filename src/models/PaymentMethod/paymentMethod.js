const { DataTypes } = require("sequelize");
const { db1 } = require("../../config/dbConnect");

// : DataTypes.ENUM("fixed_salary", "commission","allowance"),
const PaymentMethod = db1.define(
  "PaymentMethod",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: "commission",
      allowNull: false,
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
    tableName: "PaymentMethods",
    freezeTableName: true,
  }
);

module.exports = PaymentMethod;
