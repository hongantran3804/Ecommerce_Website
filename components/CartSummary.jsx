/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { testProducts } from "@utils/utils";
import defaultImg from "@public/assets/images/defaultProductPhoto.png";
import { redirect } from "next/navigation";
import CartShow from "./CartShow";
const CartSummary = ({ products, oldQuantity, userId }) => {
  if (!oldQuantity || !products) return;
  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const checkoutProducts = products.filter((product, index) => {
        if (quantity[index].included && quantity[index].value > 0) {
          return true
        }
      }).map((prod, index) => ({ ...prod, quantity: quantity[index].value }));
      const response = await fetch(
        `http://localhost:3000/api/cart?products=${encodeURIComponent(
          JSON.stringify(checkoutProducts)
        )}&userId=${userId}`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        window.location.href = "/checkout"
      }
    } catch (err) {
      alert(err)
    }
  };

  const filtQuantity = oldQuantity.map((eachVal) => ({
    value: eachVal,
    included: true,
  }));
  const [quantity, setQuantity] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numOfProd, setNumOfProd] = useState(0);

  useEffect(() => {
    setQuantity((curr) => [...curr, ...filtQuantity]);
  }, [products]);
  useEffect(() => {
    let calTotal = 0;
    let calNum = 0;
    quantity.forEach((element, index) => {
      if (element.included) {
        if (products[index]?.price) {
          calTotal += element.value * products[index].price * 100;
          calNum += element.value;
        }
      }
    });
    setTotalPrice(calTotal);
    setNumOfProd(calNum);
  }, [quantity, products]);
  return (
    <section>
      <div>
        <div className="flex flex-row gap-5 items-start">
          <div className="flex flex-col mb-[2rem] flex-1">
            <div className="self-end">Price</div>
            <CartShow
              products={products}
              quantity={quantity}
              setQuantity={setQuantity}
            />
            <div className="self-end font-bold">
              {`Subtotal (${numOfProd} items):`}{" "}
              <span className="font-extrabold">
                ${`${totalPrice / 100 ? totalPrice / 100 : 0}`}
              </span>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center border-[1px] border-gray-300 p-5">
              <div className="self-end font-bold">
                {`Subtotal (${numOfProd} items):`}{" "}
                <span className="font-extrabold">
                  ${`${totalPrice / 100 ? Math.round(totalPrice) / 100 : 0}`}
                </span>
              </div>
              <div
                className=" bg-LightPurple text-[.8rem] p-1 w-full text-center 
                rounded-[5px] font-bold cursor-pointer hover:bg-Purple text-white"
                onClick={handleCheckout}
              >
                Proceed to checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartSummary;
