const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campaignSchema = new Schema({
  title: {
    type: String,
    required: [true, "A campaign must have a title"],
  },
  description: {
    type: String,
    required: [true, "A campaign must have a description"],
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  amountGoal: {
    type: Number, // Fixed type
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Fixed array type
    required: true,
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
      "OTHER",
    ],
    default: "OTHER",
  },
  code_postal: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;
