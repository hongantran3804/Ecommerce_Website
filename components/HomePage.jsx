/* eslint-disable react/no-deprecated */
"use client";
import React, { useEffect, useState } from "react";

import ProductsDisplay from "./ProductsDisplay";
import { useSession } from "next-auth/react";
const HomePage = () => {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [narrowBy, setNarrowBy] = useState([[]]);
  useEffect(() => {
    const getBrands = async () => {
      const response = await fetch(`/api/brands`);
      if (response.ok) {
        const { prods, priceRanges, brands } = await response.json();
        setProducts(prods);
        setNarrowBy(() => [[...priceRanges], [...brands]]);

      }
    };
    getBrands();
  }, []);
  return (
    <div>
      <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
        All Products
      </h1>
      <ProductsDisplay
        products={products}
        narrowBy={narrowBy}
        setProducts={setProducts}
        userId={session?.user?.id}
      />
    </div>
  );
};

export default HomePage;
