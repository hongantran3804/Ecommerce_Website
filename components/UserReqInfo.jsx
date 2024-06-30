"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-deprecated */
import React from "react";
import { useEffect, useState } from "react";
import ReqInfoForm from "./ReqInfoForm";
import { prodReqInfo } from "@utils/utils";
const UserReqInfo = () => {
  const [upc, setUpc] = useState(null)
  const [prodDesc, setProdDesc] = useState(null)
  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    setUpc(searchParams.get("UPC"));
    setProdDesc(searchParams.get("prodDesc"));
  },[])
  return (
    <div className="flex flex-col items-center w-full py-5">
      <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
        {prodDesc}
      </h1>
      <ReqInfoForm UPC={upc} prodDesc={prodDesc} list={prodReqInfo} />
    </div>
  );
};

export default UserReqInfo;
