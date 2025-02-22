const express = require("express");
const passport = require("../Middlewares/passport");
const router = express.Router();
const { createUser, getUsers,back } = require("../controllers/userController");
const { signup, login, protect } = require("../controllers/authController");

// ✅ Create user (only for testing, requires authentication)
router.post("/create", protect, createUser);

// ✅ Get all users
router.get("/", getUsers);

// ✅ Authentication Routes
router.post("/signup", signup);
router.post("/login", login);

// ✅ Google OAuth Routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/auth/google/callback",back);

module.exports = router;
