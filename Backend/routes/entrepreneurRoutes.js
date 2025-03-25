const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");
const {
  getTotalDonationsByEntrepreneur,
  getCampaignStatusCount,
  getUniqueInvestorsByEntrepreneur,
  invest,
  getMonthlyCollectedAmount,
} = require("../controllers/entrepreneurController");
// create user is just for testing
//router.post("/create", protect, createUser);

router.get(
  "/getTotalDonationsByEntrepreneur/:id",
  protect,
  getTotalDonationsByEntrepreneur
);
router.get("/getCampaignStatusCount/:id", protect, getCampaignStatusCount);
router.get(
  "/getUniqueInvestorsByEntrepreneur/:id",
  protect,
  getUniqueInvestorsByEntrepreneur
);
router.post("/donate", protect, invest);
router.get(
  "/getMonthlyCollectedAmount/:id",
  protect,
  getMonthlyCollectedAmount
);

module.exports = router;
