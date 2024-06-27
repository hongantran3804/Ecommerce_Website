/* eslint-disable react/no-deprecated */
"use client"
import React, { useEffect, useReducer, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import ProductsDisplay from "./ProductsDisplay";
import { testProducts } from "@utils/utils";
import { useSession } from "next-auth/react";
const HomePage = () => {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [narrowBy, setNarrowBy] = useState([[]])
   useEffect(() => {
     const getBrands = async () => {
       const response = await fetch("http://localhost:3000/api/brands");
       if (response.ok) {
         const { prods, priceRanges } = await response.json();
         setProducts(prods);
         setNarrowBy(() => [[...priceRanges]])
       }
     };
     getBrands();
   }, []);


return (
    <div>
        <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
          All Products
    </h1>
    <ProductsDisplay
      products={products}
      narrowBy={narrowBy}
      setProducts={setProducts}
      userId={session?.user?.id}
    />
      </div>
    
  );
}

export default HomePage