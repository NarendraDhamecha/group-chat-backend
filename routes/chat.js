const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat");

router.post("/sendmsg", chatController.postMsgs);

router.get("/getmsgs", chatController.getMsgs);

module.exports = router;
