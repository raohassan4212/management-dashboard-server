const { DataTypes } = require("sequelize");
const sequelize = require("../../config/dbConnect");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // role: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // token: {
    //   type: DataTypes.STRING,
    //   defaultValue: null,
    // },
  },
  {
    tableName: "Users",
    freezeTableName: true,
  }
);

module.exports = User;
