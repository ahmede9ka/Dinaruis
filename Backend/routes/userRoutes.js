const express = require("express");
const passport = require("../Middlewares/passport");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {
  createUser,
  getUsers,
  back,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");
const {
  signup,
  login,
  protect,
  protectAdmin,
} = require("../controllers/authController");
const { processDonation } = require("../controllers/stripeController");

// ✅ Create user (only for testing, requires authentication)
router.post("/create", protect, createUser);

// ✅ Get all users
router.get("/", getUsers);
router.get("/getall", protect, getAllUsers);

// ✅ Stripe Route
router.post("/donate", protect, processDonation);

// ✅ Authentication Routes
router.post("/signup", signup);
router.post("/login", login);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

// ✅ Google OAuth Routes
router.get("/auth/google", (req, res, next) => {
  const role = req.query.role; // Default to "INVESTOR"
  passport.authenticate("google", {
    scope: ["email", "profile"],
    state: JSON.stringify({ role }), // Pass the role in the state parameter
  })(req, res, next);
});
//http://127.0.0.1:8000/api/v1/users/auth/google?role=ENTREPRENEUR

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = req.user.token; // Extract JWT from req.user
    const user = req.user.user; // Extract user data

    // Set token in an HTTP-only cookie (more secure)
    res.cookie("jwt", token, {
      httpOnly: true, // Prevents JavaScript access (protects against XSS)
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // Expires in 7 days
    });

    // Redirect to the frontend with user info and token in query params

    const redirectUrl = `http://localhost:4200/callback?user=${encodeURIComponent(
      JSON.stringify(user)
    )}&token=${encodeURIComponent(token)}`;
    res.redirect(redirectUrl);
  }
);

router.get("/me", async (req, res) => {
  try {
    // 1. Extract the token from the HTTP-only cookie
    const token = req.cookies.jwt;
    console.log(req.cookies);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // 3. Fetch the user data from the database
    const user = await User.findById(decoded.id).select("-password"); // Exclude the password field
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 4. Return the user data
    res.json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
