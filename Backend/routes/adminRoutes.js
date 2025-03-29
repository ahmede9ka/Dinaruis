const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");

const {
  getTopInvestors,
  getDonations,
  getCampaignStatusCounts,
  getUserRoleCounts,
  getDonationsByMonth,
  getCampaignsByCategory,
} = require("../controllers/adminController");
// create user is just for testing
//router.post("/create", protect, createUser);

router.get("/allDonations", protect, getDonations);
router.get("/campaignStatus", protect, getCampaignStatusCounts);
router.get("/userCounts", protect, getUserRoleCounts);
router.get("/getDonationsByMonth", protect, getDonationsByMonth);
router.get("/getCampaignsByCategory", protect, getCampaignsByCategory);
router.get("/getTopInvestors", protect, getTopInvestors);
module.exports = router;
