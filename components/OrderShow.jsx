"use client";
import React, { useEffect, useReducer, useRef, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import OrderCard from "./OrderCard";
const OrderButton = ({ order, CancelOrder }) => {
  const now = dayjs();
  return (
    <div className="w-fit flex flex-col text-center gap-5">
      <div
        className="border-[1px] h-fit px-[3rem] py-1 
              text-[.8rem] rounded-[8px]  bg-LightPurple active:bg-Purple cursor-pointer text-white shadow-buttonShadow"
        onClick={(e) => {}}
      >
        <Link
          href={{
            pathname: "/trackingorder",
            query: {
              id: order._id,
              address: encodeURIComponent(JSON.stringify(order.address)),
            },
          }}
        >
          Track your package
        </Link>
      </div>
      {order.delivered ? (
        dayjs(order.deliveredDate).add(30, "days").isAfter(now) && (
          <div
            className="border-[1px] h-fit px-[3rem] py-1 text-[.8rem] rounded-[8px]  bg-LightPurple active:bg-Purple cursor-pointer text-white shadow-buttonShadow"
            onClick={(e) => {
              CancelOrder(e, order);
            }}
          >
            Return Order
          </div>
        )
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
  );
}
const OrderShow = ({ originalOrders, session }) => {
  if (!originalOrders) return;
  const [orders, setOrders] = useState(() => [...originalOrders]);
  
  useEffect(() => {
    setOrders(() => [...originalOrders]);
    
  }, [originalOrders]);
  
  const CancelOrder = async (e, order) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/orders?orderId=${order._id}`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        location.reload();
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="flex flex-col gap-10">
      {orders?.map((order, orderIndex) => (
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
              <div className="flex flex-col items-start relative group">
                <span>SHIP TO</span>
                <span className="hover:text-red-700 hover:underline peer cursor-pointer after:showAddress relative">
                  {session?.user?.name}
                </span>
                <div className="bg-white absolute p-3 w-[15rem] top-full hidden peer-hover:block">
                  <div>{session?.user?.name}</div>
                  <div className="uppercase">
                    <div>{order.address.streetAddress}</div>
                    <div>
                      <span>{order.address.city}, </span>
                      <span>
                        {order.address.state} {order.address.zipcode}
                      </span>
                    </div>
                  </div>

                  <div>{order.address.country}</div>
                </div>
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
                  `Delivered ${dayjs(order.deliveredDate).format(
                    "MMMM D, YYYY"
                  )}`
                ) : (
                  <span className="text-green-500">
                    Arriving {dayjs(order.deliveredDate).format("MMMM D, YYYY")}
                  </span>
                )}
              </div>
              <OrderCard order={order} orders={orders} orderIndex={orderIndex} session={session}/>
            </div>
            <OrderButton order={order} CancelOrder={CancelOrder} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderShow;
