const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const Donation = require("./donationModel");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "A user must have a first name"],
  },
  lastName: {
    type: String,
    required: [true, "A user must have a last name"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    minlength: 8,
    select: false, // Hide password in queries
  },
  googleId: {
    type: String, // Store Google OAuth ID for users logging in with Google
    unique: true,
    sparse: true, // Allows null values without breaking unique constraint
  },
  DateOfBirth: {
    type: Date,
    //required: true,
  },
  phoneNumber: {
    type: String,
    //required: [true, "A user must have a phone number"],
  },
  role: {
    type: String,
    enum: ["ADMIN", "ENTREPRENEUR", "INVESTOR"],
    default: "INVESTOR",
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next(); // Skip hashing if no password (Google login)

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Middleware to delete associated donations before deleting a user
userSchema.pre("findOneAndDelete", async function (next) {
  const user = await this.model.findOne(this.getQuery()); // Get the user being deleted

  if (!user) return next(); // If no user is found, exit middleware

  // Delete all donations associated with this user
  await Donation.deleteMany({ user: user._id });

  next();
});

// Method to compare passwords
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
