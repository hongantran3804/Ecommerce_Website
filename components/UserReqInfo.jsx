"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-deprecated */
import React from "react";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import ReactDOM from "react-dom";
import ProductLandingRender from "./ProductLandingRender";
import ReqInfoForm from "./ReqInfoForm";
import { prodReqInfo } from "@utils/utils";
import Main from "./Main";
const UserReqInfo = () => {
  return (
    <div>
      <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
        {prodDesc}
      </h1>
      <ReqInfoForm UPC={upc} prodDesc={prodDesc} list={prodReqInfo} />
    </div>
  );
};

export default UserReqInfo;
