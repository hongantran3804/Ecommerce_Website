"use client";
import React, { useEffect, useReducer, useRef, useState } from "react";
import checkmark from "@public/assets/icons/checkmark.png"
import Image from "next/image";
import defaultImg from "@public/assets/images/defaultProductPhoto.png";
import dayjs from "dayjs";
const OrderShow = ({ originalOrders, session }) => {
  if (!originalOrders) return;
  const [orders, setOrders] = useState(() => [...originalOrders]);
  const [buyAgainStatus, setBuyAgainStatus] = useState([])
  useEffect(() => {
    setOrders(() => [...originalOrders]);
    setBuyAgainStatus(() => orders.map(order => (Array.from({ length: order.length }, () => (false)))));
  },[originalOrders])
  const buyAgain = async (e, product) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: session.user.id,
          product: product,
        }),
      });
    } catch (err) {
      alert(err);
    }
  };
  const CancelOrder = async (e, order) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/orders?orderId=${order._id}`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        window.location.reload()
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="flex flex-col gap-10">
      {orders?.map((order,orderIndex) => (
        <div className="border-[1px]">
          <div className="p-3 text-[.9rem] flex flex-row items-center justify-between bg-gray-200 font-bold">
            <div className="flex flex-row justify-between w-[50%]">
              <div className="flex flex-col items-start">
                <span>ORDER PLACED</span>
                <span>
                  {dayjs(order.orderPlacedDate).format("MMMM D, YYYY")}
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span>TOTAL</span>
                <span>${order.total}</span>
              </div>
              <div className="flex flex-col items-start">
                <span>SHIP TO</span>
                <span>{session?.user?.name}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span>ORDER#</span> <span>{order._id}</span>
            </div>
          </div>
          <div className="p-3 flex flex-row justify-between">
            <div className="flex flex-col items-start gap-3">
              <div className="font-bold">
                {order.delivered ? (
                  `Delivered ${dayjs(order.deliveredDate).format("MMMM D, YYYY")}`
                ) : (
                  <span className="text-green-500">
                    Arriving {dayjs(order.deliveredDate).format("MMMM D, YYYY")}
                  </span>
                )}
              </div>
              {order.products?.map((product, productIndex) => (
                <div
                  className="flex flex-row items-start text-[.9rem] justify-between font-bold"
                  key={product._id}
                >
                  <div className="flex flex-row items-start gap-5 h-full">
                    <div>
                      <Image
                        src={product.photo ? product.photo : defaultImg}
                        className="w-full"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-between gap-3 ">
                      <span>{product.prodDesc}</span>
                      <span>{product.brand.name}</span>
                      <span>${product.casePrice}</span>
                      <span>Quantity: {product.quantity}</span>
                      <div
                        className="px-2 py-1 border-[1px] rounded-[5px] bg-LightPurple active:bg-Purple cursor-pointer text-white shadow-buttonShadow"
                        onClick={(e) => {
                          setBuyAgainStatus(() => {
                            const newBuyAgainStatus = [...buyAgainStatus];
                            newBuyAgainStatus[orderIndex][productIndex] = true;
                            return newBuyAgainStatus;
                          })
                          buyAgain(e, product);
                        }}
                      >
                       {buyAgainStatus[orderIndex] && buyAgainStatus[orderIndex][productIndex] ? <Image src={checkmark} className="w-[1rem]"/> : "Buy it again"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-fit flex flex-col text-center gap-5">
              <div className="border-[1px] h-fit px-[3rem] py-1 text-[.8rem] rounded-[8px]  bg-LightPurple active:bg-Purple cursor-pointer text-white shadow-buttonShadow">
                Track your package
              </div>
              {order.delivered ? (
                <div className="border-[1px] h-fit px-[3rem] py-1 text-[.8rem] rounded-[8px]  bg-LightPurple active:bg-Purple cursor-pointer text-white shadow-buttonShadow">
                  Return Order
                </div>
              ) : (
                <div
                  className="border-[1px] h-fit px-[3rem] py-1 text-[.8rem] rounded-[8px]  bg-LightPurple active:bg-Purple cursor-pointer text-white shadow-buttonShadow"
                  onClick={(e) => {
                    CancelOrder(e, order);
                  }}
                >
                  Cancel Order
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderShow;
