const express = require("express");
const router = express.Router();
const User = require("../Models/UserModels");
const bcrypt = require("bcryptjs");
const Errors = require("../utils/error");
const jwt = require("jsonwebtoken");

router.post("/userSignup", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashingPassword = await bcrypt.hashSync(req.body.password, salt);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashingPassword,
  });
  try {
    const createUser = await newUser.save();
    res.status(201).json({ success: true, createUser });
  } catch (error) {
    res.status(500).json({ message: "Oops! something went wrong" });
  }
});

router.post("/userLogin", async (req, res, next) => {
  let existingUser;
  try {
    existingUser = await User.findOne({ username: req.body.username });
    if (!existingUser) {
      return next(Errors(404, "No user found"));
    }
    const isPasswordMatch = await bcrypt.compareSync(
      req.body.password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return next(Errors(404, "Invalid email or password"));
    }
    const token = jwt.sign(
      { id: existingUser._id, isAdmin: existingUser.isAdmin },
      process.env.SECRET_KEY
    );
    res.cookie("access_token", token, {
      httpOnly: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
  const { password, isAdmin, ...otherDetails } = existingUser._doc;
  return res.status(200).json({ ...otherDetails });
});

router.put("/updateUser/:id", async (req, res) => {
  try {
    const updateUser = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ msg: "Successfully updated", updateUser });
  } catch (error) {
    res.status(500).json({ message: "Nothing will be updated" });
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Successfully deleted", deleteUser });
  } catch (error) {
    res.status(500).json({ message: "Nothing will be deleted" });
  }
});

router.get("/getAllUser", async (req, res) => {
  try {
    const getAllUsers = await Hotel.find({});
    res.status(200).json({ getAllUsers, counts: getAllUsers.length });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});
module.exports = router;
