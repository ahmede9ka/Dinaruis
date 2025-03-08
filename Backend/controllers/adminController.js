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
        totalAmountSinceCreation: totalDonations[0]?.totalAmount || 0,
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

module.exports = { getDonations };
