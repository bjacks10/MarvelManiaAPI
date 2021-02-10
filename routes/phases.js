const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Phase, validate } = require("../models/phase");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const phase = await Phase.find()
    .select("-__v")
    .sort("name");
  res.send(phase);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let phase = new Phase({ name: req.body.name });
  phase = await phase.save();

  res.send(phase);
});


router.get("/:id", validateObjectId, async (req, res) => {
  const phase = await Phase.findById(req.params.id).select("-__v");

  if (!phase)
    return res.status(404).send("The phase with the given ID was not found.");

  res.send(phase);
});

module.exports = router;
