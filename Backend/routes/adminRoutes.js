const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");

const { getDonations } = require("../controllers/adminController");
// create user is just for testing
//router.post("/create", protect, createUser);

router.get("/allDonations", protect, getDonations);

module.exports = router;
