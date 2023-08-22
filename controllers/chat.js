const Chat = require("../models/chat");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.postMsgs = async (req, res) => {
  try {
    await Chat.create({
      name: req.user.name,
      message: req.body.msg,
      userId: req.user.id,
      groupId: req.body.groupId,
    });

    res.json({ message: "success", name: req.user.name });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getMsgs = async (req, res) => {
  let { lastMsgId, groupId } = req.query;
  console.log(lastMsgId, groupId);

  if (lastMsgId === "null") {
    lastMsgId = -1;
  }

  try {
    if (groupId === "null") {
      const messages = await Chat.findAll({
        attributes: ["id", "name", "message"],
        where: {
          [Op.and]: [{ id: { [Op.gt]: Number(lastMsgId) } }, { groupId: null }],
        },
      });
      return res.json(messages);
    }

    const messages = await Chat.findAll({
      attributes: ["id", "name", "message"],
      where: { groupId: groupId },
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err, message: "something went wrong" });
  }
};
