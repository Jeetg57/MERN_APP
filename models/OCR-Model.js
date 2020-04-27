const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  filename: String,
  path: String,
  size: Number,
  upload_date: Date,
  text: String,
});

module.exports = mongoose.model("OCR-Model", imageSchema);
