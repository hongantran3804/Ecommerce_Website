"use client";
import React, { useEffect, useState } from "react";
import searchIcon from "@public/assets/images/searchIcon.png";
import Image from "next/image";
const SearchInput = () => {
  const [search, setSearch] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    window.location.href = `/viewProduct/searchProd?queryString=${search}`;
  }
  return (
    <div
      className="bg-gradient-to-br from-LightPurple from-1% via-Purple to-Purple  w-full text-white border-[1px] 
                border-black pt-[0.4rem] pb-[0.2rem] px-[5px]  flex flex-row gap-[0.4rem] items-start h-full rounded-t-[5px] shadow-navBoxShadow"
    >
      <div className="text-end">Search: </div>
      <form
        className="flex flex-row items-start h-full relative"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          size="50"
          name="SearchIdSingle"
          id="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          className="rounded-[5px] border-none pl-2 text-black"
        />
        <div onClick={handleSubmit}>
          <Image
          src={searchIcon}
          className="w-[2rem] absolute left-[93%] top-[-20%]"
          alt="Search"
        />
        </div>
        
      </form>
    </div>
  );
};
export default SearchInput;
