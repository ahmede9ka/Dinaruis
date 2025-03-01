const express = require("express");
const router = express.Router();
const { createDonation } = require("../controllers/donationController");
const { protect } = require("../controllers/authController");

// create user is just for testing
//router.post("/create", protect, createUser);

router.post("/create", protect, createDonation);

module.exports = router;
