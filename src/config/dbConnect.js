const { Sequelize } = require("sequelize");

//database connection 01
const db1 = new Sequelize("defaultdb", "gamer", "ovz1sSRq332plgy18SJuFg", {
  host: "raloxcrm-server-4599.7s5.aws-ap-south-1.cockroachlabs.cloud",
  dialect: "postgres",
  port: 26257,
  dialectOptions: {
    ssl: {},
  },
  logging: false,
});

//database connection 02
const db2 = new Sequelize(
  "defaultdb",
  "algorimsoftware",
  "DVtNRJtautVzt_yXnV61_A",
  {
    host: "sparse-mummy-7987.8nk.gcp-asia-southeast1.cockroachlabs.cloud",
    dialect: "postgres",
    port: 26257,
    dialectOptions: {
      ssl: {},
    },
    logging: false,
  }
);

const db3 = new Sequelize("defaultdb", "rao", "UAv1dS0HmBkbNxyXmqR77A", {
  host: "dashboard-db-6677.6xw.aws-ap-southeast-1.cockroachlabs.cloud",
  dialect: "postgres",
  port: 26257,
  dialectOptions: {
    ssl: {},
  },
  logging: false,
});

module.exports = { db1, db2, db3 };
