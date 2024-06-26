const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const sequelize = require("./src/config/dbConnect");

const userRoutes = require("./src/route/user/userRoutes");
const profileRoutes = require("./src/route/profile/profileRoutes");
const ticketRoutes = require("./src/route/ticket/ticketRoutes");
const projectRoute = require("./src/route/project/projectRoute");
const attendenceRoute = require("./src/route/attendence/attendenceRoute");
const reportRoute = require("./src/route/report/reportRoute");
const unitRoute = require("./src/route/unit/unitRoute");
const departmentRoute = require("./src/route/department/departmentRoute");
const saleRoute = require("./src/route/sale/saleRoutes");
const { calculateTolalSaleProfit } = require("./src/utils/cron.job");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 8080;
sequelize.db1
  .sync()
  .then(() => console.log("DB:1 Synced"))
  .catch((err) => console.error("Failed to sync DB:", err));
// sequelize.db2
//   .sync()
//   .then(() => console.log("DB:2 Synced"))
//   .catch((err) => console.error("Failed to sync DB:", err));

calculateTolalSaleProfit();

app.use("/public/api/v1/user/", userRoutes);
app.use("/public/api/v1/profile/", profileRoutes);
app.use("/public/api/v1/ticket/", ticketRoutes);
app.use("/public/api/v1/project/", projectRoute);
app.use("/public/api/v1/attendence/", attendenceRoute);
app.use("/public/api/v1/department/", departmentRoute);
app.use("/public/api/v1/unit/", unitRoute);
app.use("/public/api/v1/report/", reportRoute);
app.use("/public/api/v1/sale/", saleRoute);

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
