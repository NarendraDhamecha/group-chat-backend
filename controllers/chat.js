const Chat = require("../models/chat");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("getMessages", async (groupId) => {
    try {
      const messages = await Chat.findAll({ where: { groupId: groupId } });
      io.emit("messages", messages);
    } catch (err) {
      console.log(err);
    }
  });
});

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

// exports.getMsgs = async (req, res) => {
//   let { lastMsgId, groupId } = req.query;

//   if (lastMsgId === "null") {
//     lastMsgId = -1;
//   }

//   try {
//     if (groupId === "null") {
//       const messages = await Chat.findAll({
//         attributes: ["id", "name", "message"],
//         where: {
//           [Op.and]: [{ id: { [Op.gt]: Number(lastMsgId) } }, { groupId: null }],
//         },
//       });
//       return res.json(messages);
//     }

//     const messages = await Chat.findAll({
//       attributes: ["id", "name", "message"],
//       where: { groupId: groupId },
//     });
//     res.json(messages);
//   } catch (err) {
//     res.status(500).json({ error: err, message: "something went wrong" });
//   }
// };
