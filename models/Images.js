const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  filename: String,
  path: String,
  size: Number,
  upload_date: Date,
});

module.exports = mongoose.model("Images", imageSchema);
