const express = require("express");
const morgan = require("morgan");
const app = express();
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const investorRouter = require("./routes/investorRoutes");
const campaignRouter = require("./routes/campaignRoutes");
const donationRouter = require("./routes/donationRoutes");
const transactionRouter = require("./routes/transactionRoutes");

const adminRouter = require("./routes/adminRoutes");

const { sendMail } = require("./controllers/sendmailController");

const { webhookChekout } = require("./controllers/stripeController");
app.use(
  cors({
    origin: "http://localhost:4200", // Change to your frontend domain
    credentials: true, // Allow cookies
  })
);

app.post(
  "/api/v1/webhook-checkout",
  express.raw({ type: "application/json" }),
  webhookChekout
);

// Use cookie-parser middleware
app.use(cookieParser());

// Body parser , reading data from body into req.body
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// for serving static files
app.use(express.static(`${__dirname}/public`));

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/investor", investorRouter);
app.use("/api/v1/campaigns", campaignRouter);
app.use("/api/v1/donation", donationRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/admin", adminRouter);

app.post("/api/v1/sendmail", sendMail);
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
