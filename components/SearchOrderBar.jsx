"use client";
import React, { useState } from "react";

const SearchOrderBar = () => {
  const [search, setSearch] = useState("");
  const SearchProduct = async (e) => {
    e.preventDefault();
    window.location.href = `/orders/searchOrder?queryString=${search}`;
  };
  return (
    <form className="flex flex-row items-center gap-3">
      <input
        type="text"
        name="queryString"
        placeholder="Search all orders"
        size="45"
        value={search}
        className="border-[1px] border-black rounded-[5px] p-1 text-[.9rem]"
        spellCheck="false"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div
        className="bg-black text-white font-bold w-fit px-5 py-1 rounded-[20px] text-[.9rem] cursor-pointer"
        onClick={SearchProduct}
      >
        Search Orders
      </div>
    </form>
  );
};

export default SearchOrderBar;
