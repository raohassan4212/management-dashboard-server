const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("defaultdb", "rao", "UAv1dS0HmBkbNxyXmqR77A", {
  host: "dashboard-db-6677.6xw.aws-ap-southeast-1.cockroachlabs.cloud",
  dialect: "postgres",
  port: 26257,
  dialectOptions: {
    ssl: {},
  },
  logging: false,
});

module.exports = sequelize;
