const { DataTypes } = require("sequelize");
const {db1} = require("../../config/dbConnect");

const User = require("../User/user");

const Allowance = db1.define(
    "Allowance",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      allowance_type: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.FLOAT,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    },
    {
      tableName: "Allowances",
      freezeTableName: true,
    }
  );
  
  // Association (optional): Allowance belongs to a User
  Allowance.belongsTo(User, { foreignKey: 'user_id' });
  
  module.exports = Allowance;
  