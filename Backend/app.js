const express = require("express");
const morgan = require("morgan");
const app = express();
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const compaignRouter = require("./routes/compaignRoutes");

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

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/compaigns", compaignRouter);

// wrong calls
app.all("*", (req, res, next) => {
  /*const err = new Error(`Can't find ${req.originalUrl} on this server !`);
  err.status = 'fail';
  err.statusCode = 404;*/

  next(new AppError(`Can't find ${req.originalUrl} on this server !`, 404));
});

// Global Error Handling : the function is with 4 params
app.use(globalErrorHandler);

module.exports = app;
