/* eslint-disable react/no-deprecated */
"use client"
import React, { useEffect } from 'react'
import ReactDOM from "react-dom"
import Main from './Main';
import CartSummary from './CartSummary';
const Cart = () => {
  const products = [];
  
  useEffect(() => {
    const mainview = document.getElementById("mainview");
    // eslint-disable-next-line react-hooks/exhaustive-deps, react/no-deprecated
    ReactDOM.render(
        <CartSummary/>,
      mainview
    );
    const mainViewHeading = document.getElementById("mainViewHeading");
    ReactDOM.render(
        <div>
          <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
            Shopping Cart
          </h1>
        </div>,
      mainViewHeading
    );
  }, []);

  return <Main />;
}

export default Cart