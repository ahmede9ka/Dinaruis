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
      return res.status(400).json({ status: "failed", message: "Invalid ID format" });
    }

    // Fetch donations where user ID matches
    const donations = await Transaction.find({ user: id }).populate('campaign', 'title');;
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
    const { id: investorId } = req.params;

    // Validate investorId format
    if (!mongoose.Types.ObjectId.isValid(investorId)) {
      return res.status(400).json({ message: "Invalid investor ID format" });
    }

    // Find all donations made by this investor
    const donations = await Transaction.find({ user: investorId });

    // Calculate total amount donated (handle case where donations might be empty)
    const totalInvestment = donations.reduce(
      (sum, donation) => sum + Number(donation.amount),
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
const getAllInvestors = async (req, res, next) => {
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

module.exports = {
  getInvestment,
  invest,
  getInvestmentById,
  getSupportedProjectsCount,
  getMonthlyInvestment,
  getTotalInvestment,
  getAllInvestors,
  getAdvice,
};
