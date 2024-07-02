"use client";
import React, { useEffect, useState} from "react";
import { useSession } from "next-auth/react";
import ProductsDisplay from "./ProductsDisplay";
import previousPage from "@public/assets/icons/previousPage.png";
import Image from "next/image";
import Link from "next/link";
const SearchProduct = () => {
  const [products, setProducts] = useState([])
  const [narrowBy, setNarrowBy] = useState([])
  const [queryString, setQueryString] = useState(null)
  const {data: session} = useSession()
  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    setQueryString(searchParams.get("queryString"));
    const getData = async () => {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_URL
        }/api/products?queryString=${searchParams.get("queryString")}`
      );
      if (response.ok) {
        const { prods, priceRanges } = await response.json();
        setProducts(prods);
        setNarrowBy([priceRanges]);
      }
    }
    getData();
  },[session?.user?.id]);
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
          You searched {queryString}
        </h1>
      </div>

      <ProductsDisplay
        products={products}
        narrowBy={narrowBy}
        setProducts={setProducts}
        userId={session?.user?.id}
      />
    </div>
  );
};

export default SearchProduct;
