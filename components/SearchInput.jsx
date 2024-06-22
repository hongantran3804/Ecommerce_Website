"use client";
import React, { useEffect, useState } from "react";
import searchIcon from "@public/assets/images/searchIcon.png";
import Image from "next/image";
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
export default SearchInput;
