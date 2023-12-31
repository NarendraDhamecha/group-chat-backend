const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const UserGroup = sequelize.define("userGroup", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  isAdmin: {
    type: Sequelize.INTEGER,
    defaultValue: false,
  },
});

module.exports = UserGroup;
