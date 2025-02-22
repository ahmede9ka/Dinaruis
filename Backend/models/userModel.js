const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "A user must have a firstname"],
  },
  lastName: {
    type: String,
    required: [true, "A user must have a lastname"],
  },
  email: {
    type: String,
    required: [true, "A user must have a name"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email "],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 8,
    select: false,
  },
  DateOfBirth: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "A user must have a name"],
  },
  role: {
    type: String,
    enum: ["ADMIN", "ENTREPRENEUR", "INVESTOR"],
    default: "INVESTOR",
  },
});

// before saving or updating to hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
