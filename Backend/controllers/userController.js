const User = require("../models/userModel");
const Entrepreneur = require("../models/entrepreneurModel");
const Admin = require("../models/adminModel");
//const { APIFeatures } = require("../utils/apifeatures");
const AppError = require("../utils/appError");
const Investor = require("../models/investorModel");

// JUST FOR TESTING
const createUser = async (req, res, next) => {
  try {
    if (req.body.role === "ADMIN") {
      const admin = await Admin.create(req.body);
    } else if (req.body.role === "ENTREPRENEUR") {
      const entrepreneur = await Entrepreneur.create(req.body);
    } else if (req.body.role === "INVESTOR") {
      const user = await Investor.create(req.body);
    } else {
      return next(new AppError("Please provide a valid role", 400));
    }

    //console.log(entrepreneur);
    res.status(201).json({
      status: "successssssssssssss",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `Error creating new user : ${error.message}`,
    });
  }
};

const getUsers = async (req, res, next) => {
  const users = await Admin.find();
  res.status(200).json({
    status: "success",
    data: users,
  });
};

module.exports = {
  createUser,
  getUsers,
};
