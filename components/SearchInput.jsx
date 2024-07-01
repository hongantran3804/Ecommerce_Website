"use client";
import React, {  useState } from "react";
import searchIcon from "@public/assets/images/searchIcon.png";
import Image from "next/image";
import Departments from "./Departments";
import Link from "next/link";
const SearchInput = () => {
  const [search, setSearch] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    window.location.href = `/viewProduct/searchProd?queryString=${search}`;
  }
  return (
    <div className="flex flex-row items-center w-[40%] gap-2">
      {/* <div className="text-end text-[1.5rem]">Search: </div> */}

      <form
        className="flex flex-row items-center h-[3rem] relative flex-1"
        onSubmit={handleSubmit}
      >
        <div id="departmentView" className="relative h-full w-[30%] group z-20">
          <Link href="/">
            <div className="border-[1px] border-white rounded-l-[5px] text-nowrap h-full p-2 peer cursor-pointer">
              <span className="after:showAddress relative text-[.9rem]">
                All Brands
              </span>
            </div>
          </Link>
          <Departments />
        </div>
        <div className="w-full h-full">
          <input
            type="text"
            name="SearchIdSingle"
            id="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className=" border-none pl-2 text-black w-full h-full "
          />
        </div>

        <div
          onClick={handleSubmit}
          className="bg-yellow-400 rounded-r-[5px] relative h-full p-2"
        >
          <Image src={searchIcon} alt="Search absolute" className="" />
        </div>
      </form>
    </div>
  );
};
export default SearchInput;
