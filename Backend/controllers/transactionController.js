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

    // Create the transaction
    const newTransaction = await Transaction.create({
      user,
      campaign,
      type,
    });

    res.status(201).json({
      status: "success",
      data: newTransaction,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `Error creating transaction: ${error.message}`,
    });
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
    res.status(500).json({
      status: "failed",
      message: `Error fetching transactions: ${error.message}`,
    });
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
    res.status(500).json({
      status: "failed",
      message: `Error fetching transaction: ${error.message}`,
    });
  }
};

// Update Transaction
const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user, campaign, type } = req.body;

    // Find the transaction by ID and update
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
    res.status(400).json({
      status: "failed",
      message: `Error updating transaction: ${error.message}`,
    });
  }
};
const getTransactionForEnt = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    // Aggregate to join transactions with campaigns and filter by userId
    const transactions = await Transaction.aggregate([
      {
        $lookup: {
          from: "campaigns", // Collection name in MongoDB
          localField: "campaign",
          foreignField: "_id",
          as: "campaignDetails",
        },
      },
      {
        $unwind: "$campaignDetails",
      },
      {
        $match: {
          "campaignDetails.user": new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $project: {
          _id: 1, // Include transaction ID
          amount: 1, // Include transaction amount (example field)
          date: 1, // Include transaction date (example field)
          "campaignDetails.title": 1, // Include campaign title
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `Error fetching transactions: ${error.message}`,
    });
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
    res.status(400).json({
      status: "failed",
      message: `Error deleting transaction: ${error.message}`,
    });
  }
};
const TopInvestors = async (req, res, next) => {
  try {
    const topInvestors = await Transaction.aggregate([
      {
        $group: {
          _id: '$user', // Group by user (assuming 'user' is the reference to the User model)
          totalAmount: { $sum: '$amount' }, // Sum up the transaction amounts
        },
      },
      {
        $lookup: {
          from: 'users', // Correct collection name for the 'users' collection
          localField: '_id', // 'user' in Transaction should match '_id' in User collection
          foreignField: '_id', // Match against the '_id' field in the 'users' collection
          as: 'userDetails', // The name of the new field to hold matched user data
        },
      },
      {
        $unwind: '$userDetails', // Unwind the userDetails array to get individual user data
      },
      {
        $project: {
          _id: 0, // Exclude the internal _id field from the result
          totalAmount: 1, // Include the totalAmount field
          'userDetails.firstname': 1, // Include the firstname from the userDetails
          'userDetails.lastname': 1, // Include the lastname from the userDetails
        },
      },
      {
        $sort: { totalAmount: -1 }, // Sort by totalAmount in descending order
      },
      {
        $limit: 5, // Limit the result to top 5 investors
      },
    ]);

    console.log(topInvestors); // Log the result for debugging

    res.status(200).json({
      status: 'success',
      data: topInvestors,
    });
  } catch (error) {
    console.error(error); // Log the error for better debugging
    res.status(500).json({
      status: 'failed',
      message: `Error fetching top investors: ${error.message}`,
    });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  TopInvestors,
  getTransactionForEnt
};
