const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
require("dotenv").config();
const helmet = require("helmet");
const sequelize = require("./util/database");
const userRoutes = require("./routes/user");
const User = require("./models/user");
const Chat = require("./models/chat");
const chatRoutes = require("./routes/chat");
const userAuth = require("./middleware/userAuth");
const UserGroup = require("./models/userGroups");
const Group = require("./models/group");
const groupRoutes = require("./routes/group");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(helmet());

app.use(bodyparser.json());

app.use("/user", userRoutes);

app.use("/chat", userAuth, chatRoutes);

app.use("/group", userAuth, groupRoutes);

User.hasMany(Chat);
Chat.belongsTo(User);

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

Group.hasMany(Chat);
Chat.belongsTo(Group);

sequelize
  .sync()
  .then(() => app.listen(4000))
  .catch((err) => console.log(err));
