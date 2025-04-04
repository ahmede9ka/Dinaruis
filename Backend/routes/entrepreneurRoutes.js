const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");
const {
  getTotalDonationsByEntrepreneur,
  getCampaignStatusCount,
  getUniqueInvestorsByEntrepreneur,
  invest,
  getMonthlyCollectedAmount,
  getTopInvestors,
  getInvestmentTypeCount,
  getCampaignTypesWithTransactionCounts,
  getCampaignsCountByCategory,
} = require("../controllers/entrepreneurController");
// create user is just for testing
//router.post("/create", protect, createUser);

router.get(
  "/getTotalDonationsByEntrepreneur/:id",
  protect,
  getTotalDonationsByEntrepreneur
);
router.get("/getCampaignStatusCount/:id", protect, getCampaignStatusCount);

router.get("/getInvestmentTypeCount/:id", protect, getInvestmentTypeCount);
router.get(
  "/getCampaignsCountByCategory/:id",
  protect,
  getCampaignsCountByCategory
);

router.get(
  "/getCampaignTypesWithTransactionCounts/:id",
  protect,
  getCampaignTypesWithTransactionCounts
);

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
//top 5 investors
router.get(
  "/getTopInvestors/:id", // Define the endpoint to get top investors
  protect,
  getTopInvestors // Use the function we created earlier
);

module.exports = router;
