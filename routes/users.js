const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

//works
router.get("/", auth, async (req, res) => {
  const user = await User.find()
  .select("-password")
  .sort("name");
  res.send(user);
});

//works
router.get("/:id", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

//get the favorites of a particular user
/*router.get("/:id/favorites", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  const favorites = user.favorites;
  res.send(favorites);
});*/

//update the favorites of a particular user 
//unfinished
/*router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
    name: req.body.name,
    email: req.body.email,
    favorites: req.body.favorites
    },
    { new: true }
  ).select("-password");

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});*/

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email", "password"]));
});


module.exports = router;
