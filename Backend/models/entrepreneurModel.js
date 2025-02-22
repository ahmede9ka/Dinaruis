const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("./userModel"); // Import the User model

const Entrepreneur = User.discriminator(
  "Entrepreneur",
  new mongoose.Schema(
    {
      localisation: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["ENTREPRENEUR"], // Ensure role is always "ENTREPRENEUR"
        default: "ENTREPRENEUR",
      },
    },
    { discriminatorKey: "__t" } // Ensure Mongoose keeps track of the type
  )
);

module.exports = Entrepreneur;
