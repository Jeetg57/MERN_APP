const express = require("express");
const router = express.Router();
const verify = require("../verifyToken");
const Babies = require("../models/Babies");

//ROUTES

//get back all the posts
router.get("/", verify, async (req, res) => {
  try {
    const results = await Babies.find();
    res.json(results);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/:id", verify, async (req, res) => {
  try {
    const results = await Babies.findById(req.params.id);
    res.json(results);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/alerts/:regId", verify, async (req, res) => {
  try {
    const alertData = await Babies.find({
      regId: req.params.regId,
    }).select({ alerts: 1 });
    res.send(alertData);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", verify, async (req, res) => {
  const baby = new Babies({
    regId: Math.floor(Math.random() * 90000) + 10000,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    parentName: req.body.parentName,
    phoneNumber: req.body.phoneNumber,
    birthDate: new Date(req.body.date),
    metrics: [],
    alerts: [
      {
        height: "Initial",
        weight: "Initial",
        issue: "Initial",
        temperature: "Initial",
      },
    ],
  });
  try {
    const savedResult = await baby.save();
    res.json(savedResult);
  } catch (err) {
    res.send({ message: err });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const removed = await Babies.deleteOne({ _id: req.params.id });
    res.json(removed);
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
