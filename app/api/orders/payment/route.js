"use server";

import convertCurrency from "@lib/convertCurrency";

export const POST = async (request) => {
  const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY); 
  const { amount } = await request.json();
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    return new Response(JSON.stringify({clientSecret: paymentIntent.client_secret}),{status:200})
  } catch (err) {
    console.log(err);
  }
  return new Response(
    JSON.stringify({ message: "Something went wrong"}, {status:422})
  );
};