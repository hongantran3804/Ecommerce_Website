/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-deprecated */
"use client";
import dayjs from "dayjs";
import React, { useEffect, useReducer, useState } from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import CartShow from "./CartShow";
import { useSession } from "next-auth/react";
import { checkoutNav } from "@utils/utils";
import Link from "next/link";
const ReviewCheckoutBoard = ({ products, subQuantity, userId }) => {
  const now = dayjs();
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
  useEffect(() => {
    setQuantity(subQuantity);
  }, [products]);
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
          deliveredDate: shippingOption.find((option) => option.chosen).date
        }),
        
      });
      if (response.ok) {
        window.location.href = "/orders";
      }
    } catch (err) {}
  };
  useEffect(() => {
    let calNum = 0;
    let calPrice = 0;
    quantity.forEach((eachQuan, index) => {
      calNum += eachQuan.value;
      calPrice += eachQuan.value * products[index].casePrice * 100;
    });
    setNumOfProd(calNum ? calNum : 0);
    setTotalPrice(calPrice ? calPrice : 0);
  }, [quantity, shippingPrice, products, quantity]);
  return (
    <section>
      <div className="mt-[5rem] ">
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
                      checkoutPage = {true}
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
            <div
              className="text-center border-[1px] mx-10 bg-mediumPurple text-white hover:bg-Purple cursor-pointer active:bg-LightPurple rounded-[5px] mt-5"
              onClick={handleOrder}
            >
              Place Your Order
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const ReviewCheckout = () => {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://localhost:3000/api/cart?userId=${session?.user.id}`);
      if (response.ok) {
        const { products, quantity } = await response.json();
        setProducts(products);
        setQuantity(quantity.map((each) => ({ value: each, included: true })));
      }
    };
    getData();
  }, [session?.user]);

  useEffect(() => {
    const mainview = document.getElementById("mainview");
    // eslint-disable-next-line react-hooks/exhaustive-deps, react/no-deprecated
    ReactDOM.render(
      <ReviewCheckoutBoard
        subQuantity={quantity}
        products={products}
        userId={session?.user?.id}
      />,
      mainview
    );
    
  }, [quantity, products]);
  return <Main />;
};

export default ReviewCheckout;
