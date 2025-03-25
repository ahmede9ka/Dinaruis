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
  getAllInvestors,
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
router.get("/getInvestors", protect, getAllInvestors);

module.exports = router;
