"use client";
import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
const Payment = ({ products, quantity, amount, userId, now, shippingOption, shippingPrice, totalPrice }) => {
  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      const filtProducts = products
        .filter(
          (product, index) =>
            quantity[index].included && quantity[index].value > 0
        )
        .map((product, index) => ({
          ...product,
          quantity: quantity[index].value,
        }));
      const totalOrder =
        (Math.round((totalPrice + shippingPrice) / 10) +
          shippingPrice +
          totalPrice) /
        100;

      const response = await fetch(`http://localhost:3000/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          products: filtProducts,
          userId: userId,
          total: totalOrder,
          orderPlacedDate: now,
          deliveredDate: shippingOption.find((option) => option.chosen).date,
        }),
      });
    } catch (err) {}
  };
  if (!products || !quantity || amount < 0) return null;
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setclientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {

    const getStripeElement = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/orders/payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: amount,
            }),
          }
        );

        if (response.ok) {
          const { clientSecret } = await response.json();
          setclientSecret(clientSecret);
        }
      } catch (err) {}
    };
    getStripeElement();
  }, [products, quantity, amount]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error:submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements, clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment/success?amount=${amount}`
      }
    })

    if (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
    handleOrder(e)
  };
  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        {clientSecret && <PaymentElement />}
        {errorMessage && <div>{errorMessage}</div>}
        <button
          disabled={!stripe || loading}
          className="text-white w-full p5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
        >{!loading ? `Pay $${amount/100}` : "Processing..."}</button>
      </form>
    </section>
  );
};

export default Payment;
