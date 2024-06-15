/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-deprecated */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import ReactDOM from "react-dom";
import Main from "./Main";
import { env } from "@utils/utils";
import Departments from "./Departments";
import { categories } from "@utils/utils";
import Image from "next/image";
import featureProdImage from "@public/assets/images/featureProd.png"
import ProdCard from "./ProdCard";
import { testProducts } from "@utils/utils";

export default async function ProductLandingRender() {

  return (
    <ProdCard products={prods ? prods : testProducts}/>
  )
};
