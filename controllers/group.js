const { Op } = require("sequelize");
const Group = require("../models/group");
const User = require("../models/user");

exports.createGroup = async (req, res) => {
  const { members, groupName } = req.body;
  try {
    const group = await req.user.createGroup(
      { name: groupName },
      { through: { isAdmin: true } }
    );

    const users = await User.findAll({
      where: { email: { [Op.or]: members } },
    });

    await group.addUser(users, {through: {}});
    res.json(group);
  } catch (err) {
    console.log(err);
  }
};

exports.getGroups = async (req, res) => {
  try{
    const groups = await req.user.getGroups()
    res.json(groups);
  }
  catch(err){
    console.log(err)
  }
} 
