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
        const response = await fetch("http://localhost:3000/api/brands", {
          method: "GET",
        });
        if (response.ok) {
          try {
            const { container } = await response.json();
            setCategories(() => [...container]);
          } catch (err) {
            alert(err)
          }
        }
      };
      getBrands();
    } catch (err) {
      aler(err)
    }
    
  }, []);
  return (
    <div className="flex flex-col w-full relative z-10 border-[1px] border-black">
      {categories.map((category) => (
        <Link
          href={{
            pathname: `/viewProduct`,
            query: {
              brandId: category._id,
              name: category.name
            },
          }}
          key={category.name}
          className="relative  group text-Purple z-10"
        >
          <div className="font-bold text-[0.7rem] border-b-[1px] border-b-gray-400 font-bodyFont py-[0.5rem] px-[5px] relative group-hover:text-white  w-full group-hover:bg-Purple ">
            {/* after:departmentArrow after:z-10 group-hover:after:from-Purple group-hover:after:to-Purple z-10 group-hover:after:block"> */}
            {category.name}
          </div>
        </Link>
      ))}
      {session?.user && (
        <div>
          <div className="group cursor-pointer">
            <Link href="/shopping-cart">
              <div className="font-bold text-[0.7rem] border-b-[1px] border-b-gray-400 font-bodyFont py-[0.5rem] px-[5px] relative group-hover:text-white  w-full group-hover:bg-Purple ">
                {/* after:departmentArrow after:z-10 group-hover:after:from-Purple group-hover:after:to-Purple z-10 group-hover:after:block"> */}
                Shopping Cart
              </div>
            </Link>
          </div>
          <div className="group cursor-pointer">
            <Link href="/orders">
              <div className="font-bold text-[0.7rem] border-b-[1px] border-b-gray-400 font-bodyFont py-[0.5rem] px-[5px] relative group-hover:text-white  w-full group-hover:bg-Purple ">
                {/* after:departmentArrow after:z-10 group-hover:after:from-Purple group-hover:after:to-Purple z-10 group-hover:after:block"> */}
                Orders
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;
