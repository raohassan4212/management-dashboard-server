const { DataTypes } = require("sequelize");
const {db1} = require("../../config/dbConnect");

const ProfileInfo = db1.define(
  "ProfileInfo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    joined: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    disjoined: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    warning: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false
    },
    authorized: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false
    },
  },
  {
    tableName: "ProfileInfos",
    freezeTableName: true,
  }
);

module.exports = ProfileInfo;
