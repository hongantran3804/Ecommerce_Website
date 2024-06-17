/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-deprecated */
"use client";
import dayjs from "dayjs";
import React, { useEffect, useReducer, useState } from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import CartShow from "./CartShow";
const CheckoutBoard = ({ products, subQuantity }) => {
  const now = dayjs();
  const [quantity, setQuantity] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [numOfProd, setNumOfProd] = useState(quantity.length);
  const [shippingOption, setShippingOption] = useState([
    { date: now.add(5, "days").format("dddd, MMMM D"), price: 0, chosen: true },
    { date: now.add(3, "days").format("dddd, MMMM D"), price: 699, chosen: false },
    { date: now.add(1, "days").format("dddd, MMMM D"), price: 999, chosen: false },
  ]);
  useEffect(() => {
    setQuantity(subQuantity);
  }, [products])
  
  useEffect(() => {
    let calNum = 0;
    let calPrice = 0;
    quantity.forEach((eachQuan, index) => {
      calNum += eachQuan.value;
      calPrice += eachQuan.value * products[index].price * 100;
    });
    setNumOfProd(calNum ? calNum : 0);
    setTotalPrice(calPrice ? calPrice : 0);
  }, [quantity, shippingPrice, products, quantity]);
  return (
    <section>
      <div>
        <div className="flex flex-row items-start gap-5">
          <div className="flex flex-row justify-between gap-5 flex-1">
            <div className="flex-1">
              <CartShow
                products={products}
                quantity={quantity}
                setQuantity={setQuantity}
              />
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
                        {option.date}
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
          <div>
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
            <div className="text-center border-[1px] mx-10 bg-mediumPurple text-white hover:bg-Purple cursor-pointer active:bg-LightPurple rounded-[5px]">Place Your Order</div>
          </div>
        </div>
      </div>
    </section>
  );
};
const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3000/api/cart");
      if (response.ok) {
        const { products, quantity } = await response.json();
        setProducts(products);
        setQuantity(quantity.map((each) => ({value: each, included:true})));
      }
    }
    getData();
  }, [])
  
  useEffect(() => {
    
    const mainview = document.getElementById("mainview");
    // eslint-disable-next-line react-hooks/exhaustive-deps, react/no-deprecated
    ReactDOM.render(
        <CheckoutBoard subQuantity={quantity} products={products} />,
      mainview
    );
    const mainViewHeading = document.getElementById("mainViewHeading");
    ReactDOM.render(
        <div>
          <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
            Checkout
          </h1>
        </div>,
      mainViewHeading
    );
  }, [quantity, products]);
  return <Main />;
};

export default Checkout;
