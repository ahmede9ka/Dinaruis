const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");
const { getInvestment, 
    invest,
    getInvestmentById,
    getAllInvestors
 } = require("../controllers/investorController");
// create user is just for testing
//router.post("/create", protect, createUser);

router.get("/getInvestment", protect, getInvestment);
router.get("/getInvestment/:id", protect, getInvestmentById);

router.post("/donate", protect, invest);
router.get("/getInvestors", protect, getAllInvestors);

module.exports = router;
