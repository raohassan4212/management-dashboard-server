const { DataTypes } = require("sequelize");
const { db1 } = require("../../config/dbConnect");
const Prospect = require("../Prospect/prospects");
const Sale = require("../Sale/sale");

const Project = db1.define(
  "Projects",
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    serial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Open",
      validate: {      
        isIn: ["Open", "In Progress", "Completed"],
      },
    },
    doc_link: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    type: {
      type: DataTypes.STRING(
    
      ),
      allowNull: false,
      defaultValue: "",
    },
    last_updated: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // prospect_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: "Prospects",
    //     key: "id",
    //   },
    // },
    unit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Units",
        key: "id",
      },
    },
  },
  {
    tableName: "Projects",
    freezeTableName: true,
  }
);

// Project.hasMany(Prospect, { foreignKey: "project_id" });

module.exports = Project;
