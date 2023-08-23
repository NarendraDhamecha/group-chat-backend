const { Op, where } = require("sequelize");
const Group = require("../models/group");
const User = require("../models/user");
const userGroups = require("../models/userGroups");

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

    await group.addUser(users, { through: {} });
    res.json(group);
  } catch (err) {
    console.log(err);
  }
};

exports.getGroups = async (req, res) => {
  try {
    const groups = await req.user.getGroups();
    res.json(groups);
  } catch (err) {
    console.log(err);
  }
};

exports.addMember = async (req, res) => {
  const { members, group } = req.body;

  try {
    const users = await User.findAll({
      where: { email: { [Op.or]: members } },
    });

    const grp = await Group.findByPk(group.group.id);
    
    grp.addUser(users, {through: {}})
    res.json({message: 'success'})

  } catch (err) {
    console.log();
  }
};

exports.makeAdmin = async (req, res) => {
  const { members, group } = req.body;

  try {
   
    const user = await User.findAll({
      where: { email: members[0]}
    });


    
    
    await userGroups.update({isAdmin: true}, {
      where: {[Op.and]: [{userId: user[0].dataValues.id}, {groupId: group.group.id}]}
    })

    
    
    // const grp = await Group.findByPk(group.group.id);
    
    // grp.updateUser(users, {through: {isAdmin: true}})
    res.json({message: 'success'})

  } catch (err) {
    console.log();
  }
}
