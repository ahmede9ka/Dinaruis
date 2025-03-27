const User = require("../models/userModel");
const AppError = require("../utils/appError");
const Campaign = require("../models/campaignModel");
const Transaction = require("../models/transactionModel")
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
const getCampaignById = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    res.status(200).json({
      status: "success",
      data: campaign,
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
const AddFavorite = async (req, res) => {
  try {
    const { campaign_id, investor_id } = req.params;

    // Find the campaign by ID
    const campaign = await Campaign.findById(campaign_id);

    if (!campaign) {
      return res.status(404).json({
        status: "error",
        message: "Campaign not found",
      });
    }

    // Ensure isFavorite is an array before using 'includes'
    if (!Array.isArray(campaign.isFavorite)) {
      campaign.isFavorite = [];
    }

    // Add investor_id to isFavorite array (avoiding duplicates)
    if (!campaign.isFavorite.includes(investor_id)) {
      campaign.isFavorite.push(investor_id);
      await campaign.save();
    }

    res.status(200).json({
      status: "success",
      message: "Investor added to favorites",
      data: campaign,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Error adding to favorites: ${error.message}`,
    });
  }
};

const getFavoriteCampaigns = async (req, res) => {
  try {
    const { investor_id } = req.params;

    // Find all campaigns where the investor_id exists in the isFavorite array
    const favoriteCampaigns = await Campaign.find({ isFavorite: { $in: [investor_id] } })
      .populate("user", "name email") // Populate campaign owner's details (optional)
      .populate("isFavorite", "name email"); // Populate favorited users (optional)

    if (!favoriteCampaigns.length) {
      return res.status(404).json({
        status: "error",
        message: "No favorite campaigns found for this investor",
      });
    }

    res.status(200).json({
      status: "success",
      data: favoriteCampaigns,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: `Error fetching favorite campaigns: ${error.message}`,
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

    // Allow modification if the user is the campaign creator or an admin
    if (campaign.user.toString() !== req.user.id && req.user.role !== "ADMIN") {
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

const GetTotalContributors = async (req, res, next) => {
  try {
    // Find all campaigns (or you could limit by specific criteria if needed)

    const campaign = await Campaign.findById(req.params.id);

    if (!campaign || campaign.length === 0) {
      return next(new AppError("No campaign found", 404));
    }

    // Use a Set to store unique user IDs across all donations for all campaigns
    const uniqueContributors = new Set();

    
    const donations = await Transaction.find({ campaign: campaign._id });

      // Add the user ID from each donation to the Set
      donations.forEach(donation => {
        uniqueContributors.add(donation.user.toString()); // Assuming user is a reference to a user ID
      });
    

    // The size of the Set will give the number of unique contributors
    res.status(200).json({
      status: "success",
      data: {
        totalContributors: uniqueContributors.size,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `Error fetching contributors: ${error.message}`,
    });
  }
};

const deleteCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return next(new AppError("No Campaign found with that ID", 404));
    }

    // Only the campaign creator can delete it
    if (campaign.user.toString() !== req.user.id && req.user.role !== "ADMIN") {
      return next(new AppError("You are not authorized to update this campaign", 403));
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
  getCampaignById,
  getCampaign,
  updateCampaign, // ✅ Added update function
  deleteCampaign,
  getCampaignsByEntrepreneur,
  GetTotalContributors,
  AddFavorite,
  getFavoriteCampaigns
};
