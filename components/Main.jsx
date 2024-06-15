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
const SearchInput = () => {
  return (
    <div
      className="bg-gradient-to-br from-LightPurple from-1% via-Purple to-Purple  w-full text-white border-[1px] 
                border-black pt-[0.4rem] pb-[0.2rem] px-[5px]  flex flex-row gap-[0.4rem] items-start h-full rounded-t-[5px] shadow-navBoxShadow"
    >
      <div className="text-end">Search: </div>
      <form
        className="flex flex-row items-start h-full relative"
        action="/api/searchProdSetup"
      >
        <input
          type="text"
          size="50"
          name="SearchIdSingle"
          id="search"
          className="rounded-[5px] border-none"
        />
        <Image
          src={searchIcon}
          className="w-[2rem] absolute left-[93%] top-[-20%]"
          alt="Search"
        />
      </form>
    </div>
  );
};
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
                <SearchInput />
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
