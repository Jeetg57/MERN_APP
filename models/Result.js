const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
  images: [
    {
      classifiers: [
        {
          classifier_id: String,
          name: String,
          classes: [{ class: String, score: Number }],
        },
      ],
      image: String,
    },
  ],
  images_processed: Number,
  custom_classes: Number,
});

module.exports = mongoose.model("Result", resultSchema);
