const Chat = require("../models/chat");

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
  try {
    const messages = await Chat.findAll({
      attributes: ["name", "message"],
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err, message: "something went wrong" });
  }
};
