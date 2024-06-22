/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import reqInfoIcon from "@public/assets/icons/reqInfoIcon.png";
import defaultProductPhoto from "@public/assets/images/defaultProductPhoto.png";
import cart from "@public/assets/icons/shopping-cart.png";
import { useState } from "react";
import checkMark from "@public/assets/icons/checkmark.png";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
const ProdCard = ({ products, userId }) => {
  const now = dayjs();
  const [added, setAdded] = useState(Array.from({ length: products.length }, () => (false)));
  const [quantity, setQuantity] = useState(
    []);
  useEffect(() => {
    setQuantity(Array.from({ length: products.length }, () => (1)))
  }, [products])
  
  const AddToCart = async (e, product,userId, quantityVal) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          id: userId,
          product: {...product, quantity: quantityVal}
        })
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
           <div className="flex flex-col items-center text-wrap w-[90%] text-center max-h-[13rem] min-h-[9rem]">
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
               Case Price: $
               {product.casePrice}
             </div>
           </div>
           <div className="flex flex-col items-center w-full gap-[0.2rem]">
             <div className="flex flex-col items-center w-full">
               <div>Case: {`${product.unitPerCase}`}</div>
               <div>
                 <div
                   className=" p-1   bg-white border-[1px] border-gray-200 gap-1
               bottom-[100%] left-[-100%] flex flex-row items-center "
                 >
                   <div className="flex flex-row items-center gap-2">
                     <span>Case Quantity:</span>
                     <input
                       type="number"
                       name="quantity"
                       defaultValue={quantity[index]}
                       className="border-[1px] border-black pl-1 w-[2rem]"
                       min="1"
                       onChange={(e) => {
                         setQuantity(() => {
                           const newQuantity = [...quantity];
                           if (parseInt(e.target.value) !== NaN) {
                             newQuantity[index] = parseInt(e.target.value);
                           }
                           return newQuantity;
                         });
                       }}
                     />
                   </div>

                   {added[index] && (
                     <div className="text-green-500 flex flex-row items-center gap-1 text-[.8rem]">
                       <Image src={checkMark} className="w-[.9rem]" />
                     </div>
                   )}
                 </div>
               </div>
             </div>
             <div className="border-[1px] border-gray-300 w-full  py-[0.2rem] flex flex-row items-center justify-evenly relative">
               <a
                 href={`/userReqInfo?UPC=${product.upc}&prodDesc=${product.prodDesc}`}
               >
                 <Image src={reqInfoIcon} className="w-[2rem]" />
               </a>
               <div className="cursor-pointer group relative">
                 <Image
                   src={cart}
                   className="w-[1.5rem]"
                   onClick={(e) => {
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
                     });
                     AddToCart(e, product, userId, quantity[index]);
                   }}
                 />
               </div>
               <div
                 className="border-[1px] border-gray-300 text-[.7rem] p-[5px] hover:bg-Purple hover:text-white rounded-[5px] cursor-pointer active:bg-LightPurple duration-300 text-center "
                 onClick={(e) => {
                   AddToCart(e, product, userId, quantity[index]);
                   window.location.href = "/checkout";
                 }}
               >
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
