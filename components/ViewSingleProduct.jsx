"use client";
import Image from "next/image";
import reqInfoIcon from "@public/assets/icons/reqInfoIcon.png";
import React, { useEffect, useState } from "react";
import defaultImg from "@public/assets/images/defaultProductPhoto.png";
import cart from "@public/assets/icons/shopping-cart.png";
import Link from "next/link";
import { useSession } from "next-auth/react";
import checkMark from "@public/assets/icons/checkmark.png";
const ViewSingleProduct = () => {
  const { data: session } = useSession();
  const [product, setProduct] = useState();
  const [added, setAdded] = useState(Array.from({ length: 1 }, () => false));
  const [quantity, setQuantity] = useState([]);
  useEffect(() => {
    setQuantity(Array.from({ length: 1 }, () => 1));
  }, [product]);

  const AddToCart = async (e, product, userId, quantityVal) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          product: { ...product, quantity: quantityVal },
        }),
      });
    } catch (err) {}
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const getProduct = async () => {
      const response = await fetch(`/api/products/singleProduct?productId=${searchParams.get("productId")}`,
      
      {method: "GET"});
      if (response.ok) {
        const { product } = await response.json();
        setProduct(product);
      }
    };
    getProduct();
  }, []);
  return (
    <section className=" px-[20rem] py-[5rem]">
      <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px] w-full '>
        {product?.prodDesc}
      </h1>
      <div className="border-2 flex flex-row justify-between  w-full p-5">
        <div className="flex flex-row h-full gap-2 items-start">
          <div>
            <Image
              src={
                product?.photo
                  ? process.env.NEXT_PUBLIC_DOMAIN_PHOTO + product?.photo
                  : defaultImg
              }
              width={100}
              height={100}
              className=""
              alt=""
            />
          </div>
          <div className="flex flex-col items-start font-bold h-full ">
            <div className="flex flex-col items-start">
              <span>{product?.prodDesc}</span>
              <span>{product?.brand.name}</span>
              <span>{product?.upc}</span>
            </div>

            {session?.user && (
              <div className="flex flex-row items-center gap-2 mt-5">
                {added[0] && (
                  <div className="text-green-500 flex flex-row items-center gap-1 text-[.8rem]">
                    <Image src={checkMark} className="w-[.9rem]" alt="" />
                  </div>
                )}
                <div className="cursor-pointer group relative inline-block">
                  <Image
                    alt=""
                    src={cart}
                    className="w-[1.5rem]"
                    onClick={(e) => {
                      if (added[0]) {
                        setAdded(() => {
                          const newAdded = [...added];
                          newAdded[0] = false;
                          return newAdded;
                        });
                        setTimeout(() => {
                          setAdded(() => {
                            const newAdded = [...added];
                            newAdded[0] = true;
                            return newAdded;
                          });
                        }, 500);
                      } else {
                        setAdded(() => {
                          const newAdded = [...added];
                          newAdded[0] = true;
                          return newAdded;
                        });
                      }

                      AddToCart(e, product, session?.user.id, quantity[0]);
                    }}
                  />
                </div>
                <div
                  className="border-[1px] border-gray-300 text-[.7rem] p-[5px] hover:bg-Purple hover:text-white rounded-[5px] cursor-pointer active:bg-LightPurple duration-300 text-center inline-block"
                  onClick={(e) => {
                    AddToCart(e, product, session?.user.id, quantity[0]);
                    window.location.href = "/checkout";
                  }}
                >
                  Buy now
                </div>
              </div>
            )}
          </div>
        </div>
        <Link
          href={{
            pathname: `/userReqInfo`,
            query: {
              UPC: product?.upc,
              prodDesc: product?.prodDesc,
            },
          }}
        >
          <Image src={reqInfoIcon} className="w-[2rem]" alt="" />
        </Link>
      </div>
    </section>
  );
};

export default ViewSingleProduct;
