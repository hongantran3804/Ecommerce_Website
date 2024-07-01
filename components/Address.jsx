"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import plus from "@public/assets/icons/plus.png";
import close from "@public/assets/icons/close.png";
import { addressInfo } from "@utils/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ModifyAddressForm from "./ModifyAddressForm";
const Address = () => {
  const { data: session } = useSession();
  const [toggleAddressBoard, setToggleAddressBoard] = useState(false);
  const [inputValue, setInputValue] = useState(
    Array.from({ length: addressInfo.length }, () => ({ value: "" }))
  );
  const [userAddress, setUserAddress] = useState([]);
  const [status, setStatus] = useState(true);
  const [addressId, setAddressId] = useState("");
  const [defaultStatus, setDefaultStatus] = useState(false);
  useEffect(() => {
    const getUserAddress = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/address?userId=${session?.user?.id}`
        );
        if (response.ok) {
          const { addresses } = await response.json();
          setUserAddress(() => addresses);
        }
      } catch (err) {
      }
    };
    getUserAddress();
  }, [session?.user, inputValue]);

  const EditAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/address`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            addressId: addressId,
            data: inputValue,
            userId: session?.user?.id,
            defaultStatus: defaultStatus,
          }),
        }
      );
      if (response.ok) {
        setInputValue(
          Array.from({ length: addressInfo.length }, () => ({ value: "" }))
        );
      }
    } catch (err) {}
  };
  const setDefault = async (e, id, defaultValue) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/address/setDefault`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: session?.user.id,
            addressId: id,
            defaultStatus: defaultValue,
          }),
        }
      );
      if (response.ok) {
        setInputValue(
          Array.from({ length: addressInfo.length }, () => ({ value: "" }))
        );
      }
    } catch (err) {
    }
  };
  const deleteAddress = async (e, addressId) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/address?userId=${session?.user?.id}`,
        {
          method: "DELETE",
          body: JSON.stringify({
            addressId,
          }),
        }
      );
      if (response.ok) {
        // location.reload()
        setInputValue((curr) =>
          Array.from({ length: addressInfo.length }, () => ({ value: "" }))
        );
      }
    } catch (e) {}
  };
  return (
    <section className="relative">
      <div>
        {toggleAddressBoard && (
          <ModifyAddressForm
            userAddres={userAddress}
            status={status}
            session={session}
            inputValue={inputValue}
            setInputValue={setInputValue}
            setToggleAddressBoard={setToggleAddressBoard}
            EditAddress={EditAddress}
            setDefaultStatus={setDefaultStatus}
            defaultStatus={defaultStatus}
          />
        )}
        <div className="mt-5 flex flex-col gap-5">
          <div
            className="flex flex-row items-center gap-1 self-end cursor-pointer"
            onClick={(e) => {
              setToggleAddressBoard(true);
              setStatus(true);
            }}
          >
            <Image src={plus} className="w-[1.5rem]" alt="" />
            <span>Add Address</span>
          </div>
          <div className="">
            <div className="bg-Purple text-white p-2 text-[1.2rem]">
              <span>Shipping Address</span>
            </div>
            {userAddress?.length > 0 ? (
              <div key={userAddress.zipcode} className="">
                <div>
                  {userAddress.map((eachAddress) => (
                    <div
                      className="bg-gray-100 border-[1px] border-gray-200 flex flex-col p-3"
                      key={eachAddress._id}
                    >
                      <div
                        className="self-end cursor-pointer"
                        onClick={(e) => {
                          deleteAddress(e, eachAddress._id);
                        }}
                      >
                        <Image src={close} className="w-[2rem]" alt="" />
                      </div>
                      <div
                        key={eachAddress}
                        className=" flex flex-row justify-between  items-center  "
                      >
                        <div>
                          <div>{eachAddress.country}</div>
                          <div>{eachAddress.streetAddress}</div>
                          <div>
                            {eachAddress.city}, {eachAddress.state}{" "}
                            {eachAddress.zipcode}{" "}
                          </div>
                        </div>

                        <div className="flex flex-row items-center gap-3">
                          <span
                            className="underline text-blue-600 cursor-pointer"
                            onClick={(e) => {
                              setAddressId((curr) => eachAddress._id);
                              setStatus(false);
                              setInputValue(() => [
                                { value: eachAddress.name },
                                { value: eachAddress.phone },
                                { value: eachAddress.streetAddress },
                                { value: eachAddress.city },
                                { value: eachAddress.state },
                                { value: eachAddress.zipcode },
                              ]);
                              setToggleAddressBoard(true);
                            }}
                          >
                            Edit Address
                          </span>
                          <div className="flex flex-row items-center gap-1">
                            <input
                              type="checkbox"
                              id="setDefault"
                              onChange={(e) => {
                                setDefault(
                                  e,
                                  eachAddress._id,
                                  e.target.checked
                                );
                              }}
                              checked={eachAddress.default}
                              className={`cursor-pointer`}
                            />
                            <label htmlFor="setDefault">Set as Default</label>
                          </div>
                        </div>
                        <div className="border-[1px] px-2 py-1 text-white bg-LightPurple active:bg-Purple cursor-pointer rounded-[5px]">
                          <Link
                            href={{
                              pathname: "/checkout/review",
                              query: {
                                data: eachAddress._id,
                              },
                            }}
                          >
                            Deliver Here
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="font-bold">No address found</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Address;
