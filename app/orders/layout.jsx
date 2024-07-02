"use client"
import SearchOrderBar from '@components/SearchOrderBar';
import React from 'react'
import previousPage from "@public/assets/icons/previousPage.png";
import Image from "next/image";
import Link from "next/link";
const layout = ({children}) => {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="flex flex-row items-center gap-2">
          <div
            className="border-2 w-fit rounded-full bg-gray-300 p-2 cursor-pointer"
            onClick={() => {
              window.history.back();
            }}
          >
            <Image src={previousPage} width={20} height={20} />
          </div>
          <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
            Your Orders
          </h1>
        </div>
      </div>
      <SearchOrderBar />
      {children}
    </div>
  );
}

export default layout