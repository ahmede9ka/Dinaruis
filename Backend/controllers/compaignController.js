const User = require("../models/userModel");
const AppError = require("../utils/appError");
const Campaign = require("../models/campaignModel");

// Create a new campaign
const createCampaign = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

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
      message: `Error creating new Campaign: ${error.message}`,
    });
  }
};

// Get all campaigns
const getCampaign = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find().populate("user", "firstName email");
    
    res.status(200).json({
      status: "success",
      data: campaigns,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Error fetching campaigns: ${error.message}`,
    });
  }
};
const getCampaignsByEntrepreneur = async (req, res, next) => {
  try {
    const { id } = req.params; // Correctly extract user ID from params

    const campaigns = await Campaign.find({ user: id }); // Find campaigns by user ID

    if (!campaigns || campaigns.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No campaigns found for this user",
      });
    }

    res.status(200).json({
      status: "success",
      data: campaigns,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Error fetching campaigns: ${error.message}`,
    });
  }
};



// Update a campaign
const updateCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return next(new AppError("No Campaign found with that ID", 404));
    }

    // Only the campaign creator can update it
    if (campaign.user.toString() !== req.user.id) {
      return next(new AppError("You are not authorized to update this campaign", 403));
    }

    // Update campaign fields
    Object.assign(campaign, req.body);
    await campaign.save();

    res.status(200).json({
      status: "success",
      data: campaign,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `Error updating Campaign: ${error.message}`,
    });
  }
};

// Delete a campaign
const deleteCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return next(new AppError("No Campaign found with that ID", 404));
    }

    // Only the campaign creator can delete it
    if (campaign.user.toString() !== req.user.id) {
      return next(new AppError("You are not authorized to delete this campaign", 403));
    }

    await campaign.deleteOne();

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `Error deleting Campaign: ${error.message}`,
    });
  }
};

module.exports = {
  createCampaign,
  getCampaign,
  updateCampaign, // ✅ Added update function
  deleteCampaign,
  getCampaignsByEntrepreneur
};
