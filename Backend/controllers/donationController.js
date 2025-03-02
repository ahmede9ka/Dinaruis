const User = require("../models/userModel");
const Entrepreneur = require("../models/entrepreneurModel");
const Admin = require("../models/adminModel");
//const { APIFeatures } = require("../utils/apifeatures");
const AppError = require("../utils/appError");
const Investor = require("../models/investorModel");
const Campaign = require("../models/campaignModel");
const Donation = require("../models/donationModel");
const createDonation = async (req, res, next) => {
  try {
    /*const users = await User.find();
    console.log(users);*/
    if (req.user.role !== "INVESTOR") {
      return next(new AppError("Only investors can donate", 400));
    }
    //console.log(req.user);
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    console.log(req.body.campaignId);
    const campaign = await Campaign.findById(req.body.campaignId);
    if (!campaign) {
      return next(new AppError("Campaign not found", 404));
    }

    const donation = await Donation.create({
      amount: req.body.amount,
      date: new Date(), // Automatically set today's date
      user: req.user.id,
      campaign: req.body.campaignId,
    });

    res.status(201).json({
      status: "success",
      data: donation,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `Error creating new donation: ${error.message}`,
    });
  }
};
const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("user", "firstName lastName email") // Récupère les champs "name" et "email" de l'utilisateur
      .populate("campaign", "title description"); // Récupère "title" et "description" de la campagne

    res.status(200).json({
      status: "success",
      results: donations.length,
      data: { donations },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = { createDonation, getAllDonations };
