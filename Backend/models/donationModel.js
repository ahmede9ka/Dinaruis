const mongoose = require("mongoose");
const Transaction = require("../models/transactionModel");

const Schema = mongoose.Schema;

// Define the Donation-specific schema
const donationSchema = new Schema({
  amount: {
    type: Number,
    required: [true, "A donation must have an amount"],
    min: [1, "Amount must be greater than 0"],
  },
  type: {
    type: String,
    default: "donation", // ✅ Always set type to "donation"
    immutable: true, // ✅ Prevent modification of type
  },
});

// Create the Donation model using `discriminator`
const Donation = Transaction.discriminator("donation", donationSchema);

module.exports = Donation;
