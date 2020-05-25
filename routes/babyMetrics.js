const express = require("express");
const router = express.Router();
const BabyMetrics = require("../models/Babies");
const fs = require("fs");
const verify = require("../verifyToken");
const VisualRecognitionV3 = require("ibm-watson/visual-recognition/v3");
const { IamAuthenticator } = require("ibm-watson/auth");
const multer = require("multer");
const path = require("path");
const csv = require("@fast-csv/parse");
var moment = require("moment");
//ROUTES

//get back all the posts
router.get("/", verify, async (req, res) => {
  try {
    const results = await BabyMetrics.find();
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
  const baby = await BabyMetrics.findOne({ regId: req.body.regID });
  if (!baby)
    return res.status(400).send("No Baby found with this Registration ID");
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
          const metric = {
            height: Number(req.body.height),
            weight: Number(req.body.weight),
            temperature: Number(req.body.temperature),
            file: {
              filename: file.filename,
              path: file.filename,
              size: Number(file.size),
            },
            location: req.body.location,
            issue: issue,
            score: Number(score),
            date: new Date(),
          };

          try {
            const savedResult = await BabyMetrics.updateOne(
              { regId: req.body.regID },
              { $push: { metrics: metric } }
            );
            const babyDetail = await BabyMetrics.findOne({
              regId: req.body.regID,
            });

            var jsonResult = [];

            fs.createReadStream(
              path.resolve(__dirname, "../", "assets", "HEIGHT_WEIGHT.csv")
            )
              .pipe(csv.parse({ headers: true }))
              .on("error", (error) => console.error(error))
              .on("data", (row) => {
                jsonResult.push(row);
              })
              .on("end", async () => {
                let weight, height, issues, temperature;
                var a = moment(metric.date);
                var b = moment(babyDetail.birthDate);
                const monthDiff = a.diff(b, "months", true);
                if (Number(metric.temperature) > 37.5)
                  temperature = "High Temperature";
                if (Number(metric.temperature) < 35.5)
                  temperature = "Low Temperature";
                if (metric.issue === "Rash")
                  issues = "Baby Identified with Rash";
                jsonResult.map((row) => {
                  if (Number(row.AGE) === Math.round(monthDiff)) {
                    if (Number(metric.weight) < Number(row.BW - 200))
                      weight = "Baby is Underweight";
                    if (Number(metric.weight) > Number(row.BW + 200))
                      weight = "Baby is Overweight";
                    if (Number(metric.height) < Number(row.BH - 2))
                      height = "Baby is Underheight";
                    if (Number(metric.height) > Number(row.BH + 2))
                      height = "Baby is Overheight";
                  }
                });
                const alert = new Issue(height, weight, issues, temperature);
                const savedResult = await BabyMetrics.updateOne(
                  { regId: req.body.regID },
                  { $push: { alerts: alert } }
                );
              });
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
function Issue(height, weight, issue, temperature) {
  if (height !== undefined) this.height = height;
  if (weight !== undefined) this.weight = weight;
  if (issue !== undefined) this.issue = issue;
  if (temperature !== undefined) this.temperature = temperature;
  if (
    height === undefined &&
    weight === undefined &&
    issue === undefined &&
    temperature === undefined
  ) {
    this.normal = "Baby is perfectly normal";
  }
  this.date = new Date();
}

router.delete("/:id", async (req, res) => {
  try {
    const removed = await Metric.deleteOne({ _id: req.params.id });
    res.json(removed);
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
