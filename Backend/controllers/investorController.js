const User = require("../models/userModel");
const Entrepreneur = require("../models/entrepreneurModel");
const Admin = require("../models/adminModel");
//const { APIFeatures } = require("../utils/apifeatures");
const AppError = require("../utils/appError");
const Investor = require("../models/investorModel");
const Campaign = require("../models/campaignModel");
const Donation = require("../models/donationModel");
const Transaction = require("../models/transactionModel");
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
    /*const donations = await Transaction.find({ user: req.user.id }).populate(
      "campaign",
      "title description"
    );*/
    const { id } = req.params;
    const donations = await Donation.findById(id);
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

const getTotalInvestment = async (req, res) => {
  try {
    const investorId = req.params.id;

    // 1) Find all donations made by this investor
    const donations = await Donation.find({ user: investorId });

    // 2) Calculate total amount donated by the investor (default to 0 if no donations)
    const totalInvestment = donations.reduce(
      (sum, donation) => sum + donation.amount,
      0
    );

    // 3) Return the total investment
    res.status(200).json({
      totalInvestment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMonthlyInvestment = async (req, res) => {
  try {
    const investorId = req.params.id;
    const currentYear = new Date().getFullYear();

    // DEBUG: Check if the donations exist before aggregation
    const rawDonations = await Donation.find({
      user: investorId,
      date: {
        $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
        $lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
      },
    });

    console.log("Raw Donations Found:", rawDonations);

    // Aggregation Query
    const monthlyInvestment = await Donation.aggregate([
      {
        $match: {
          user: investorId, // Filter by investor
          date: {
            $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
            $lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
          },
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

    console.log("Aggregation Result:", monthlyInvestment);

    // Ensure every month has an entry
    const investmentByMonth = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      totalAmount:
        monthlyInvestment.find((m) => m._id === i + 1)?.totalAmount || 0,
    }));

    res.status(200).json({ investmentByMonth });
  } catch (error) {
    console.error("Error in getMonthlyInvestment:", error);
    res.status(500).json({ message: error.message });
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

module.exports = {
  getInvestment,
  invest,
  getInvestmentById,
  getSupportedProjectsCount,
  getMonthlyInvestment,
  getTotalInvestment,
  getAllInvestors,
};
