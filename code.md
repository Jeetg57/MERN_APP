var visualRecognition = new VisualRecognitionV3({
version: "2018-03-19",
iam_apikey: "zix8PHQYHiiqO4naCsELzIsgRgGn1pxzRYi-9kd4zFcE",
});
var VisualRecognitionV3 = require("watson-developer-cloud/visual-recognition/v3");
var fs = require("fs");

var visualRecognition = new VisualRecognitionV3({
version: "2018-03-19",
iam_apikey: "zix8PHQYHiiqO4naCsELzIsgRgGn1pxzRYi-9kd4zFcE",
});

var images_file = fs.createReadStream(\_\_dirname + "/uploads/rash.jpg");
var classifier_ids = ["RashIdentificationModel_1554186704"];
var threshold = 0.6;

var params = {
images_file: images_file,
classifier_ids: classifier_ids,
threshold: threshold,
};
var dataResponse;
visualRecognition.classify(params, function (err, response) {
if (err) {
console.log(err);
} else {
dataResponse = response;
}
});
sendData = () => {
console.log(JSON.stringify(dataResponse));

return dataResponse;
};
app.get("/results", (req, res) => {
res.render("results", {
layout: "index",
file: sendData(),
listExists: true,
});
});
