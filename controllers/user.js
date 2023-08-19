const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.userSignUp = (req, res) => {
  const { name, email, password, mobileNo } = req.body;

  bcrypt.hash(password, 10, async (err, hash) => {
    try {
      if (err) {
        return res
          .status(401)
          .json({ message: "please try again with valid password" });
      }

      await User.create({
        name,
        email,
        password: hash,
        mobileNo,
      });

      res.json({ message: "Signed up successfully" });
    } catch (err) {
      res.status(500).json({ message: "User already exist", error: err });
    }
  });
};

const generateToken = (id) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY);
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (user) {
      bcrypt.compare(password, user.password, (error, result) => {
        if (error)
          return res.status(500).json({ message: "Something went wrong" });

        if (!result)
          return res.status(401).json({ message: "Invalid password" });

        return res.json({
          message: "Successfully logged in",
          token: generateToken(user.id),
        });
      });
    } else {
      return res.status(404).json({ message: "User not exist" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: err, message: "Something went wrong please try again" });
  }
};
