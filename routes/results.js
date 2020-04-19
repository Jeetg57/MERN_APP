const express = require("express");
const router = express.Router();
const Result = require("../models/Result");
var VisualRecognitionV3 = require("watson-developer-cloud/visual-recognition/v3");
var fs = require("fs");
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

router.get("/test/:imagePath", async (req, res) => {
  try {
    var visualRecognition = new VisualRecognitionV3({
      version: "2018-03-19",
      iam_apikey: "zix8PHQYHiiqO4naCsELzIsgRgGn1pxzRYi-9kd4zFcE",
    });

    var images_file = fs.createReadStream(`./uploads/${req.params.imagePath}`);
    var classifier_ids = ["RashIdentificationModel_1554186704"];
    var threshold = 0.6;

    var params = {
      images_file: images_file,
      classifier_ids: classifier_ids,
      threshold: threshold,
    };
    var dataResponse;
    visualRecognition.classify(params, async function (err, response) {
      if (err) {
        console.log(err);
      } else {
        await res.json(response);
      }
    });
  } catch (err) {
    console.log(err);
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
