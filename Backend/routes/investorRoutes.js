const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");
const {
  getInvestment,
  invest,
  getInvestmentById,
  getTotalInvestment,
  getSupportedProjectsCount,
  getMonthlyInvestment,
} = require("../controllers/investorController");
// create user is just for testing
//router.post("/create", protect, createUser);

router.get("/getInvestment", protect, getInvestment);
router.get("/getInvestment/:id", protect, getInvestmentById);
router.get("/getTotalInvestment/:id", protect, getTotalInvestment);
router.get(
  "/getSupportedProjectsCount/:id",
  protect,
  getSupportedProjectsCount
);
router.get("/getMonthlyInvestment/:id", protect, getMonthlyInvestment);

router.post("/donate", protect, invest);

module.exports = router;
