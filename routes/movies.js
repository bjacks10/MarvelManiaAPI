const { Movie, validate } = require("../models/movie");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const movies = await Movie.find()
    .select("-__v")
    .sort("name");
    res.send(movies);
});


router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = new Movie({
    title: req.body.title,
    phase: req.body.phase,
    order: req.body.order,
    characters: req.body.characters,
    runtime: req.body.runtime,
    releaseYear: req.body.releaseYear,
    description: req.body.description,
    liked: req.body.liked,
    picture:req.body.picture,
    publishDate: moment().toJSON()
  });
  await movie.save();

  res.send(movie);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
    title: req.body.title,
    phase: req.body.phase,
    order: req.body.order,
    characters: req.body.characters,
    runtime: req.body.runtime,
    releaseYear: req.body.releaseYear,
    description: req.body.description,
    liked: req.body.liked,
    picture:req.body.picture
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const movie = await Movie.findById(req.params.id).select("-__v");
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});


module.exports = router;
