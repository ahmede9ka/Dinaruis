const mongoose = require("mongoose");
const Transaction = require("../models/transactionModel");
const Campaign = require("../models/campaignModel");
const AppError = require("../utils/appError");

// Create Transaction
const createTransaction = async (req, res, next) => {
  try {
    const { user, campaign, type } = req.body;

    // Validate if the campaign exists
    const foundCampaign = await Campaign.findById(campaign);
    if (!foundCampaign) {
      return next(new AppError("Campaign not found", 404));
    }

    // Create and save the transaction
    const transaction = new Transaction({
      user: new mongoose.Types.ObjectId(user),
      campaign: new mongoose.Types.ObjectId(campaign),
      type,
    });

    await transaction.save(); // Ensure it is saved

    res.status(201).json({
      status: "success",
      data: transaction,
    });
  } catch (error) {
    next(new AppError(`Error creating transaction: ${error.message}`, 400));
  }
};

// Get all Transactions
const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find()
      .populate("user", "firstName lastName email")
      .populate("campaign", "title description");

    res.status(200).json({
      status: "success",
      results: transactions.length,
      data: transactions,
    });
  } catch (error) {
    next(new AppError(`Error fetching transactions: ${error.message}`, 500));
  }
};

// Get Transaction by ID
const getTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id)
      .populate("user", "firstName lastName email")
      .populate("campaign", "title description");

    if (!transaction) {
      return next(new AppError("Transaction not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: transaction,
    });
  } catch (error) {
    next(new AppError(`Error fetching transaction: ${error.message}`, 500));
  }
};

// Update Transaction
const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user, campaign, type } = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { user, campaign, type },
      { new: true, runValidators: true }
    )
      .populate("user", "firstName lastName email")
      .populate("campaign", "title description");

    if (!updatedTransaction) {
      return next(new AppError("Transaction not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: updatedTransaction,
    });
  } catch (error) {
    next(new AppError(`Error updating transaction: ${error.message}`, 400));
  }
};

// Get Transactions for an Entrepreneur
const getTransactionForEnt = async (req, res, next) => {
  try {
    const { id } = req.params; // ID of the entrepreneur (campaign creator)

    // Find all campaigns created by the entrepreneur
    const campaigns = await Campaign.find({ user: id }).select("_id");

    if (!campaigns.length) {
      return res.status(404).json({ message: "No campaigns found for this entrepreneur" });
    }

    const campaignIds = campaigns.map(campaign => campaign._id); // Extract campaign IDs
    console.log(campaignIds);
    // Fetch transactions for these campaigns
    const transactions = await Transaction.find({ campaign: { $in: campaignIds } })
      .populate("user", "firstName lastName email") // Populate Investor details
      .populate("campaign", "title amountGoal raisedAmount"); // Populate Campaign details

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Delete Transaction
const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return next(new AppError("Transaction not found", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(new AppError(`Error deleting transaction: ${error.message}`, 400));
  }
};

// Get Top Investors
const TopInvestors = async (req, res, next) => {
  try {
    const topInvestors = await Transaction.aggregate([
      {
        $group: {
          _id: "$user",
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: 0,
          totalAmount: 1,
          "userDetails.firstName": 1,
          "userDetails.lastName": 1,
        },
      },
      { $sort: { totalAmount: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({
      status: "success",
      data: topInvestors,
    });
  } catch (error) {
    next(new AppError(`Error fetching top investors: ${error.message}`, 500));
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  TopInvestors,
  getTransactionForEnt,
};
