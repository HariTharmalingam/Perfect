const User = require("../models/User");
const createError = require('../utils/appError');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const express = require("express");
const authRouter = express.Router();
// Register User
authRouter.post("/signup", async (req, res, next) => {

  console.log("request  : ")
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new createError('User already exists!', 400));
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    //JWT TOKEN to User
    const token = jwt.sign({_id: newUser._id}, "secretkey12", {
      expiresIn: '90d',
    });


    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      token
    });
  } catch (error) {
    console.log("Got an error", error);
  }
});

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return next(new  createError('User not found!', 404));

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new createError('Invalid email or password', 401));
    }

    //JWT TOKEN to User
    const token = jwt.sign({id: user._id}, "secretkey12", {
      expiresIn: '90d',
    });


    res.status(200).json({
      status: 'success',
      token,
      message: 'Logged in successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.log("Got an error", error);
  }
};

module.exports = authRouter