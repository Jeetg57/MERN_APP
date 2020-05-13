const mongoose = require("mongoose");
const MetricSchema = new mongoose.Schema({
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  file: {
    type: Object,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Metrics", MetricSchema);
