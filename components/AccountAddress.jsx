"use client"
import React, { useEffect, useState } from 'react'
import addAddressIcon from "@public/assets/icons/addAddressIcon.png"
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { addressInfo } from "@utils/utils";
import ModifyAddressForm from './ModifyAddressForm';
import AddressCard from './AddressCard';
const AccountAddress = () => {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/address`, {
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
      });
      if (response.ok) {
        setInputValue(
          Array.from({ length: addressInfo.length }, () => ({ value: "" }))
        );
      }
    } catch (err) {}
  };
  return (
    <section className="relative">
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
      <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
        Your Addresses
      </h1>
      <div className="flex flex-row flex-wrap gap-5">
        <div>
          <div
            className="border-2 border-dashed flex flex-col items-center justify-center w-[20rem] h-[20rem] rounded-[10px] cursor-pointer"
            onClick={() => {
              setToggleAddressBoard(true);
              setStatus(true);
            }}
          >
            <Image src={addAddressIcon} alt="" />
            <span className="text-[1.5rem] font-bold">Add Address</span>
          </div>
        </div>
        {userAddress &&
          userAddress.map((eachAddress) => (
            <div key={eachAddress.streetName}>
              <AddressCard
                address={eachAddress}
                session={session}
                setStatus={setStatus}
                setToggleAddressBoard={setToggleAddressBoard}
                setAddressId={setAddressId}
                setInputValue={setInputValue}
              />
            </div>
          ))}
      </div>
    </section>
  );
}

export default AccountAddress