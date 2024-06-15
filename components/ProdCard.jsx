/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React from "react";
import Image from "next/image";
import reqInfoIcon from "@public/assets/icons/reqInfoIcon.png";
import defaultProductPhoto from "@public/assets/images/defaultProductPhoto.png";
import cart from "@public/assets/icons/shopping-cart.png";
import { useState } from "react";
import checkMark from "@public/assets/icons/checkmark.png";
import { useSession } from "next-auth/react";
import { headers } from "next/headers";
const ProdCard = ({ products }) => {
  const [added, setAdded] = useState(Array.from({ length: products.length }, () => (false)));
  const { data: session } = useSession();
  const AddToCart = async (e, product) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: {
          id: session.user?.id,
          product
        }
      }) 
  } catch (err) {
      
    }
  }
   return (
    <div className="grid grid-cols-prodCol gap-1 flex-1">
      {products.map((product, index) => (
        <div
          key={product.prodDesc}
          className='flex flex-col border-gray-300 rounded-[5px] border-[1px] text-[.6rem] font-["Arial] items-center py-[5px] h-full justify-between text-center relative'
        >
          <div className="flex flex-col items-center text-wrap w-[90%] text-center max-h-[13rem] min-h-[11rem]">
            <div className="text-wrap text-[2rem]">
              <Image
                src={product.photo ? product.photo : defaultProductPhoto}
                className={``}
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="font-bold text-[.7rem]">{`${product.brand.name}`}</div>
              <div className="text-Green">{product.prodDesc}</div>
            </div>
          </div>
          <div className="flex flex-col items-center mb-[1rem]">
            <div className="font-bold text-[.7rem]">UPC: {product.upc}</div>
            <div className="font-bold text-[.7rem]">
              Price: ${product.price}
            </div>
          </div>
          <div className="flex flex-col items-center w-full gap-[0.2rem]">
            <div>Retail:</div>
            <div className="flex flex-col items-center w-full">
              <div>Case: {`${product.caseVal}`}</div>
              {added[index] && <div className="text-green-500 flex flex-row items-center gap-1 text-[.8rem] absolute top-0 left-0">
                <Image src={checkMark} className="w-[.9rem]"/>
                Added
              </div>}
            </div>
            <div className="border-[1px] border-gray-300 w-full  py-[0.2rem] flex flex-row items-center justify-evenly">
              <a
                href={`/userReqInfo?UPC=${product.upc}&prodDesc=${product.prodDesc}`}
              >
                <Image src={reqInfoIcon} className="w-[2rem]" />
              </a>
              <div className="cursor-pointer" onClick={() => {
                setTimeout(() => {
                  setAdded(() => {
                    const newAdded = [...added];
                    newAdded[index] = false;
                    return newAdded;
                  });
                }, 2000);
                setAdded(() => {
                  const newAdded = [...added];
                  newAdded[index] = true;
                  return newAdded;
                })
                AddToCart(e, product);
              }}>
                <Image src={cart} className="w-[1.5rem]" />
              </div>
              <div className="border-[1px] border-gray-300 text-[.7rem] p-[5px] hover:bg-Purple hover:text-white rounded-[5px] cursor-pointer active:bg-LightPurple duration-300 text-center">
                Buy now
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProdCard;
