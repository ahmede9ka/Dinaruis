const express = require("express");
const router = express.Router();
const {
  createDonation,
  getAllDonations,
  getDonationsByCampaign
} = require("../controllers/donationController");
const { protect } = require("../controllers/authController");

// create user is just for testing
//router.post("/create", protect, createUser);

router.post("/create", protect, createDonation);
router.get("/getDonations", protect, getAllDonations);
router.get("/getDonationByCampaign/:campaign",getDonationsByCampaign)
module.exports = router;
