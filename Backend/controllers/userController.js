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
      status: "success",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `Error creating new user : ${error.message}`,
    });
  }
};

//const getUsers = async (req, res, next) => {};

const getUsers = async (req, res, next) => {
  const users = await Admin.find();
  res.send('<a href="/api/v1/users/auth/google">Authenticate with google</a>');
};
const getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    length: users.length,
    data: users,
  });
};
const back = async (req, res, next) => {
  console.log("saha");
};
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `Error updating user : ${error.message}`,
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    res.status(204).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `Error deleting user: ${error.message}`,
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  back,
  updateUser,
  deleteUser,
  getAllUsers,
};
