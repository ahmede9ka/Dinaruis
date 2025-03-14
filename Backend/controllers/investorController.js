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
    const {id} = req.params;
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
module.exports = {
  getInvestment, 
  invest,
  getInvestmentById };
