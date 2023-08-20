const Chat = require("../models/chat");
const Sequelize = require('sequelize');
const Op = Sequelize.Op

exports.postMsgs = async (req, res) => {
  try {
    await Chat.create({
      name: req.user.name,
      message: req.body.msg,
      userId: req.user.id,
    });

    res.json({ message: "success", name: req.user.name });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getMsgs = async (req, res) => {
  let lastMsgId = Number(req.query.lastMsgId);
  if (isNaN(lastMsgId)) {
    console.log('kkskks')
    lastMsgId = -1;
  }
  console.log(lastMsgId)

  try {
    const messages = await Chat.findAll({
      attributes: ["id", "name", "message"],
      where: {id:  {[Op.gt]: lastMsgId}}
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err, message: "something went wrong" });
  }
};
