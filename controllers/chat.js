const Chat = require("../models/chat");

exports.postMsgs = async (req, res) => {
  try {
    await Chat.create({
      name: req.user.name,
      message: req.body.msg,
      newUser: req.body.newUser,
      userId: req.user.id,
    });

    res.json({message: 'success'})
  } catch (err) {
    res.status(500).json(err);
  }
};
