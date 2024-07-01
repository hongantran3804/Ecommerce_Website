"use client";
import React, { useEffect, useState } from "react";
import OrderShow from "./OrderShow";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
const OrdersSummary = ({ originalOrders, session }) => {
  const [prodName, setProdName] = useState("");

  const [orders, setOrders] = useState([]);
  const now = dayjs();
  const [filterDay, setFilterDay] = useState(now.subtract(30, "days"));
  useEffect(() => {
    setOrders((curr) => [
      ...originalOrders.filter((order) =>
        dayjs(order.orderPlacedDate).isAfter(filterDay)
      ),
    ]);
  }, [filterDay, originalOrders]);

  return (
    <section>
      <div className="flex flex-col gap-5">
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
            <option value="0" selected="selected">
              last 30 days
            </option>
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
      const response = await fetch(`/api/orders?userId=${session?.user?.id}`);
      if (response.ok) {
        const { orders } = await response.json();
        setOrders(() => orders);
      }
    };
    getOrders();
  }, [session?.user?.id]);
  return <OrdersSummary originalOrders={orders} session={session} />;
};

export default Orders;
