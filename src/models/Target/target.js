const { DataTypes } = require("sequelize");
const {db1} = require("../../config/dbConnect");

const Target = db1.define(
  "Target",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    target_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    month: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    period_start: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    period_end: {
      type: DataTypes.DATETIME,
      allowNull: false,
    },
  },
  {
    tableName: "Targets",
    freezeTableName: true,
  }
);

module.exports = Target;
