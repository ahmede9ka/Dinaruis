const express = require("express");
const router = express.Router();
const { createUser, getUsers } = require("../controllers/userController");

const { signup, login, protect } = require("../controllers/authController");

// create user is just for testing
router.post("/create", protect, createUser);

router.get("/", protect, getUsers);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
