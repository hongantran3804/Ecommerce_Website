/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-deprecated */
"use client";
import React, { useEffect, useState } from "react";
import CartSummary from "./CartSummary";
import { useSession } from "next-auth/react";
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const {data: session} = useSession()
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/cart?userId=${session?.user?.id}`
        );
        if (response.ok) {
          const { products, quantity } = await response.json();
          setProducts(products);
          setQuantity((curr) => quantity);
          
        }
      } catch (e) {}
    };
    getProducts();
  }, [session?.user?.id]);


  return (
    <div>
      <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
        Shopping Cart
      </h1>
      <CartSummary
        products={products}
        oldQuantity={quantity}
        userId={session?.user?.id}
      />
    </div>
  );
};

export default Cart;
