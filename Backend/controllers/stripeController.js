const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Campaign = require("../models/campaignModel");

const processDonation = async (req, res) => {
  try {
    const { amount, campaign_id } = req.body;
    const campaign = await Campaign.findById(campaign_id);
    if (!campaign) {
      return res.status(400).json({ error: "Compaign not found" });
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

module.exports = {
  processDonation,
};
