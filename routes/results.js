const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

//ROUTES

//get back all the posts
router.get("/", async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (err) {
    res.json({ message: err });
  }
});
//SPECIFIC Result
router.get("/:resultId", async (req, res) => {
  try {
    const result = await Result.findById(req.params.resultId);
    res.json(result);
  } catch (err) {
    res.json({ message: error });
  }
});
//Delete result
router.delete("/:resultId", async (req, res) => {
  try {
    const removed = await Result.remove({ _id: req.params.resultId });
    res.json(removed);
  } catch (err) {
    res.send({ message: err });
  }
});

router.post("/", async (req, res) => {
  const result = new Result({
    images: req.body.images,
    custom_classes: req.body.custom_classes,
    images_processed: req.body.images_processed,
  });
  try {
    const savedResult = await result.save();
    res.json(savedResult);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:resultId", async (req, res) => {
  try {
    const update = await Result.updateOne(
      { _id: req.params.resultId },
      { $set: { title: req.body.title } }
    );
    res.json(update);
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
