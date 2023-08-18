const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
require("dotenv").config();
const helmet = require("helmet");
const sequelize = require("./util/database");
const userRoutes = require("./routes/user");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(helmet());

app.use(bodyparser.json());

app.use("/user", userRoutes);

sequelize
  .sync()
  .then(() => app.listen(4000))
  .catch((err) => console.log(err));
