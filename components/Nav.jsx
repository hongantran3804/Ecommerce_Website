/* eslint-disable jsx-a11y/alt-text */
"use client";
import Image from "next/image";
import lacacoLogo from "@public/assets/images/lacacoLogo.png";
import GoogleTranslate from "./GoogleTranslate";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import mapIcon from "@public/assets/icons/mapIcon.png";
import SearchInput from "./SearchInput";
import { useState, useEffect } from "react";
const Nav = () => {
  const { data: session } = useSession();
  const [address, setAddress] = useState(null);
  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/address/getDefault?userId=${session?.user?.id}`
        );
        if (response.ok) {
          const { defaultAddress } = await response.json();
          setAddress(defaultAddress);
        }
      } catch (error) {
      }
    };
    getAddress();
  }, [session?.user?.id]);
  return (
    <section>
      <div>
        <div>
          <div className="flex flex-row  items-center gap-5 justify-between p-5 z-10 ">
            <Link href="/" className="w-[5rem] items-center flex flex-col">
              <Image src={lacacoLogo} className="object-contain" />
            </Link>
            <div className="flex flex-row gap-2 self-end group text-black hover:border-white border-[1px] border-Purple relative px-3 py-1 cursor-pointer group">
              <div className="self-end">
                <Image src={mapIcon} className="w-[1.5rem]" />
              </div>

              <div className="flex flex-col items-start ">
                <span className="text-gray-300 text-[.8rem]">
                  Deliver to {session?.user?.name.split(" ", 1)}
                </span>
                <span className="font-bold text-white">
                  {address ? (
                    `${address.city} ${address.zipcode}`
                  ) : (
                    <div className="text-white">Not Found</div>
                  )}
                </span>
                {address && (
                  <div className="absolute bg-white top-full w-[15rem] z-10 hidden group-hover:flex flex-col items-start p-5 gap-5">
                    <div className="tracking-normal flex flex-col items-start gap-2 border-[1px] border-black p-3">
                      <span>
                        <strong>{session?.user?.name}</strong>{" "}
                        {address.streetAddress}, {address.city} {address.state}{" "}
                        {address.zipcode}
                      </span>

                      <span className="text-gray-500 text-[.9rem]">
                        Default Address
                      </span>
                    </div>

                    <Link
                      href={{
                        pathname: `${process.env.NEXT_PUBLIC_URL}/account/address`,
                        
                      }}
                      className="cursor-pointer font-light font-bodyFont text-[0.8rem] border-[1px] border-Purple px-4 py-3 hover:bg-Purple hover:text-Green duration-300 text-nowrap w-full text-center"
                    >
                      Manage your address
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <SearchInput />
            <GoogleTranslate />
            <div className="w-auto flex flex-col gap-[0.3vh]">
              {!session?.user && (
                <Link href="/login" className="text-[1rem] text-white">
                  <div className="cursor-pointer font-light font-bodyFont text-[0.8rem] border-[1px] border-white px-4 py-3 hover:bg-white hover:text-Purple duration-300">
                    Sign In
                  </div>
                </Link>
              )}

              {session?.user && (
                <div className="flex flex-col justify-between w-full self-end group text-black hover:border-white border-[1px] border-Purple relative px-5 py-1 text-[0.8rem] ">
                  <div className=" flex flex-col items-start text-white  after:relative mr-[0.6rem]">
                    <span className="font-bold">Account</span>
                    <span className="relative after:showAddress font-bold">
                      Hello, {session?.user.name.split(" ", 1)}
                    </span>
                  </div>

                  <div className="absolute top-full bg-white group-hover:flex hidden flex-col items-end p-4 self-end gap-2 z-10 w-fit border-[1px] border-black duration-300 right-0">
                    {session?.user?.image && <div>{session?.user.name}</div>}
                    <Link
                      href={{
                        pathname: `${process.env.NEXT_PUBLIC_URL}/account`,
                      }}
                      className="cursor-pointer font-light font-bodyFont text-[0.8rem] border-[1px] border-Purple px-4 py-3 hover:bg-Purple hover:text-Green duration-300 text-nowrap w-full text-center"
                    >
                      Account
                    </Link>
                    <Link
                      href={{
                        pathname: `${process.env.NEXT_PUBLIC_URL}/userReqInfo`,
                      }}
                      className="cursor-pointer font-light font-bodyFont text-[0.8rem] border-[1px] border-Purple px-4 py-3 hover:bg-Purple hover:text-Green duration-300 text-nowrap w-full text-center"
                    >
                      Contact
                    </Link>
                    <div
                      className="cursor-pointer font-light font-bodyFont text-[0.8rem] border-[1px] border-Purple px-4 py-3 hover:bg-Purple hover:text-Green duration-300 text-nowrap"
                      onClick={async () => {
                        await signOut();
                        window.location.href = "/";
                      }}
                    >
                      Sign Out
                    </div>
                  </div>
                </div>
              )}
            </div>
            {session?.user && (
              <div className="group cursor-pointer">
                <Link href="/shopping-cart">
                  <div className="cursor-pointer font-bold font-bodyFont text-[0.8rem] border-[1px] border-white px-4 py-3 hover:bg-white hover:text-Purple duration-300 ">
                    {/* after:departmentArrow after:z-10 group-hover:after:from-Purple group-hover:after:to-Purple z-10 group-hover:after:block"> */}
                    Shopping Cart
                  </div>
                </Link>
              </div>
            )}
            {session?.user && (
              <div className="group cursor-pointer">
                <Link href="/orders">
                  <div className="cursor-pointer font-bold font-bodyFont text-[0.8rem] border-[1px] border-white px-4 py-3 hover:bg-white hover:text-Purple duration-300 text-wrap flex flex-col items-start">
                    {/* after:departmentArrow after:z-10 group-hover:after:from-Purple group-hover:after:to-Purple z-10 group-hover:after:block"> */}
                    <span>Return </span>
                    <span>& Orders</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nav;
