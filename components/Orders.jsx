"use client";
import React, { useEffect, useReducer, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import { testProducts } from "@utils/utils";
import prod6 from "@public/assets/images/prod6.png";
import Image from "next/image";
import OrderShow from "./OrderShow";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
const OrdersSummary = ({ originalOrders, session }) => {
  if (!originalOrders) return null;
  const [prodName, setProdName] = useState("");
  const [orders, setOrders] = useState([]);
  const now = dayjs();
  const [filterDay, setFilterDay] = useState(now.subtract(30, "days"));
  useEffect(() => {
    setOrders(
      (curr) => [...originalOrders.filter((order) => 
        dayjs(order.orderPlacedDate).isAfter(filterDay)
      )]
    );
  }, [filterDay, originalOrders]);
  return (
    <section>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center gap-3">
          <input
            type="text"
            name="SearchProd"
            placeholder="Search all orders"
            size="45"
            className="border-[1px] border-black rounded-[5px] p-1 text-[.9rem]"
            spellCheck="false"
          />
          <div className="bg-black text-white font-bold w-fit px-5 py-1 rounded-[20px] text-[.9rem]">
            Search Orders
          </div>
        </div>
        <div>
          <strong>
            {orders.length}{" "}
            {orders.length === 1 ? "order placed in " : "orders placed in "}
          </strong>{" "}
          <select
            className="border-[1px] border-black py-1 px-2 rounded-[10px] bg-gray-100 "
            onChange={(e) => {
              if (e.target.value === "0") {
                setFilterDay(() => now.subtract(30, "days"));
              } else if (e.target.value === "1") {
                setFilterDay(() => now.subtract(90, "days"));
              } else {
                setFilterDay(() => now.startOf("year"));
              }
            }}
          >
            <option value="0" selected="selected">last 30 days</option>
            <option value="1">last 3 months</option>
            <option value="2">{now.year()}</option>
          </select>
        </div>
        <OrderShow originalOrders={orders} session={session} />
      </div>
    </section>
  );
};
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const getOrders = async () => {
      const response = await fetch("http://localhost:3000/api/orders");
      if (response.ok) {
        const { orders } = await response.json();
        setOrders(() => orders);
      }
    };
    getOrders();
  }, []);
  useEffect(() => {
    const mainview = document.getElementById("mainview");
    // eslint-disable-next-line react-hooks/exhaustive-deps, react/no-deprecated
    ReactDOM.render(
      <React.StrictMode>
        <OrdersSummary originalOrders={orders} session={session} />
      </React.StrictMode>,
      mainview
    );
    const mainViewHeading = document.getElementById("mainViewHeading");
    ReactDOM.render(
      <div>
        <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
          Your Orders
        </h1>
      </div>,
      mainViewHeading
    );
  }, [orders]);

  return <Main />;
};

export default Orders;
