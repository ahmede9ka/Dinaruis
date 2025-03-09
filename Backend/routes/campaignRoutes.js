const express = require("express");
const router = express.Router();
const {
  createCampaign,
  getCampaign,
  deleteCampaign,
  updateCampaign,
  getCampaignsByEntrepreneur
} = require("../controllers/compaignController");
const { protect } = require("../controllers/authController");
// create user is just for testing
//router.post("/create", protect, createUser);

router.post("/create", protect, createCampaign);
router.get("/", protect, getCampaign);
router.get("/:id",protect,getCampaignsByEntrepreneur)
router.put("/:id", protect, updateCampaign);
router.delete("/:id", protect, deleteCampaign);

module.exports = router;
