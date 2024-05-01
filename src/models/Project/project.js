const { DataTypes } = require("sequelize");
const {db1} = require("../../config/dbConnect");

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
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Open", "In Progress", "Completed"),
      allowNull: false,
      defaultValue: "Open",
    },
    pdf_link: {
      type:DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    type: {
      type: DataTypes.ENUM(
        "Development",
        "Design",
        "Marketing",
        "AI",
        "Cyber Security",
        "Branding",
        "Digital Marketing"
      ),
      allowNull: false,
      defaultValue: "",
    },
    last_updated: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Projects",
    freezeTableName: true,
  }
);

module.exports = Project;
