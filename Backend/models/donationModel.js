const mongoose = require("mongoose");
const Campaign = require("../models/campaignModel");

const Schema = mongoose.Schema;

const donationSchema = new Schema({
  amount: {
    type: Number,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now, // ✅ Set default date to today
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference "User" (Entrepreneurs are stored in the same collection)
    required: true,
  },
  campaign: {
    // ✅ Changed from "Campaign" to "campaign"
    type: Schema.Types.ObjectId,
    ref: "Campaign", // Reference "Campaign"
    required: true,
  },
});

// ✅ Fix pre-save hook to use lowercase "campaign"
donationSchema.pre("save", async function (next) {
  const campaign = await Campaign.findById(this.campaign); // ✅ Fixed field name

  if (!campaign) {
    return next(new Error("Campaign not found"));
  }
  next();
});

// Check if the model already exists to prevent overwriting
const Donation =
  mongoose.models.Donation || mongoose.model("Donation", donationSchema);

module.exports = Donation;
