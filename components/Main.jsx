/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import searchIcon from "@public/assets/images/searchIcon.png";
import Departments from "./Departments";
import { categories } from "@utils/utils";
import ProductsDisplay from "./ProductsDisplay";
import { testProducts } from "@utils/utils";
import prod6 from "@public/assets/images/prod6.png";
import SearchInput from "./SearchInput";

const Main = () => {
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState(() => [...testProducts]);
  const [narrowBy, setNarrowBy] = useState([[]]);
  
  return (
    <section className="relative">
      <div>
        <div>
          <div>
            <div className='flex flex-row gap-[max(1vw,1rem)] items-start font-["Arial"]'>
              <div className="flex-1  relative">
                
                <div id="mainViewHeading">
                  <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
                  </h1>
                </div>
                <div id="mainview" >
                  <ProductsDisplay
                    prods={products}
                    narrow={narrowBy}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
