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
    origin: "http://localhost:4200", // Change to your frontend domain
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

// ✅ Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
