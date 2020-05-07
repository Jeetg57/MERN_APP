const express = require("express");
const router = express.Router();
const Metric = require("../models/Metrics");
const verify = require("../verifyToken");
const VisualRecognitionV3 = require("ibm-watson/visual-recognition/v3");
const { IamAuthenticator } = require("ibm-watson/auth");
const multer = require("multer");
const path = require("path");
var fs = require("fs");

//ROUTES

//get back all the posts
router.get("/", verify, async (req, res) => {
  try {
    const results = await Metric.find();
    res.json(results);
  } catch (err) {
    res.json({ message: err });
  }
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });
router.post("/", upload.single("file"), async (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }

  try {
    var visualRecognition = new VisualRecognitionV3({
      version: "2018-03-19",
      authenticator: new IamAuthenticator({ apikey: process.env.WATSON_API }),
      url: "https://gateway.watsonplatform.net/visual-recognition/api",
    });

    var images_file = fs.createReadStream(`./uploads/${file.filename}`);
    var classifier_ids = ["RashIdentificationModel_1554186704"];
    var threshold = 0.6;

    var params = {
      imagesFile: images_file,
      classifierIds: classifier_ids,
      threshold: threshold,
    };
    visualRecognition.classify(params, async function (err, response) {
      let issue, score;
      if (err) {
        console.log(err);
      } else {
        if (response.result.images[0].classifiers[0].classes[0] === undefined) {
          res.status(400).send({
            msg: "Unable to determine, please use a better image",
          });
        } else {
          issue = response.result.images[0].classifiers[0].classes[0].class;
          score = response.result.images[0].classifiers[0].classes[0].score;
          const metric = new Metric({
            regID: req.body.regID,
            height: req.body.height,
            weight: req.body.weight,
            temperature: req.body.temperature,
            file: {
              filename: file.filename,
              path: file.filename,
              size: file.size,
            },
            location: req.body.location,
            issue: issue,
            score: score,
            date: new Date(),
          });

          try {
            const savedResult = await metric.save();
            res.json(savedResult);
          } catch (err) {
            res.json({ message: err });
          }
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const removed = await Metric.deleteOne({ _id: req.params.id });
    res.json(removed);
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
