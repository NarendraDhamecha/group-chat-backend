const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.userSignUp = (req, res) => {
  const { name, email, password, mobileNo } = req.body;

  bcrypt.hash(password, 10, async (err, hash) => {
    try {
      if (err) {
        return res.status(401).json({message: "please try again with valid password"})
      }

      await User.create({
        name,
        email,
        password: hash,
        mobileNo,
      });

      res.json({ message: "Signed up successfully" });
    } catch (err) {
      res.status(500).json({message: "User already exist", error: err});
    }
  });
};
