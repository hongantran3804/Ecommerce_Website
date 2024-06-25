"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import ProductsDisplay from './ProductsDisplay';
import OrderCard from './OrderCard';

const SearchOrderPage = () => {
  const [order, setOrder] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    alert(searchParams.get("queryString"));
    const getData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders/products?queryString=${searchParams.get("queryString")}&userId=${session?.user?.id}`);
        if (response.ok) {
          const { order } = await response.json();
          setOrder(order);
         }
      } catch (err) {}
    }
    getData();
  },[session?.user?.id])
  return (
    <div>
      <OrderCard
        orders={[order]}
        order={order}
        orderIndex={0}
        session={session}
      />
    </div>
  );
}

export default SearchOrderPage