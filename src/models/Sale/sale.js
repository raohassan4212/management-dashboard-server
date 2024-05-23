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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sale_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Upfront",
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Sales",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    unit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Units",
        key: "id",
      },
    },
    prospect_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Prospects",
        key: "id",
      },
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
    tableName: "Sales",
    freezeTableName: true,
  }
);

module.exports = Sale;
