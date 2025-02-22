const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const compaignSchema = new Schema({
  title: {
    type: String,
    required: [true, "A campaign must have a title"],
  },
  description: {
    type: String,
    required: [true, "A campaign must have a description"],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  localisation: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "SOCIAL",
      "BUSINESS",
      "ARTISTIC",
      "TECHNOLOGY",
      "MEDICAL",
      "EDUCATIONAL",
      "ENVIRONMENTAL",
    ],
    default: "OTHER",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference "User" (Entrepreneurs are stored in the same collection)
    required: true,
  },
});

const Compaign = mongoose.model("Compaign", compaignSchema);
module.exports = Compaign;
