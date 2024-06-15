/* eslint-disable jsx-a11y/alt-text */
"use client";
import Image from "next/image";
import ReactDOM from "react-dom";
import lacacoLogo from "@public/assets/images/lacacoLogo.png";
import GoogleTranslate from "./GoogleTranslate";
import { shoppingTools } from "@utils/utils";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
const Nav = () => {
  const { data: session } = useSession();
  return (
    <section>
      <div>
        <div>
          <div className="flex flex-row  items-end gap-5">
            <Link href="/" className="w-[max(15%,10rem)]">
              <Image src={lacacoLogo} className="object-contain" />
            </Link>
            <div className="flex-1 flex-col flex items-end w-auto gap-[1vh]">
              <div className="w-auto flex flex-col items-end gap-[0.3vh]">
                <div className="text-Purple cursor-pointer font-bold font-bodyFont text-[0.8rem] ">
                  <Link href="/login" className="underline hover:text-red-800">
                    Login
                  </Link>
                  <span> | </span>
                  <Link href="/signup" className="underline hover:text-red-800">
                    Become a Customer?
                  </Link>
                </div>
                <GoogleTranslate />
                {session?.user && (
                  <div className="flex flex-row justify-between w-full">
                    <div>{session?.user.name}</div>
                    <div
                      className="border-[1px] bg-[#fafafa] px-[0.5rem] cursor-pointer hover:bg-gray-200"
                      onClick={signOut}
                    >
                      Sign Out
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-row bg-Green text-white font-bold rounded-md w-full  text-[0.8rem] font-bodyFont px-[0.8rem] justify-between h-full items-center">
                <div className="flex flex-row gap-[1rem] h-full w-auto  items-center ">
                  <div className="h-full py-[0.2rem] dropdown-container">
                    <div className="group hover:text-Purple relative h-auto flex gap-0">
                      Shopping Tools
                      <div className="w-auto absolute group-hover:block hidden left-0 top-full z-50">
                        <ul className="dropdown absolute block  bg-white text-Green w-[15rem] border-[1px] border-black py-[0.2rem] px-[0.3rem]">
                          <li className="hover:text-Purple block">
                            Search Products
                          </li>
                          <li className="hover:text-Purple block">
                            Cosmetic Parts Order Form
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="group-hover:text-Purple ">
                      Marketing Info
                    </div>
                    <ul className="absolute hidden group-hover:flex flex-col border-[1px] text-Green border-black bg-white px-[0.5rem] py-[0.3rem] w-[15rem] cursor-pointer z-50">
                      <li className="hover:text-Purple">
                        Click to View Category
                      </li>
                      <li className="hover:text-Purple">Reviews</li>
                      <li className="hover:text-Purple">
                        ASOTV Cross-Merchandising
                      </li>
                      <li className="hover:text-Purple">ASOTV Kitchen Items</li>
                    </ul>
                  </div>
                </div>
                <div className="group relative w-auto" dir="rtl">
                  <div className="group-hover:text-Purple">Contact</div>
                  <ul
                    className="absolute hidden group-hover:flex flex-col border-[1px] text-Green border-black bg-white px-[0.5rem] py-[0.3rem] w-[10rem] cursor-pointer items-start z-50"
                    dir="rtl"
                  >
                    <li className="hover:text-Purple text-start w-full">
                      Independent Drug & Supermarket
                    </li>
                    <li className="hover:text-Purple text-start w-full">
                      National & Regional Chains
                    </li>
                    <li className="hover:text-Purple text-start w-full">
                      General Information
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nav;
