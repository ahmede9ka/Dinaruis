const express = require("express");
const router = express.Router();
const {
  createCompaign,
  getCompaign,
  deleteCompaign,
} = require("../controllers/compaignController");
const { protect } = require("../controllers/authController");
// create user is just for testing
//router.post("/create", protect, createUser);

router.post("/create", protect, createCompaign);
router.get("/", protect, getCompaign);
router.delete("/:id", protect, deleteCompaign);

module.exports = router;
