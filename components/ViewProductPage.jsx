"use client";
/* eslint-disable react/no-deprecated */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ProductsDisplay from "./ProductsDisplay";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
const ViewProductPage = () => {
  const { data: session } = useSession();

  // const searchParams = useSearchParams();
  // const heading = searchParams.get("name");
  // const brandId = searchParams.get("brandId");
  const [heading, setHeading] = useState("");
  const [brandId, setBrandId] = useState("")
  const [products, setProducts] = useState([]);
  const [narrowBy, setNarrowBy] = useState([[]]);
  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.searchParams);
    setHeading(searchParams.get("name"));
    setBrandId(searchParams.get("brandId"));
  },[])
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        `/api/products/${brandId}`,
        { method: "GET" }
      );
      if (response.ok) {
        const { prods, priceRanges } = await response.json();
        console.log(response.status);
        if (prods && priceRanges) {
          setProducts((curr) => prods);
          setNarrowBy([priceRanges]);
        }
      }
    };

    getProducts();
  }, [brandId,heading]);

  return (
    <div>
      <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
        {heading}
      </h1>
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
