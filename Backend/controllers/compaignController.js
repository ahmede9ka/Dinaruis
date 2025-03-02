const User = require("../models/userModel");
const Entrepreneur = require("../models/entrepreneurModel");
const Admin = require("../models/adminModel");
//const { APIFeatures } = require("../utils/apifeatures");
const AppError = require("../utils/appError");
const Investor = require("../models/investorModel");
const Campaign = require("../models/campaignModel");

const createCampaign = async (req, res, next) => {
  try {
    //console.log(req.user);
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    // Corrected data structure
    const data = {
      ...req.body, // Spread request body fields
      user: req.user._id, // Attach authenticated user ID
    };

    const newCampaign = await Campaign.create(data);

    res.status(201).json({
      status: "success",
      data: newCampaign,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `Error creating new Campaign : ${error.message}`,
    });
  }
};

const getCampaign = async (req, res, next) => {
  const campaign = await Campaign.find().populate("user", "firstName email");
  res.status(200).json({
    status: "success",
    data: campaign,
  });
};

const deleteCampaign = async (req, res, next) => {
  try {
    const id = req.params.id;
    const campaign = await Campaign.findByIdAndDelete(id);

    if (!campaign) {
      return next(new AppError("No Campaign found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `Error deleting Campaign : ${error.message}`,
    });
  }
};

module.exports = {
  createCampaign,
  getCampaign,
  deleteCampaign,
};
