const { DataTypes } = require("sequelize");
const {db1} = require("../../config/dbConnect");

const db1 = sequelize.define(
  "Sales",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    date: {
      type: DataTypes.DATETIME,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Upfont", "Remaining", "Complete"),
      allowNull: false,
      defaultValue: "Open",
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
