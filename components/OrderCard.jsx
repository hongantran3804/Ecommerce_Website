"use client"
import React, { useEffect, useState } from "react";
import checkmark from "@public/assets/icons/checkmark.png";
import Image from "next/image";
import defaultImg from "@public/assets/images/defaultProductPhoto.png";
const OrderCard = ({ orders, order, orderIndex,session }) => {
  const [buyAgainStatus, setBuyAgainStatus] = useState([]);
  useEffect(() => {
    if (orders) {
      setBuyAgainStatus(() =>
        orders.map((order) => Array.from({ length: order.length }, () => false))
      );
    }
    
  }, []);
  const buyAgain = async (e, product) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: session.user.id,
          product: product,
        }),
      });
    } catch (err) {
    }
  };
  return (
    <div className="flex flex-col gap-5">
      {order.products?.map((product, productIndex) => (
        <div
          className="flex flex-row items-start text-[.9rem] justify-between font-bold"
          key={product._id}
        >
          <div className="flex flex-row items-start gap-5 h-full">
            <div>
              <Image
                src={
                  product?.photo
                    ? process.env.NEXT_PUBLIC_DOMAIN_PHOTO + product?.photo
                    : defaultImg
                }
                width={100}
                height={100}
                alt=""
              />
            </div>
            <div className="flex flex-col items-start justify-between gap-3 ">
              <span>{product.prodDesc}</span>
              <span>{product.brand.name}</span>
              <span>${product.casePrice}</span>
              <span>Quantity: {product.quantity}</span>
              <div
                className="px-2 py-1 border-[1px] rounded-[5px] bg-LightPurple active:bg-Purple cursor-pointer text-white shadow-buttonShadow"
                onClick={(e) => {
                  setBuyAgainStatus(() => {
                    const newBuyAgainStatus = [...buyAgainStatus];
                    newBuyAgainStatus[orderIndex][productIndex] = true;
                    return newBuyAgainStatus;
                  });
                  buyAgain(e, product);
                }}
              >
                {buyAgainStatus[orderIndex] &&
                buyAgainStatus[orderIndex][productIndex] ? (
                  <Image src={checkmark} className="w-[1rem]" alt="" />
                ) : (
                  "Buy it again"
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;
