const express = require("express");
const router = express.Router();
const {
  createCampaign,
  getCampaign,
  deleteCampaign,
} = require("../controllers/compaignController");
const { protect } = require("../controllers/authController");
// create user is just for testing
//router.post("/create", protect, createUser);

router.post("/create", protect, createCampaign);
router.get("/", protect, getCampaign);
router.delete("/:id", protect, deleteCampaign);

module.exports = router;
