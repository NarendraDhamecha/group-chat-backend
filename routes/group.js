const express = require("express");
const router = express.Router();
const groupController = require("../controllers/group");

router.post("/creategroup", groupController.createGroup);

router.get("/getgroup", groupController.getGroups);

module.exports = router;
