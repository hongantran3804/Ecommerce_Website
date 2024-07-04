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
        const response = await fetch(`/api/brands`, {
          method: "GET",
        });
        if (response.ok) {
          try {
            const { brands } = await response.json();
            setCategories(() => [...brands]);
          } catch (err) {
          }
        }
      };
      getBrands();
    } catch (err) {
    }
  }, []);
  return (
    <div className="group-hover:flex hidden flex-col absolute z-50 border-[1px] border-black  top-full w-full left-0 h-[15rem] overflow-y-scroll">
      {categories.map((category) => (
        <Link
          href={{
            pathname: `/viewProduct`,
            query: {
              brandId: category.id,
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
