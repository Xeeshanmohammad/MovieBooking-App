const express = require("express");
const router = express.Router();
const Movie = require("../Models/MovieModel");
const Errors = require("../utils/error");
const { verifyAdmin } = require("../utils/token");

router.post("/AddMovies", verifyAdmin, async (req, res) => {
  const newMovie = new Movie(req.body);
  try {
    const saveMovie = await newMovie.save();
    res.status(201).json({ success: true, saveMovie });
  } catch (error) {
    res.status(500).json({ message: "Oops! something went wrong" });
  }
});

router.get("/countMovieByLocation", async (req, res, next) => {
    const locations = req.query.locations.split(',')
  try {
    const getMovieList = await Promise.all(locations.map((location)=>{
        return Movie.countDocuments({location:location})
    }));
    res.status(200).json({ getMovieList });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/countMovieByName", async (req, res, next) => {
  const MovieByName = req.query.MovieByName.split(',')
try {
  const getMovieList = await Promise.all(MovieByName.map((MovieName)=>{
      return Movie.countDocuments({MovieName:MovieName})
  }));
  res.status(200).json({ getMovieList });
} catch (error) {
  res.status(500).json({ message: "Something went wrong" });
}
});

router.put("/updateMovies/:id", verifyAdmin, async (req, res) => {
  try {
    const updateMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ msg: "Successfully updated", updateMovie });
  } catch (error) {
    res.status(500).json({ message: "Nothing will be updated" });
  }
});

router.delete("/deleteMovies/:id", verifyAdmin, async (req, res) => {
  try {
    const deleteMovie = await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Successfully deleted", deleteMovie });
  } catch (error) {
    res.status(500).json({ message: "Nothing will be deleted" });
  }
});

router.get("/getAllMoviesList", async (req, res) => {
  try {
    const getAllMoviesList = await Movie.find({});
    res.status(200).json({ getAllMoviesList, counts: getAllMoviesList.length });
     } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/getMovie/:id", async (req, res) => {
  try {
    const getMovie = await Movie.findById({});
    res.status(200).json({ getMovie });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});


module.exports = router;
