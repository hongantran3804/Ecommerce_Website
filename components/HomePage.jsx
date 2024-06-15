/* eslint-disable react/no-deprecated */
"use client"
import React, { useEffect, useReducer, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import ProductsDisplay from "./ProductsDisplay";
import { testProducts } from "@utils/utils";
const HomePage = () => {
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
  useEffect(() => {
    const mainview = document.getElementById("mainview");
    // eslint-disable-next-line react-hooks/exhaustive-deps, react/no-deprecated
    ReactDOM.render(
      <React.StrictMode>
        <ProductsDisplay
          products={products}
          narrowBy={narrowBy}
          setProducts={setProducts}
        />
      </React.StrictMode>,
      mainview
    );
    const mainViewHeading = document.getElementById("mainViewHeading");
    ReactDOM.render(
      <div>
        <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
          All Products
        </h1>
      </div>,
      mainViewHeading
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, narrowBy]);

  return <Main />;
}

export default HomePage