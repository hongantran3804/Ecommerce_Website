/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-deprecated */
"use client";
import React, { useEffect, useState } from "react";
import CartSummary from "./CartSummary";
import { useSession } from "next-auth/react";
import previousPage from "@public/assets/icons/previousPage.png";
import Image from "next/image";
import Link from "next/link";
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`/api/cart?userId=${session?.user?.id}`);
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
          Shopping Cart
        </h1>
      </div>

      <CartSummary
        products={products}
        oldQuantity={quantity}
        userId={session?.user?.id}
      />
    </div>
  );
};

export default Cart;
