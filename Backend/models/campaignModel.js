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
    required: [true, "A campaign must have a status"],
    default: "Pending",
  },
  amountGoal: {
    type: Number, // Fixed type
    required: [true, "A campaign must have an amountGoal"],
  },
  raisedAmount:{
    type: Number, // Fixed type
    required: [true, "A campaign must have an raisedAmount"],
    default:0,
  },
  image: {
    type: String,
    required: [true, "A campaign must have an image"],
  },
  images: {
    type: [String], // Fixed array type
    required: [true, "A campaign must have a images"],
  },
  startDate: {
    type: Date,
    required: [true, "A campaign must have a starting date"],
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: [true, "A campaign must have an ending date"],
  },
  localisation: {
    type: String,
    required: [true, "A campaign must have a location"],
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
    required: [true, "A campaign must have a postal code"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  progress:{
    type:Number,
    default:0
  },
  isFavorite :{
    type:Boolean,
    default:false
  }
});

const Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;
