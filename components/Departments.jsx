"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Departments = () => {
  const { data: session } = useSession();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    try {
      const getBrands = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/brands`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          try {
            const { container } = await response.json();
            setCategories(() => [...container]);
          } catch (err) {
          }
        }
      };
      getBrands();
    } catch (err) {
      aler(err)
    }
    
  }, []);
  return (
    <div className="group-hover:flex hidden flex-col absolute z-50 border-[1px] border-black  top-full w-full left-0 h-[15rem] overflow-y-scroll">
      {categories.map((category) => (
        <Link
          href={{
            pathname: `${process.env.NEXT_PUBLIC_URL}/viewProduct`,
            query: {
              brandId: category._id,
              name: category.name,
            },
          }}
          key={category.name}
          className="relative  group text-Purple z-20"
        >
          <div className="font-bold text-[0.7rem] border-b-[1px] border-b-gray-400 font-bodyFont py-[0.5rem] px-[5px] relative hover:text-white  w-full hover:bg-Purple bg-white">
            {/* after:departmentArrow after:z-10 group-hover:after:from-Purple group-hover:after:to-Purple z-10 group-hover:after:block"> */}
            {category.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Departments;
