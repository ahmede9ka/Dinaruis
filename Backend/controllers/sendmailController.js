const path = require("path"); // <-- Add this line at the top
const fs = require("fs");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Campaign = require("../models/campaignModel");
const User = require("../models/userModel");
const Donation = require("../models/donationModel");
const AppError = require("../utils/appError");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" }); // Loads environment variables

// Read the email template
const emailTemplatePath = path.join(
  __dirname,
  "..",
  "utils",
  "emailTemplate.html"
);
const emailTemplate = fs.readFileSync(emailTemplatePath, "utf8");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Use App Password, NOT your Gmail password!
  },
});

const sendMail = async (req, res) => {
  try {
    const { campaign_id, investmentType, investor_id } = req.body;

    if (!campaign_id || !investmentType || !investor_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const investor = await User.findById(investor_id);
    const campaign = await Campaign.findById(campaign_id);
    const entrepreneur = await User.findById(campaign.user);

    // Replace placeholders in template
    const htmlContent = emailTemplate
      .replace(
        "{{entrepreneurName}}",
        entrepreneur.firstName + " " + entrepreneur.lastName
      )
      .replace("{{investorName}}", investor.firstName + " " + investor.lastName)
      .replace("{{campaignName}}", campaign.title)
      .replace("{{investmentType}}", investmentType)
      .replace("{{investorEmail}}", investor.email)
      .replace("{{investorPhoneNumber}}", investor.phoneNumber);

    const mailOptions = {
      from: `"Dinaruis" <${process.env.EMAIL_USER}>`,
      to: entrepreneur.email,
      //entrepreneur.email,
      //"fouratmarouen0@gmail.com"
      subject: "Investment Opportunity",
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);

    res.status(200).json({ message: "Email sent successfully!", info });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
module.exports = { sendMail };
