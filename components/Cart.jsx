/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-deprecated */
"use client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import CartSummary from "./CartSummary";
import { useSession } from "next-auth/react";
const Cart = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const {data: session} = useSession()
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cart");
        if (response.ok) {
          const { products, quantity } = await response.json();
          setProducts(products);
          setQuantity((curr) => quantity);
        }
      } catch (e) {}
    };
    getProducts();
  }, []);
  useEffect(() => {
    const mainview = document.getElementById("mainview");
    // eslint-disable-next-line react-hooks/exhaustive-deps, react/no-deprecated
    ReactDOM.render(<CartSummary products={products} oldQuantity={quantity} userId={session?.user?.id}/>, mainview);
    const mainViewHeading = document.getElementById("mainViewHeading");
    ReactDOM.render(
      <div>
        <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
          Shopping Cart
        </h1>
      </div>,
      mainViewHeading
    );
  }, [products, quantity]);

  return <Main />;
};

export default Cart;
