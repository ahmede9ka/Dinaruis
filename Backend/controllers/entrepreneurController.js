const User = require("../models/userModel");
const Entrepreneur = require("../models/entrepreneurModel");
const Admin = require("../models/adminModel");
//const { APIFeatures } = require("../utils/apifeatures");
const AppError = require("../utils/appError");
const Investor = require("../models/investorModel");
const Campaign = require("../models/campaignModel");
const Donation = require("../models/donationModel");
const Transaction = require("../models/transactionModel");
const mongoose = require("mongoose");

const getTotalDonationsByEntrepreneur = async (req, res) => {
  try {
    const entrepreneurId = req.params.id;

    // 1) Find all campaigns by this entrepreneur
    const campaigns = await Campaign.find({ user: entrepreneurId });

    if (campaigns.length === 0) {
      return res
        .status(404)
        .json({ message: "No campaigns found for this entrepreneur" });
    }

    // Extract campaign IDs
    const campaignIds = campaigns.map((camp) => camp._id);

    // 2) Find all donations related to these campaigns
    const donations = await Donation.find({ campaign: { $in: campaignIds } });

    // 3) Calculate total amount
    const totalAmount = donations.reduce(
      (sum, donation) => sum + donation.amount,
      0
    );

    // 4) Calculate total for this month
    const now = new Date();
    const startOfMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
    );

    const donationsThisMonth = donations.filter(
      (donation) => donation.date >= startOfMonth
    );
    const totalAmountThisMonth = donationsThisMonth.reduce(
      (sum, donation) => sum + donation.amount,
      0
    );

    // 5) Calculate total for today
    const startOfDay = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );
    const startOfNextDay = new Date(startOfDay);
    startOfNextDay.setUTCDate(startOfNextDay.getUTCDate() + 1); // Next day at midnight

    const donationsToday = donations.filter(
      (donation) =>
        donation.date >= startOfDay && donation.date < startOfNextDay
    );
    const totalAmountToday = donationsToday.reduce(
      (sum, donation) => sum + donation.amount,
      0
    );

    // 6) Return total and campaign details
    res.status(200).json({
      totalDonations: totalAmount,
      totalDonationsThisMonth: totalAmountThisMonth,
      totalDonationsToday: totalAmountToday,
      //campaigns,
      //donations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCampaignStatusCount = async (req, res) => {
  try {
    const entrepreneurId = req.params.id;

    // 1) Find all campaigns by this entrepreneur
    const campaigns = await Campaign.find({ user: entrepreneurId });

    if (campaigns.length === 0) {
      return res
        .status(404)
        .json({ message: "No campaigns found for this entrepreneur" });
    }

    // 2) Count the campaigns by their status (active, completed, pending)
    const activeCampaigns = campaigns.filter(
      (campaign) => campaign.status === "Active"
    ).length;
    const completedCampaigns = campaigns.filter(
      (campaign) => campaign.status === "Completed"
    ).length;
    const pendingCampaigns = campaigns.filter(
      (campaign) => campaign.status === "Pending"
    ).length;

    // 3) Return the counts for each status
    res.status(200).json({
      activeCampaigns,
      completedCampaigns,
      pendingCampaigns,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUniqueInvestorsByEntrepreneur = async (req, res) => {
  try {
    const entrepreneurId = req.params.id;

    // 1) Find all campaigns by this entrepreneur
    const campaigns = await Campaign.find({ user: entrepreneurId });

    if (campaigns.length === 0) {
      return res
        .status(404)
        .json({ message: "No campaigns found for this entrepreneur" });
    }

    // Extract campaign IDs
    const campaignIds = campaigns.map((camp) => camp._id);

    // 2) Find all donations related to these campaigns
    const donations = await Donation.find({ campaign: { $in: campaignIds } });

    // 3) Get unique investors (users who donated)
    const uniqueInvestors = new Set(
      donations.map((donation) => donation.user.toString())
    );

    // 4) Return the number of unique investors
    res.status(200).json({
      totalUniqueInvestors: uniqueInvestors.size,
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

const getMonthlyCollectedAmount = async (req, res) => {
  try {
    const entrepreneurId = req.params.id;
    const currentYear = new Date().getUTCFullYear();

    // 1) Find all campaigns by this entrepreneur
    const campaigns = await Campaign.find({ user: entrepreneurId });

    if (campaigns.length === 0) {
      return res
        .status(404)
        .json({ message: "No campaigns found for this entrepreneur" });
    }

    // Extract campaign IDs
    const campaignIds = campaigns.map((camp) => camp._id);

    // 2) Find all donations related to these campaigns
    const donations = await Donation.find({
      campaign: { $in: campaignIds },
      date: {
        $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`), // Start of year
        $lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`), // End of year
      },
    });

    // 3) Calculate total donations by month
    const monthlyTotals = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      totalAmount: 0,
    }));

    donations.forEach((donation) => {
      const month = new Date(donation.date).getUTCMonth(); // 0-based index
      monthlyTotals[month].totalAmount += donation.amount;
    });

    // 4) Return the result
    res.status(200).json({
      //entrepreneurId,
      monthlyDonations: monthlyTotals,
    });
  } catch (error) {
    console.error("Error in getMonthlyDonationsByEntrepreneur:", error);
    res.status(500).json({ message: error.message });
  }
};
const getTopInvestors = async (req, res) => {
  try {
    const entrepreneurId = req.params.id;

    // 1) Get all campaigns for this entrepreneur
    const campaigns = await Campaign.find({ user: entrepreneurId });
    if (campaigns.length === 0) {
      return res
        .status(404)
        .json({ message: "No campaigns found for this entrepreneur" });
    }

    // 2) Get all donations related to these campaigns
    const campaignIds = campaigns.map((campaign) => campaign._id);
    const donations = await Donation.find({ campaign: { $in: campaignIds } });

    // 3) Group donations by investor (user)
    const donationsByInvestor = donations.reduce((acc, donation) => {
      if (acc[donation.user]) {
        acc[donation.user] += donation.amount;
      } else {
        acc[donation.user] = donation.amount;
      }
      return acc;
    }, {});

    // 4) Sort the investors by total donation amount in descending order
    const sortedInvestors = Object.entries(donationsByInvestor)
      .sort((a, b) => b[1] - a[1]) // Sort by donation amount in descending order
      .slice(0, 5); // Get the top 5 investors

    // 5) Retrieve full information about the top investors
    const topInvestors = await User.find({
      _id: { $in: sortedInvestors.map((investor) => investor[0]) },
    });

    // 6) Send the top 5 investors with their rank and total donation amount
    res.status(200).json({
      topInvestors: sortedInvestors.map((investor, index) => ({
        rank: index + 1,
        investor: topInvestors.find(
          (user) => user._id.toString() === investor[0].toString()
        ), // Map investor info
        totalAmount: investor[1],
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
<<<<<<< HEAD
//nbr of compaigns of each type ("cancled"excluded)
const getCampaignsCountByCategory = async (req, res) => {
  try {
    const entrepreneurId = req.params.id;

    // 1) Find all campaigns by this entrepreneur excluding those with "Cancelled" status
    const campaigns = await Campaign.find({
      user: entrepreneurId,
      status: { $ne: "Cancelled" }, // Exclude "Cancelled" status campaigns
    });

    if (campaigns.length === 0) {
      return res.status(404).json({ message: "No active campaigns found for this entrepreneur" });
    }

    // 2) Group campaigns by category (type) and count them
    const campaignsCountByCategory = campaigns.reduce((acc, campaign) => {
      // Get campaign type (category)
      const type = campaign.type;

      // Increment the count for this category (type)
      if (acc[type]) {
        acc[type] += 1;
      } else {
        acc[type] = 1;
      }

      return acc;
    }, {});

    // 3) Return the count of campaigns by category
    res.status(200).json({
      campaignsCountByCategory,
    });
  } catch (error) {
    console.error("Error fetching campaigns count by category:", error);
=======
const getInvestmentTypeCount = async (req, res) => {
  try {
    const entrepreneurId = req.params.id;

    // 1) Find all campaigns created by this entrepreneur
    const campaigns = await Campaign.find({ user: entrepreneurId }).select(
      "_id"
    );

    if (campaigns.length === 0) {
      return res.status(404).json({
        message: "No campaigns found for this entrepreneur",
      });
    }

    // Extract campaign IDs
    const campaignIds = campaigns.map((campaign) => campaign._id);

    // 2) Aggregate transactions to count each type
    const transactions = await Transaction.aggregate([
      {
        $match: { campaign: { $in: campaignIds } }, // Only transactions for these campaigns
      },
      {
        $group: {
          _id: "$type", // Group by transaction type
          count: { $sum: 1 }, // Count transactions of each type
        },
      },
    ]);

    // 3) Format the result to include all transaction types (set missing types to 0)
    const investmentTypes = [
      "donation",
      "equity-based investment",
      "loan-based investment",
      "rewards-based investment",
    ];

    const investmentCounts = investmentTypes.reduce((acc, type) => {
      const transaction = transactions.find((t) => t._id === type);
      acc[type] = transaction ? transaction.count : 0;
      return acc;
    }, {});

    // 4) Return response
    res.status(200).json({
      //entrepreneurId,
      investmentCounts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getCampaignTypesWithTransactionCounts = async (req, res) => {
  try {
    const entrepreneurId = req.params.id;

    // 1) Find all campaigns created by this entrepreneur
    const campaigns = await Campaign.find({ user: entrepreneurId }).select(
      "_id type"
    );

    if (campaigns.length === 0) {
      return res.status(404).json({
        message: "No campaigns found for this entrepreneur",
      });
    }

    // Create a map of campaign ID -> campaign type
    const campaignMap = new Map();
    campaigns.forEach((campaign) =>
      campaignMap.set(campaign._id.toString(), campaign.type)
    );

    // Convert campaign IDs to ObjectId properly
    const campaignIds = Array.from(campaignMap.keys()).map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    // 2) Aggregate transactions to count how many times each campaign type has been funded
    const transactionCounts = await Transaction.aggregate([
      {
        $match: { campaign: { $in: campaignIds } }, // Match transactions linked to the entrepreneur's campaigns
      },
      {
        $group: {
          _id: "$campaign", // Group by campaign
          count: { $sum: 1 }, // Count transactions per campaign
        },
      },
    ]);

    if (transactionCounts.length === 0) {
      return res.status(200).json({
        entrepreneurId,
        campaignTypes: [],
        message: "No transactions found for this entrepreneur's campaigns",
      });
    }

    // 3) Aggregate counts by campaign type
    const campaignTypeCounts = new Map();
    transactionCounts.forEach(({ _id, count }) => {
      const campaignType = campaignMap.get(_id.toString());
      if (campaignTypeCounts.has(campaignType)) {
        campaignTypeCounts.set(
          campaignType,
          campaignTypeCounts.get(campaignType) + count
        );
      } else {
        campaignTypeCounts.set(campaignType, count);
      }
    });

    // 4) Format response
    const result = Array.from(campaignTypeCounts).map(([type, count]) => ({
      type,
      count,
    }));

    res.status(200).json({
      //entrepreneurId,
      campaignTypes: result,
    });
  } catch (error) {
>>>>>>> be93979c286807a23488e8ddd2d72941ac0bba79
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTotalDonationsByEntrepreneur,
  getCampaignStatusCount,
  getUniqueInvestorsByEntrepreneur,
  invest,
<<<<<<< HEAD
  getMonthlyCollectedAmount,getTopInvestors,
  getCampaignsCountByCategory,
=======
  getMonthlyCollectedAmount,
  getTopInvestors,
  getInvestmentTypeCount,
  getCampaignTypesWithTransactionCounts,
>>>>>>> be93979c286807a23488e8ddd2d72941ac0bba79
};
