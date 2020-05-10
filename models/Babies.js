const mongoose = require("mongoose");
const Babies = new mongoose.Schema({
  regId: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  parentName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  metrics: {
    type: Array,
  },
});

module.exports = mongoose.model("Babies", Babies);
