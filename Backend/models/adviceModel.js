const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adviceSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  advice: {
    type: String,
    required: true,
  },
});

const Advice = mongoose.model("Advice", adviceSchema);

module.exports = Advice;
