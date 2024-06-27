/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-deprecated */
"use client";
import dayjs from "dayjs";
import React, { useEffect, useReducer, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import CartShow from "./CartShow";
import { useSession } from "next-auth/react";
import { checkoutNav } from "@utils/utils";
import Link from "next/link";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";
import close from "@public/assets/icons/close.png";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const ReviewCheckoutBoard = ({
  products,
  subQuantity,
  userId,
  originalAddressId,
}) => {
  const now = dayjs();
  const [shippingAddress, setShippingAddress] = useState([]);
  const [placeOrder, setPlaceOrder] = useState(false);
  const [totalOrder, setTotalOrder] = useState(0);
  const [quantity, setQuantity] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [numOfProd, setNumOfProd] = useState(quantity.length);
  const [shippingOption, setShippingOption] = useState([
    { date: now.add(5, "days"), price: 0, chosen: true },
    {
      date: now.add(3, "days"),
      price: 699,
      chosen: false,
    },
    {
      date: now.add(1, "days"),
      price: 999,
      chosen: false,
    },
  ]);
  const [addressId, setAddressId] = useState();
  useEffect(() => {
    setQuantity(subQuantity);
    const getDefaultAddress = async () => {
      const response = await fetch(
        `http://localhost:3000/api/address?getDefaultAddress=true&userId=${userId}`
      );
      if (response.ok) {
        const { addressId, data } = await response.json();
        setShippingAddress(data);
        setAddressId(addressId);
      }
    };
    getDefaultAddress();
  }, [products, userId, shippingOption]);
  useEffect(() => {
    const getSpecifiedAddress = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/address/${originalAddressId}?userId=${userId}`
        );
        if (response.ok) {
          const {data} = await response.json();
          setShippingAddress(() => {
            if (Array.isArray(data)) return [...data];
          });
          setAddressId(originalAddressId);
        }
      } catch (err) {}
    };
    getSpecifiedAddress();
  }, [products, userId, shippingOption]);
  useEffect(() => {
    let calNum = 0;
    let calPrice = 0;
    quantity.forEach((eachQuan, index) => {
      calNum += eachQuan.value;
      calPrice += eachQuan.value * products[index].casePrice * 100;
    });

    setNumOfProd(calNum ? calNum : 0);
    setTotalPrice(calPrice ? calPrice : 0);
    setTotalOrder(
      Math.round((totalPrice + shippingPrice) / 10) + shippingPrice + totalPrice
    );
  }, [quantity, shippingPrice, products, addressId]);
  const handleOrder = async (e, amount) => {
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/orders`,
        {
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
            addressId: addressId,
          }),
        }
      );

      if (response.ok) {
        window.location.href = `${process.env.NEXT_PUBLIC_URL}/payment/success?amount=${amount}`;
      }
    } catch (err) {}
  };
  return (
    <section>
      <div className="mt-[5rem] ">
        <div className="bg-LightPurple p-3 text-white">
          <div className="flex flex-row items-center w-[50%] justify-between">
            <div>Shipping Address</div>
            {shippingAddress?.length > 0 ? (
              <div className="flex flex-col items-start">
                <div>
                  <div>{shippingAddress[0]}</div>
                  <div>{shippingAddress[1]}</div>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <span>{shippingAddress[2]},</span>
                  <span>{shippingAddress[3]}</span>
                  <span>{shippingAddress[4]}</span>
                </div>
              </div>
            ) : (
              <div className="font-bold">No address found</div>
            )}
          </div>
        </div>
        <div className="flex flex-row items-start gap-5 ">
          <div className="flex flex-row items-start flex-1 gap-5 border-[1px] p-5">
            <div className="flex-1">
              <div className="text-[1.2rem]">
                <span className="text-green-500">
                  Arriving{" "}
                  {shippingOption
                    .find((option) => option.chosen)
                    .date.format("MMMM D, YYYY")}
                </span>
              </div>
              <div className="flex flex-row items-start gap-5">
                <div className="flex flex-row justify-between gap-5 flex-1">
                  <div className="flex-1">
                    <CartShow
                      products={products}
                      quantity={quantity}
                      setQuantity={setQuantity}
                      checkoutPage={true}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>Choose a delivery option:</div>
              <div>
                {shippingOption.map((option, index) => {
                  return (
                    <div className="flex flex-row gap-2" key={option.date}>
                      <input
                        type="radio"
                        checked={option.chosen}
                        onClick={(e) => {
                          setShippingPrice(option.price);
                          setShippingOption((currentOption) => {
                            const newShippingOption = [...shippingOption];
                            newShippingOption.forEach(
                              (eachOption, optionIndex) => {
                                if (optionIndex === index) {
                                  eachOption.chosen = true;
                                } else {
                                  eachOption.chosen = false;
                                }
                              }
                            );
                            return newShippingOption;
                          });
                        }}
                      />
                      <div>
                        <span className="text-green-600 block">
                          {option.date.format("dddd, MMMM D")}
                        </span>
                        <span>
                          {option.price
                            ? `$${option.price / 100}`
                            : "Free Delivery"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-[1px] p-5">
            <div className="font-bold text-[1.2rem]">Order Summary</div>
            <div className="text-[.8rem] w-full">
              <div className="flex flex-row justify-between">
                <div>Items {`(${numOfProd})`}:</div>
                <div>${`${totalPrice / 100}`}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div>Shipping & handling:</div>
                <div>${`${shippingPrice / 100}`}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div>Total before tax:</div>
                <div>${`${(totalPrice + shippingPrice) / 100}`}</div>
              </div>
              <div className="flex flex-row justify-between gap-[3rem]">
                <div>Estimated tax to be collected:</div>
                <div>
                  ${`${Math.round((totalPrice + shippingPrice) / 10) / 100}`}
                </div>
              </div>
              <div className="text-[1.2rem] text-red-700 flex flex-row justify-between">
                <div>Order total: </div>
                <div>
                  $
                  {`${
                    (Math.round((totalPrice + shippingPrice) / 10) +
                      shippingPrice +
                      totalPrice) /
                    100
                  }`}
                </div>
              </div>
            </div>
            <div>
              {placeOrder ? (
                <div className="flex flex-col gap-2">
                  <div
                    className="self-end cursor-pointer"
                    onClick={(e) => {
                      setPlaceOrder(false);
                    }}
                  >
                    <Image src={close} className="w-[2rem]" />
                  </div>
                  <Elements
                    stripe={stripePromise}
                    options={{
                      mode: "payment",
                      amount:
                        Math.round((totalPrice + shippingPrice) / 10) +
                        shippingPrice +
                        totalPrice,
                      currency: "usd",
                    }}
                  >
                    <Payment
                      products={products}
                      quantity={quantity}
                      amount={
                        Math.round((totalPrice + shippingPrice) / 10) +
                        shippingPrice +
                        totalPrice
                      }
                      handleOrder={handleOrder}
                    />
                  </Elements>
                </div>
              ) : (
                <div
                  className="text-center border-[1px] mx-10 bg-mediumPurple text-white hover:bg-Purple cursor-pointer active:bg-LightPurple rounded-[5px] mt-5"
                  onClick={(e) => {
                    if (shippingAddress.length > 0) {
                      setPlaceOrder(true);
                    } else {
                      alert("No address found");
                    }
                  }}
                >
                  Place Your Order
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const ReviewCheckout = () => {
  const { data: session } = useSession();
  const [addressId, setAddressId] = useState("");
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);

    setAddressId(searchParams.get("data"));
    const getData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/cart?userId=${session?.user.id}`
      );
      if (response.ok) {
        const { products, quantity } = await response.json();
        setProducts(products);
        setQuantity(quantity.map((each) => ({ value: each, included: true })));
      }
    };
    getData();
  }, [session?.user]);
  if(products?.length === 0) return <div className="font-bold">No order found</div>
  return (
    <ReviewCheckoutBoard
      subQuantity={quantity}
      products={products}
      userId={session?.user?.id}
      originalAddressId={addressId}
    />
  );
};

export default ReviewCheckout;
