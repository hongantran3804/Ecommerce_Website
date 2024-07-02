"use client";
/* eslint-disable react/no-deprecated */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ProductsDisplay from "./ProductsDisplay";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import previousPage from "@public/assets/icons/previousPage.png";
import Image from "next/image";
import Link from "next/link";
const ViewProductPage = () => {
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const heading = searchParams.get("name");
  const brandId = searchParams.get("brandId");
  const [products, setProducts] = useState([]);
  const [narrowBy, setNarrowBy] = useState([[]]);
  // const [heading, setHeading] = useState(searchParams.get("name"));
  // const [brandId, setBrandId] = useState(searchParams.get("brandId"));
  // useEffect(() => {
  //   //const searchParams = new URLSearchParams(document.location.searchParams);
  //   setHeading(searchParams.get("name"));
  //   setBrandId(searchParams.get("brandId"));
  // },[])
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        `/api/products/${searchParams.get("brandId")}`,
        { method: "GET" }
      );
      if (response.ok) {
        const { prods, priceRanges } = await response.json();
        if (prods && priceRanges) {
          setProducts(prods);
          setNarrowBy([priceRanges]);
        }
      }
    };

    getProducts();
  }, [brandId]);

  return (
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
          {heading}
        </h1>
      </div>

      <ProductsDisplay
        products={products}
        narrowBy={narrowBy}
        setProducts={setProducts}
        userId={session?.user?.id}
        session={session}
      />
    </div>
  );
};

export default ViewProductPage;
