const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./src/route/userRoutes");
const sequelize = require("./src/config/dbConnect");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT;
sequelize
  .sync()
  .then(() => console.log("DB Synced"))
  .catch((err) => console.error("Failed to sync DB:", err));

app.use("/public/api/v1", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is Up on port ${PORT}`);
});
