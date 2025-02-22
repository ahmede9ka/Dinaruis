const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("./userModel"); // Import the User model
// Define Admin Discriminator
const Investor = User.discriminator(
  "Investor",
  new Schema(
    {
      localisation: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["INVESTOR"], // Ensure role is always "INVESTOR"
        default: "INVESTOR",
      },
    },
    { discriminatorKey: "__t" } // Keep track of the type
  )
);

module.exports = Investor;
