const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const processDonation = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Missing amount field" });
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents (Stripe uses the smallest currency unit)
      currency: currency,
      payment_method: paymentMethodId,
      confirm: true, // Immediately confirm the payment
    });
    return res.status(200).json({
      success: true,
      message: "Donation successful",
      paymentIntent,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  processDonation,
};
