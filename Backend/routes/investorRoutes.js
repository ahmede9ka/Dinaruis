const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");
const { getInvestment, invest } = require("../controllers/investorController");
// create user is just for testing
//router.post("/create", protect, createUser);

router.get("/getInvestment", protect, getInvestment);
router.post("/donate", protect, invest);

module.exports = router;
