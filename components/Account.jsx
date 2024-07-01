"use client";
import React from "react";
import { accountPages } from "@utils/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import adminIcon from "@public/assets/icons/adminIcon.png"
const Account = () => {
  const { data: session } = useSession();
  return (
    <section>
      <div>
        <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
          Your Account
        </h1>
        <div className="flex flex-row items-start gap-2">
          {accountPages.map((accountPage, index) => (
            <Link
              href={{
                pathname:
                  index === 1
                    ? session?.user.image
                      ? `/account/profile`
                      : accountPage.url
                    : accountPage.url,
              }}
              key={accountPage.url}
              className="hover:bg-gray-200"
            >
              <div className="flex flex-row border-[1px] border-gray-200 w-fit p-5 gap-2 items-start rounded-[10px]">
                <div className="">
                  <Image
                    src={accountPage.img}
                    className="object-contain w-[3rem]"
                    alt=""
                  />
                </div>
                <div className="flex flex-col w-[12rem]">
                  <span className="text-[1.2rem]">{accountPage.name}</span>
                  <span className="text-[.9rem]">{accountPage.desc}</span>
                </div>
              </div>
            </Link>
          ))}
          {session?.user.isAdmin && (
            <Link
              href={{
                pathname: "/admin",
              }}
              key="admin"
              className="hover:bg-gray-200"
            >
              <div className="flex flex-row border-[1px] border-gray-200 w-fit p-5 gap-2 items-start rounded-[10px]">
                <div className="">
                  <Image
                    src={adminIcon}
                    className="object-contain w-[3rem]"
                    alt=""
                  />
                </div>
                <div className="flex flex-col w-[12rem]">
                  <span className="text-[1.2rem]">Admin</span>
                  <span className="text-[.9rem]">This page is private</span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Account;
