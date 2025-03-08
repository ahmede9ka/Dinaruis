const mongoose = require("mongoose");
const Campaign = require("../models/campaignModel");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: () => new Date().setHours(0, 0, 0, 0), // Set default to today's date without time
    set: (date) => new Date(date).setHours(0, 0, 0, 0), // Strip time component when setting
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
  type: {
    type: String,
    enum: [
      "donation",
      "equity-based investment",
      "loan-based investment",
      "rewards-based investment",
    ],
    required: [true, "Transaction type is required"],
  },
});

// ✅ Fix pre-save hook to use lowercase "campaign"
transactionSchema.pre("save", async function (next) {
  const campaign = await Campaign.findById(this.campaign); // ✅ Fixed field name

  if (!campaign) {
    return next(new Error("Campaign not found"));
  }
  next();
});

// Check if the model already exists to prevent overwriting
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
