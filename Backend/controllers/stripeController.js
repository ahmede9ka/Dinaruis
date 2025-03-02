const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Campaign = require("../models/campaignModel");
const User = require("../models/userModel");
const Donation = require("../models/donationModel");
const AppError = require("../utils/appError");

const processDonation = async (req, res, next) => {
  try {
    const { amount, campaign_id } = req.body;

    const campaign = await Campaign.findById(campaign_id);
    if (!campaign) {
      return res.status(400).json({ error: "Campaign not found" });
    }
    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: campaign.title,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        user_id: req.user.id,
        campaign_id: campaign_id,
        amount: amount,
      },
      mode: "payment",
      success_url: "http://localhost:3000/complete",
      cancel_url: "http://localhost:3000/cancel",
    });

    return res.status(200).json({
      status: "success",
      message: "Donation initiated",
      user_id: req.user.id,
      campaign_id: campaign_id,
      url: session.url,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};

const webhookChekout = async (req, res, next) => {
  const signature = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook error: ${error.message}`);
  }
  if (event.type === "checkout.session.completed") {
    console.log("Payment was successful");
    const session = event.data.object;
    const { user_id, campaign_id, amount } = session.metadata;
    try {
      const campaign = await Campaign.findById(campaign_id);
      const user = await User.findById(user_id);

      if (!campaign || !user) {
        console.error("❌ Campaign or User not found");
        return res.status(400).json({ error: "Invalid donation data" });
      }
      const donation = new Donation({
        amount: amount,
        date: new Date(),
        user: user_id,
        campaign: campaign_id,
      });

      await donation.save();
      console.log("✅ Donation saved successfully");
      return res.status(200).json({ received: true });
    } catch (error) {
      console.error("❌ Error saving donation:", error.message);
      return res.status(500).json({ error: error.message });
    }
  }
  res.status(200).json({ received: true });
};

module.exports = {
  processDonation,
  webhookChekout,
};
