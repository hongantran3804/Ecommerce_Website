"use client";
import ViewProductPage from "@components/ViewProductPage";
import React from "react";

/* eslint-disable react/no-deprecated */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ProductsDisplay from "@components/ProductsDisplay";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
const page = () => {
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const heading = searchParams.get("name");
  const brandId = searchParams.get("brandId");
  const [products, setProducts] = useState([]);
  const [narrowBy, setNarrowBy] = useState([[]]);
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(`/api/products/${brandId}`, {
        method: "GET",
      });
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
  }, [brandId]);

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

export default page;
