const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("./userModel"); // Import the User model
// Define Admin Discriminator
const Admin = User.discriminator(
  "Admin",
  new Schema(
    {
      role: {
        type: String,
        enum: ["ADMIN"],
        default: "ADMIN",
      },
    },
    { discriminatorKey: "__t" } // Keep track of the type
  )
);

module.exports = Admin;
