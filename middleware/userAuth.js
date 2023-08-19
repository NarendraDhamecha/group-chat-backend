const jwt = require("jsonwebtoken");
const User = require("../models/user");

userAuth = async (req, res, next) => {
  const token = req.header("Authorization");
  const userId = jwt.verify(token, process.env.JWT_SECRET_KEY);

  try {
    const user = await User.findByPk(userId.userId);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: err, message: "Unauthorized" });
  }
};

module.exports = userAuth;
