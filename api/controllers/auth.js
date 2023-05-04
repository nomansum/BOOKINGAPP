const User = require("../models/User");
const bcrypt = require("bcrypt");
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
    });

    await newUser.save();
    res.status(200).send("User has been created");
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      next(createError(404, "User Not Found"));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      next(createError(400, "Wrong password or username"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
