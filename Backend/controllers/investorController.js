const User = require("../models/userModel");
const Entrepreneur = require("../models/entrepreneurModel");
const Admin = require("../models/adminModel");
//const { APIFeatures } = require("../utils/apifeatures");
const AppError = require("../utils/appError");
const Investor = require("../models/investorModel");
const Campaign = require("../models/campaignModel");
const Donation = require("../models/donationModel");
const Transaction = require("../models/transactionModel");
const Advice = require("../models/adviceModel");
const mongoose = require("mongoose");

const getInvestment = async (req, res, next) => {
  try {
    /*const donations = await Transaction.find({ user: req.user.id }).populate(
      "campaign",
      "title description"
    );*/
    const donations = await Donation.find();
    res.status(200).json({
      status: "success",
      data: donations,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `Error getting donations : ${error.message}`,
    });
  }
};
const getInvestmentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate if id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid ID format" });
    }

    // Fetch donations where user ID matches
    const donations = await Transaction.find({ user: id }).populate(
      "campaign",
      "title"
    );
    res.status(200).json({
      status: "success",
      data: donations,
    });
  } catch (error) {
    next(error); // Proper error handling
  }
};

const getTotalInvestment = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate investorId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid investor ID format" });
    }

    // Query only donation-type transactions using the Donation discriminator
    const donations = await Donation.find({ user: id });

    const totalInvestment = donations.reduce(
      (sum, donation) => sum + Number(donation.amount || 0),
      0
    );

    res.status(200).json({ totalInvestment });
  } catch (error) {
    console.error("Error fetching total investment:", error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

const getMonthlyInvestment = async (req, res) => {
  try {
    const investorId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(investorId)) {
      return res.status(400).json({ message: "Invalid investor ID" });
    }

    const currentYear = new Date().getUTCFullYear();
    const startOfYear = new Date(Date.UTC(currentYear, 0, 1));
    const startOfNextYear = new Date(Date.UTC(currentYear + 1, 0, 1));

    //console.log("Start of Year (UTC):", startOfYear);
    //console.log("Start of Next Year (UTC):", startOfNextYear);

    // Aggregation Query to get the total donations by month for the current year
    const monthlyInvestment = await Donation.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(investorId), // Ensure ID is properly formatted
          date: { $gte: startOfYear, $lt: startOfNextYear }, // Date range for the current year
        },
      },
      {
        $group: {
          _id: { $month: "$date" }, // Group by month
          totalAmount: { $sum: "$amount" }, // Sum donations per month
        },
      },
      { $sort: { _id: 1 } }, // Sort by month
    ]);

    //console.log("Aggregation Result:", monthlyInvestment);

    // Ensure every month has an entry, initializing months with 0 if missing
    const investmentByMonth = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      totalAmount:
        monthlyInvestment.find((m) => m._id === i + 1)?.totalAmount || 0,
    }));

    res.status(200).json({ investmentByMonth });
  } catch (error) {
    console.error("Error in getMonthlyInvestment:", error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

const getSupportedProjectsCount = async (req, res) => {
  try {
    const investorId = req.params.id;

    // 1) Find all donations made by this investor
    const donations = await Transaction.find({ user: investorId });

    // 2) Extract unique campaign IDs
    const uniqueCampaignIds = [
      ...new Set(donations.map((donation) => donation.campaign.toString())),
    ];

    // 3) Count unique campaigns
    const supportedProjectsCount = uniqueCampaignIds.length;

    // 4) Return the count
    res.status(200).json({
      supportedProjectsCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const invest = async (req, res, next) => {
  try {
    const donation = new Donation({
      amount: req.body.amount,
      date: new Date(),
      user: req.user.id,
      campaign: req.body.campaign_id,
    });
    await donation.save();
    res.status(201).json({
      status: "success",
      data: donation,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `Error creating donation : ${error.message}`,
    });
  }
};
/*const getAllInvestors = async (req, res, next) => {
  try {
    // Find all users with role 'INVESTOR'
    const investors = await User.find({ role: "INVESTOR" });

    res.status(200).json({
      status: "success",
      data: investors, // Return the 'investors' data here
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `Error fetching investors: ${error.message}`,
    });
  }
};*/
const getAllInvestors = async (req, res, next) => {
  try {
    // Aggregate total amount donated & count distinct campaigns across all transactions
    const transactions = await Transaction.aggregate([
      {
        $group: {
          _id: "$user", // Group by user (investor)
          totalDonated: { $sum: "$amount" }, // Sum total amount donated (across all transaction types)
          uniqueCampaigns: { $addToSet: "$campaign" }, // Collect unique campaign IDs
        },
      },
      {
        $project: {
          _id: 1,
          totalDonated: 1,
          campaignsInvested: { $size: "$uniqueCampaigns" }, // Count distinct campaigns
        },
      },
    ]);

    // Find all users with role 'INVESTOR'
    const investors = await User.find();

    // Map totalDonated & campaigns count to each investor
    const investorsWithDonations = investors.map((investor) => {
      const transaction = transactions.find(
        (t) => t._id?.toString() === investor._id.toString()
      );
      return {
        ...investor.toObject(), // Convert Mongoose object to plain object
        totalDonated: transaction ? transaction.totalDonated : 0, // Attach total donated amount
        campaignsInvested: transaction ? transaction.campaignsInvested : 0, // Attach unique campaign count
      };
    });

    res.status(200).json({
      status: "success",
      data: investorsWithDonations, // Return investors with donation stats
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `Error fetching investors: ${error.message}`,
    });
  }
};

const getAdvice = async (req, res) => {
  try {
    const count = await Advice.countDocuments(); // Get total number of advice entries
    if (count === 0) {
      return res.status(404).json({ message: "No advice found" });
    }

    const randomIndex = Math.floor(Math.random() * count); // Pick a random index
    const randomAdvice = await Advice.findOne().skip(randomIndex); // Get random advice

    res.status(200).json(randomAdvice);
  } catch (error) {
    console.error("Error fetching advice:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getInvestmentTypeCountForInvestor = async (req, res) => {
  try {
    const investorId = req.params.id;

    // 1) Aggregate transactions made by this specific investor
    const transactionCounts = await Transaction.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(investorId) }, // Filter by investor ID
      },
      {
        $group: {
          _id: "$type", // Group by transaction type
          count: { $sum: 1 }, // Count occurrences
        },
      },
    ]);

    // 2) Format response
    const investmentTypeCounts = transactionCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    res.status(200).json({
      //investorId,
      investmentTypeCounts,
    });
  } catch (error) {
    console.error("Error fetching investment type count for investor:", error);
    res.status(500).json({ message: error.message });
  }
};

const countCampaignTypesInvestorInvestedIn = async (req, res) => {
  try {
    const investorId = req.params.id;

    // 1) Find all transactions by this investor
    const transactions = await Transaction.find({ user: investorId }).populate(
      "campaign"
    );

    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No investments found for this investor" });
    }

    // 2) Extract campaign types from transactions and count unique campaigns per type
    const campaignTypeCounts = transactions.reduce((acc, transaction) => {
      const campaignType = transaction.campaign.type;

      // Ensure each campaign is counted only once per type
      if (!acc[campaignType]) {
        acc[campaignType] = new Set();
      }
      acc[campaignType].add(transaction.campaign._id);

      return acc;
    }, {});

    // Convert sets to counts
    const result = Object.fromEntries(
      Object.entries(campaignTypeCounts).map(([type, campaigns]) => [
        type,
        campaigns.size,
      ])
    );

    res.status(200).json({ campaignTypeInvestments: result });
  } catch (error) {
    console.error("Error fetching campaign types investor invested in:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInvestment,
  invest,
  getInvestmentById,
  getSupportedProjectsCount,
  getMonthlyInvestment,
  getTotalInvestment,
  getAllInvestors,
  getAdvice,
  getInvestmentTypeCountForInvestor,
  countCampaignTypesInvestorInvestedIn,
};
