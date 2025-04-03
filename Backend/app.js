const express = require("express");
const morgan = require("morgan");
const app = express();
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cron = require("node-cron");
const Campaign = require("./models/campaignModel"); // Import your Campaign model

const userRouter = require("./routes/userRoutes");
const investorRouter = require("./routes/investorRoutes");
const campaignRouter = require("./routes/campaignRoutes");
const donationRouter = require("./routes/donationRoutes");
const transactionRouter = require("./routes/transactionRoutes");
const entrepreneurRouter = require("./routes/entrepreneurRoutes");
const adminRouter = require("./routes/adminRoutes");

const { sendMail } = require("./controllers/sendmailController");
const { webhookChekout } = require("./controllers/stripeController");

// ✅ Webhook Route (Before express.json)
app.post(
  "/api/v1/webhook-checkout",
  express.raw({ type: "application/json" }), // Prevents body parsing
  webhookChekout
);

app.use(
  cors({
    origin: ["http://localhost:4200", "http://localhost:8080"], // Add both frontend domains here
    credentials: true, // Allow cookies
  })
);

// ✅ Body Parsers (AFTER webhook)
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// ✅ Cookie Parser
app.use(cookieParser());

// ✅ Serve Static Files
app.use(express.static(`${__dirname}/public`));

// ✅ Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/investor", investorRouter);
app.use("/api/v1/campaigns", campaignRouter);
app.use("/api/v1/donation", donationRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/entrepreneur", entrepreneurRouter);

app.post("/api/v1/sendmail", sendMail);

// ✅ Handle Unknown Routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

const updateExpiredCampaigns = async () => {
  try {
    const now = new Date();

    const result = await Campaign.updateMany(
      { endDate: { $lt: now }, status: { $ne: "Completed" } }, // Find expired campaigns
      { $set: { status: "Completed" } } // Update status
    );

    //console.log(`✅ Updated ${result.modifiedCount} expired campaigns.`);
  } catch (error) {
    console.error("❌ Error updating campaigns:", error.message);
  }
};
// 🏁 Run the function immediately on startup
(async () => {
  //console.log("🚀 Checking expired campaigns on startup...");
  await updateExpiredCampaigns();
})();

// 🔄 Schedule the task to run every day at midnight
cron.schedule("0 0 * * *", () => {
  console.log("🔄 Running scheduled campaign expiration check...");
  updateExpiredCampaigns();
});

// ✅ Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
