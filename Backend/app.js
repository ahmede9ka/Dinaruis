const express = require("express");
const morgan = require("morgan");
const app = express();
//const AppError = require("./utils/appError");
//const globalErrorHandler = require("./controllers/errorController");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:4200", // Replace with your Angular app's URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
// Use cookie-parser middleware
app.use(cookieParser());

// Body parser , reading data from body into req.body
app.use(express.json());

// for serving static files
app.use(express.static(`${__dirname}/public`));

module.exports = app;
