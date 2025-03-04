const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" }); // Loads environment variables
const AppError = require("../utils/appError");
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { configDotenv } = require("dotenv");
const Admin = require("../models/adminModel");
//const { APIFeatures } = require("../utils/apifeatures");
const Investor = require("../models/investorModel");
const Entrepreneur = require("../models/entrepreneurModel");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "maher secret", {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = async (req, res, next) => {
  try {
    let newUser;
    if (req.body.role === "ADMIN") {
      newUser = await Admin.create(req.body);
    } else if (req.body.role === "ENTREPRENEUR") {
      newUser = await Entrepreneur.create(req.body);
    } else if (req.body.role === "INVESTOR") {
      newUser = await Investor.create(req.body);
    } else {
      return next(new AppError("Please provide a valid role", 400));
    }
    console.log(newUser);
    // Token creation (JWT)
    const token = signToken(newUser._id);
    const cookieExpiresIn = Number(process.env.JWT_COOKIE_EXPIRES_IN) || 90;
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + cookieExpiresIn * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    res.status(200).json({
      status: "success",
      token: token,
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: `Error creating new user : ${error.message}`,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password!", 401));
    }

    const token = signToken(user._id);
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() +
          (Number(process.env.JWT_COOKIE_EXPIRES_IN) || 90) *
            24 *
            60 *
            60 *
            1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure cookies for HTTPS only
      sameSite: "None", // Allow cross-site cookies
    });

    res.status(200).json({
      status: "success",
      token,
      user,
    });
  } catch (error) {
    next(new AppError(`Error logging in: ${error.message}`, 400));
  }
};

const protect = async (req, res, next) => {
  // 1) Get the token from the Authorization header
  //console.log(req.cookies.jwt);
  const token = req.cookies.jwt || req.headers["authorization"]?.split(" ")[1]; // "Bearer <token>"

  // 401: Unauthorized if no token
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }

  try {
    // Step 2: Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Step 3: Check if the user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(
        new AppError("The user belonging to this token no longer exists", 401)
      );
    }

    // If everything is fine, attach the user to the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token! Please log in again.", 401));
    } else if (error.name === "TokenExpiredError") {
      return next(new AppError("Token expired! Please log in again.", 401));
    }
    // For other unexpected errors, pass the error to the global error handler
    return next(
      new AppError("Something went wrong! Please try again later.", 500)
    );
  }
};
// middleware funtion to protect the access to tour routes
const protectAdmin = async (req, res, next) => {
  // 1) getting the token and check of it's there
  // we send the token with http headers

  let token = req.cookies.jwt;
  //console.log(token);

  // 401 not authorized
  if (!token) {
    return next(
      new AppError("You are not logged in ! Please log it to get access", 401)
    );
  }
  try {
    // Step 2: Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded); // Decoded information from the token

    // Step 3: Check if the user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(
        new AppError("The user belonging to this token no longer exists", 401)
      );
    }
    const role = user.role;
    if (role !== "ADMIN") {
      return next(
        new AppError(
          "You are not authorized to access this route !! Only Admins are allowed",
          403
        )
      );
    }

    // If everything is fine, attach the user to the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token! Please log in again.", 401));
    } else if (error.name === "TokenExpiredError") {
      return next(new AppError("Token expired! Please log in again.", 401));
    }
    // For other unexpected errors, pass the error to the global error handler
    return next(
      new AppError("Something went wrong! Please try again later.", 500)
    );
  }
};
module.exports = {
  signup,
  login,
  protect,
  protectAdmin,
};
