const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");
const { protect } = require("../controllers/authController"); // Assuming you have an auth middleware

// Route to create a new transaction
router.post("/create", protect, createTransaction);

// Route to get all transactions
router.get("/", protect, getAllTransactions);

// Route to get transaction by ID
router.get("/:id", protect, getTransactionById);

// Route to update a transaction by ID
router.put("/:id", protect, updateTransaction);

// Route to delete a transaction by ID
router.delete("/:id", protect, deleteTransaction);

module.exports = router;
