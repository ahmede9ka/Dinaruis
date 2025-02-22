const User = require("../models/userModel");
const Entrepreneur = require("../models/entrepreneurModel");
const Admin = require("../models/adminModel");
//const { APIFeatures } = require("../utils/apifeatures");
const AppError = require("../utils/appError");
const Investor = require("../models/investorModel");
const Compaign = require("../models/compaignModel");

const createCompaign = async (req, res, next) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    // Corrected data structure
    const data = {
      ...req.body, // Spread request body fields
      user: req.user._id, // Attach authenticated user ID
    };

    const newCompaign = await Compaign.create(data);

    res.status(201).json({
      status: "success",
      data: newCompaign,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `Error creating new compaign : ${error.message}`,
    });
  }
};

const getCompaign = async (req, res, next) => {
  const compaign = await Compaign.find();
  res.status(200).json({
    status: "success",
    data: compaign,
  });
};

const deleteCompaign = async (req, res, next) => {
  try {
    const id = req.params.id;
    const compaign = await Compaign.findByIdAndDelete(id);

    if (!compaign) {
      return next(new AppError("No compaign found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `Error deleting compaign : ${error.message}`,
    });
  }
};

module.exports = {
  createCompaign,
  getCompaign,
  deleteCompaign,
};
