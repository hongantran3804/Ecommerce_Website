"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import plus from "@public/assets/icons/plus.png";
import close from "@public/assets/icons/close.png";
import { addressInfo } from "@utils/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
const Address = () => {
  const { data: session } = useSession();
  const [toggleAddressBoard, setToggleAddressBoard] = useState(false);
  const [inputValue, setInputValue] = useState(
    Array.from({ length: addressInfo.length }, () => ({ value: "" }))
  );
  const [userAddress, setUserAddress] = useState([]);
  const [status, setStatus] = useState(true);
  const [addressId, setAddressId] = useState("");
  useEffect(() => {
    const getUserAddress = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/address?userId=${session?.user?.id}`
        );
        if (response.ok) {
          const { addresses } = await response.json();
          setUserAddress(() => addresses);
        }
      } catch (err) {
        alert(err);
      }
    };
    getUserAddress();
  }, [session?.user, inputValue]);

  const AddAddress = async (e) => {
    e.preventDefault();
    if (
      inputValue.filter((input) => input.value === null || input.value === "")
        .length > 0
    )
      return;

    try {
      const response = await fetch("http://localhost:3000/api/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          country: "United States",
          name: inputValue[0].value.trim(),
          phone: inputValue[1].value.trim(),
          streetAddress: inputValue[2].value.trim(),
          city: inputValue[3].value.trim(),
          state: inputValue[4].value.trim(),
          zipcode: inputValue[5].value.trim(),
        }),
      });
      if (response.ok) {
        const { addresses } = await response.json();
        setUserAddress(() => addresses);
        setInputValue(
          Array.from({ length: addressInfo.length }, () => ({ value: "" }))
        );
      }
      
    } catch (err) {
      alert(err);
    }
  };
  const EditAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/address?addressId=${addressId}&data=${encodeURIComponent(
          JSON.stringify(inputValue)
        )}&userId=${session?.user?.id}`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        setInputValue(
          Array.from({ length: addressInfo.length }, () => ({ value: "" }))
        );
      }
    } catch (err) {}
  };
  const setDefault = async (e, id, defaultStatus) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/address?setDefault=${e.target.checked}&addressId=${id}&userId=${session?.user?.id}`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
         setInputValue(
           Array.from({ length: addressInfo.length }, () => ({ value: "" }))
         );
      }
    } catch (err) {
      alert(err);
    }
  };
  const deleteAddress = async (e, addressId) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/address?userId=${session?.user?.id}`,
        {
          method: "DELETE",
          body: JSON.stringify({
            addressId,
          }),
        }
      );
      if (response.ok) {
        // location.reload()
        setInputValue( (curr) => 
          Array.from({ length: addressInfo.length }, () => ({ value: "" }))
        );
      }
    } catch (e) {
      
    }
  }
  return (
    <section className="relative">
      <div>
        {toggleAddressBoard && (
          <div className="absolute bg-white text-[.9rem] flex flex-col items-start gap-1 p-5 border-2 left-[25%]">
            <div
              className="self-end cursor-pointer"
              onClick={() => {
                setToggleAddressBoard(false);
              }}
            >
              <Image src={close} className="w-[2rem]" />
            </div>
            <div className="text-[.9rem] flex flex-col items-start">
              <span className="font-bold">Country/Region</span>
              <span>United States</span>
            </div>
            <form
              className="flex flex-col items-start gap-1"
              onSubmit={(e) => {
                if (status) {
                  AddAddress(e);
                } else {
                  EditAddress(e);
                }
              }}
            >
              {addressInfo.map((address, index) => (
                <div key={addressInfo.label}>
                  <div
                    className={`flex flex-col items-start ${
                      inputValue[index]?.value === null && "border-red-700"
                    }`}
                  >
                    <label htmlFor={address.id} className="font-bold">
                      {address.label}
                    </label>
                    <input
                      id={address.id}
                      type={address.type}
                      size={address.size}
                      name={address.name}
                      value={inputValue[index]?.value}
                      className="border-[1px] border-black px-2 py-1"
                      onChange={(e) => {
                        setInputValue(() => {
                          const newInputValue = [...inputValue];
                          newInputValue[index].value = e.target.value;
                          return newInputValue;
                        });
                      }}
                    />
                    {inputValue[index]?.value === null && (
                      <div className="border-red-700">This info is missing</div>
                    )}
                  </div>
                </div>
              ))}
              <input
                className={`border-[1px] border-black bg-LightPurple active:bg-Purple text-white px-2 py-1 ${
                  inputValue.filter(
                    (input) => input.value === null || input.value === ""
                  ).length > 0
                    ? "opacity-50"
                    : "opacity-100 cursor-pointer"
                } mt-2`}
                type="submit"
                value={`${status ? "Add" : "Edit"}`}
              />
            </form>
          </div>
        )}
        <div className="mt-5 flex flex-col gap-5">
          <div
            className="flex flex-row items-center gap-1 self-end cursor-pointer"
            onClick={(e) => {
              setToggleAddressBoard(true);
              setStatus(true);
            }}
          >
            <Image src={plus} className="w-[1.5rem]" />
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
                    <div className="bg-gray-100 border-[1px] border-gray-200 flex flex-col p-3">
                      <div
                        className="self-end cursor-pointer"
                        onClick={(e) => {
                          deleteAddress(e, eachAddress._id);
                        }}
                      >
                        <Image src={close} className="w-[2rem]" />
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
                                  eachAddress.default
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
                                data: encodeURIComponent(
                                  JSON.stringify([
                                    eachAddress.country,
                                    eachAddress.streetAddress,
                                    eachAddress.city,
                                    eachAddress.state,
                                    eachAddress.zipcode,
                                  ])
                                ),
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
