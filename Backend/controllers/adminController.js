const User = require("../models/userModel");
const Entrepreneur = require("../models/entrepreneurModel");
const Admin = require("../models/adminModel");
const AppError = require("../utils/appError");
const Investor = require("../models/investorModel");
const Campaign = require("../models/campaignModel");
const Donation = require("../models/donationModel");
const Transaction = require("../models/transactionModel");
const getDonations = async (req, res, next) => {
  try {
    // Récupérer la date actuelle
    const currentDate = new Date();

    // Date de début pour "ce mois" (premier jour du mois actuel)
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    // Date de début pour "aujourd'hui"
    const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));

    // 1. Montant total collecté depuis la création (toutes les donations)
    const totalDonations = await Donation.aggregate([
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    // 2. Montant total collecté ce mois
    const donationsThisMonth = await Donation.aggregate([
      { $match: { date: { $gte: startOfMonth } } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    // 3. Montant total collecté aujourd'hui
    const donationsToday = await Donation.aggregate([
      { $match: { date: { $gte: startOfDay } } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    // Répondre avec les résultats
    return res.status(200).json({
      status: "success",
      data: {
        totalAmount: totalDonations[0]?.totalAmount || 0,
        totalAmountThisMonth: donationsThisMonth[0]?.totalAmount || 0,
        totalAmountToday: donationsToday[0]?.totalAmount || 0,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};
const getCampaignStatusCounts = async (req, res, next) => {
  try {
    // Define the list of possible statuses
    const statuses = ["Pending", "Active", "Completed", "Cancelled"];

    // Aggregate campaigns by status and count them
    const statusCounts = await Campaign.aggregate([
      {
        $group: {
          _id: "$status", // Group by the status field
          count: { $sum: 1 }, // Count the number of campaigns in each group
        },
      },
    ]);

    // Create a map of status counts for easy lookup
    const statusCountMap = new Map();
    statusCounts.forEach((item) => {
      statusCountMap.set(item._id, item.count);
    });

    // Build the final result with all statuses, defaulting to 0 if no campaigns exist
    const result = statuses.map((status) => ({
      status,
      count: statusCountMap.get(status) || 0, // Default to 0 if status not found
    }));

    // Return the result in the response
    res.status(200).json({
      status: "success",
      data: {
        statusCounts: result,
      },
    });
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching campaign status counts",
      error: error.message,
    });
  }
};

const getUserRoleCounts = async (req, res, next) => {
  try {
    // Use MongoDB aggregation to group users by role and count them
    const roleCounts = await User.aggregate([
      {
        $group: {
          _id: "$role", // Group by the role field
          count: { $sum: 1 }, // Count the number of documents in each group
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field from the output
          role: "$_id", // Rename _id to role
          count: 1, // Include the count field
        },
      },
    ]);

    // Convert the array of objects to a more readable format
    const result = {};
    roleCounts.forEach((roleCount) => {
      result[roleCount.role] = roleCount.count;
    });

    // Send the response back to the client
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching user role counts:", error);

    // Send an error response to the client
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching user role counts.",
    });
  }
};

const getDonationsByMonth = async (req, res, next) => {
  try {
    // Get the current year
    const currentYear = new Date().getFullYear();

    // Use MongoDB aggregation to group donations by month and sum the amounts
    const donationsByMonth = await Donation.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(`${currentYear}-01-01`), // Start of the year
            $lt: new Date(`${currentYear + 1}-01-01`), // Start of the next year
          },
        },
      },
      {
        $group: {
          _id: { $month: "$date" }, // Group by month
          totalAmount: { $sum: "$amount" }, // Sum the donation amounts
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          month: "$_id", // Rename _id to month
          totalAmount: 1, // Include the totalAmount field
        },
      },
      {
        $sort: { month: 1 }, // Sort by month in ascending order
      },
    ]);

    // Create an array to hold the results for all 12 months
    const result = Array(12).fill(0); // Initialize with 0 for each month

    // Populate the result array with the data from the aggregation
    donationsByMonth.forEach((donation) => {
      result[donation.month - 1] = donation.totalAmount; // Months are 1-indexed in MongoDB
    });

    // Send the response back to the client
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching donations by month:", error);

    // Send an error response to the client
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching donations by month.",
    });
  }
};

const getCampaignsByCategory = async (req, res, next) => {
  try {
    // Define all possible campaign categories
    const allCategories = [
      "SOCIAL",
      "BUSINESS",
      "ARTISTIC",
      "TECHNOLOGY",
      "MEDICAL",
      "EDUCATIONAL",
      "ENVIRONMENTAL",
      "OTHER",
    ];

    // Use MongoDB aggregation to group campaigns by type and count them
    const campaignsByCategory = await Campaign.aggregate([
      {
        $group: {
          _id: "$type", // Group by the type field
          count: { $sum: 1 }, // Count the number of campaigns in each group
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          category: "$_id", // Rename _id to category
          count: 1, // Include the count field
        },
      },
    ]);

    // Create a result array with all categories and their counts
    const result = allCategories.map((category) => {
      const found = campaignsByCategory.find((c) => c.category === category);
      return {
        category,
        count: found ? found.count : 0, // Use 0 if no campaigns exist for this category
      };
    });

    // Send the response back to the client
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching campaigns by category:", error);

    // Send an error response to the client
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching campaigns by category.",
    });
  }
};
module.exports = {
  getDonations,
  getCampaignStatusCounts,
  getUserRoleCounts,
  getDonationsByMonth,
  getCampaignsByCategory,
};
