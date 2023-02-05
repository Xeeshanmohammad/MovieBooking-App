const express = require("express");
const router = express.Router();
const Theater = require("../Models/TheaterModel");

router.post("/AddTheaters",  async (req, res) => {
  const newTheater = new Theater(req.body);
  try {
    const saveTheater = await newTheater.save();
    res.status(201).json({ success: true, saveTheater });
  } catch (error) {
    res.status(500).json({ message: "Oops! something went wrong" });
  }
});

module.exports = router