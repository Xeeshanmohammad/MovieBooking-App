const express = require("express");
const router = express.Router();
const Shows = require("../Models/ShowBookingModel");
const Movie = require("../Models/MovieModel");
const { verifyAdmin } = require("../utils/token");

router.post("/createShows/:Movieid", verifyAdmin, async (req, res, next) => {
  let MovieId = req.params.Movieid;
  let newShows = new Shows(req.body);
  try {
    const savedShows = await newShows.save();
    try {
      await Movie.findByIdAndUpdate(MovieId, {
        $push: { Shows: savedShows._id },
      });
      res.status(201).json(savedShows);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/updateShows/:id", verifyAdmin, async (req, res) => {
  try {
    const updateShows = await Shows.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ msg: "Successfully updated", updateShows });
  } catch (error) {
    res.status(500).json({ message: "Nothing will be updated" });
  }
});

router.delete("/deleteShows/:id/:Movieid", verifyAdmin, async (req, res) => {
  let MovieId = req.params.Movieid;
  try {
    const deleteShows = await Shows.findByIdAndDelete(req.params.id);
    try {
        await Movie.findByIdAndUpdate(MovieId, {
          $pull: { Shows: req.params.id},
        });
      } catch (error) {
        next(error);
      }
    res.status(200).json({ msg: "Successfully deleted", deleteShows });
  } catch (error) {
    res.status(500).json({ message: "Nothing will be deleted" });
  }
});

router.get("/getAllShows", async (req, res) => {
  try {
    const getAllShows = await Shows.find({});
    res.status(200).json({ getAllShows, counts: getAllShows.length });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/getShows/:id", async (req, res) => {
  try {
    const getShows = await Shows.findById({});
    res.status(200).json({ getShows });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
