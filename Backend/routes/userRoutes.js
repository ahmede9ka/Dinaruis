const express = require("express");
const passport = require("../Middlewares/passport");
const router = express.Router();
const {
  createUser,
  getUsers,
  back,
  updateUser,
} = require("../controllers/userController");
const { signup, login, protect } = require("../controllers/authController");

// ✅ Create user (only for testing, requires authentication)
router.post("/create", protect, createUser);

// ✅ Get all users
router.get("/", getUsers);

// ✅ Authentication Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/update", protect, updateUser);

// ✅ Google OAuth Routes
router.get("/auth/google", (req, res, next) => {
  const role = req.query.role; // Default to "INVESTOR"
  passport.authenticate("google", {
    scope: ["email", "profile"],
    state: JSON.stringify({ role }), // Pass the role in the state parameter
  })(req, res, next);
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = req.user.token; // Extract JWT from req.user
    const user = req.user.user; // Extract user data

    // Set token in an HTTP-only cookie (more secure)
    res.cookie("jwt", token, {
      httpOnly: true, // Prevents JavaScript access (protects against XSS)
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // Expires in 7 days
    });
    // Send JWT token to client after authentication
    res.json({ user: req.user, token: req.user.token });
  }
);

module.exports = router;
