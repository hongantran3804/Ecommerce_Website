"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import previousPage from "@public/assets/icons/previousPage.png";
import Image from "next/image";
import Link from "next/link";
const SearchOrderPage = () => {
  const [order, setOrder] = useState([]);
  const { data: session } = useSession();
  const [queryString, setQueryString] = useState("");
  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    setQueryString(searchParams.get("queryString"));
    const getData = async () => {
      try {
        const response = await fetch(
          `/api/orders/products?queryString=${searchParams.get(
            "queryString"
          )}&userId=${session?.user?.id}`
        );
        if (response.ok) {
          const { order } = await response.json();
          setOrder(order);
        }
      } catch (err) {}
    };
    getData();
  }, [session?.user?.id]);
  return (
    <div>
      <div className="flex flex-row items-center gap-2">
        <div
          className="border-2 w-fit rounded-full bg-gray-300 p-2 cursor-pointer"
          onClick={() => {
            window.history.back();
          }}
        >
          <Image src={previousPage} width={20} height={20} />
        </div>
        <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
          You searched {queryString}
        </h1>
      </div>
      <OrderCard
        orders={[order]}
        order={order}
        orderIndex={0}
        session={session}
      />
    </div>
  );
};

export default SearchOrderPage;
