require("dotenv");
const stripe = require("stripe")(process.env.STRIPE_TOKEN);

const stripeEP = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: process.env.STRIPE_PRICE,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:${process.env.SERVER_PORT}/update-paid-dues`,
    // success_url: `http://localhost:${process.env.CLIENT_PORT}/paid-dues`,
    // cancel_url: `http://localhost:3002/pay/Dues/Stripe?canceled=true`,
    // cancel_url: "http://localhost:8000/paid-dues-update-paid",
    cancel_url: `http://localhost:${process.env.CLIENT_PORT}/pay/Dues/Stripe?canceled=true`,
  });

  // res.redirect(303, session.url);
  res.json({ msg: session.url });
  // res.json({ msg: true });
  // console.log("TEST IN STRIPE");
};

module.exports = { stripeEP };
