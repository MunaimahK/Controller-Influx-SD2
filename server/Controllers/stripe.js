const stripe = require("stripe")(
  "sk_test_51OYvMuKUjwOMdwQrKj0XiNdeQBfUVO3eN8TrmPkEBoulsYGtYpyvf4lGnZft9Xl88rwvj4N0q82h8KjfmZXyC3nU00gLS8bldQ"
);

const stripeEP = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1OwDKdKUjwOMdwQr5jCjRDnO",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:8000/paid-dues-update-paid`,
    // cancel_url: `http://localhost:3002/pay/Dues/Stripe?canceled=true`,
    // cancel_url: "http://localhost:8000/paid-dues-update-paid",
    cancel_url: `http://localhost:8000/paid-dues`,
  });

  // res.redirect(303, session.url);
  res.json({ msg: session.url });
  // res.json({ msg: true });
  // console.log("TEST IN STRIPE");
};

module.exports = { stripeEP };
