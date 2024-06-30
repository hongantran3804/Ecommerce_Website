/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-deprecated */
"use client";
import React, { useEffect, useState } from "react";
import { dbInfo } from "@utils/utils";
const UpdateDataBaseForm = () => {
  const updateDataBase = async (e) => {
    e.preventDefault();
    const [photoName,brand, prodDesc, upc, unitPrice, unitPerCase, numInStock] = inputs;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            photo: photoName.value,
            brand: brand.value,
            prodDesc: prodDesc.value,
            upc: upc.value,
            unitPrice: unitPrice.value,
            unitPerCase: unitPerCase.value,
            numInStock: numInStock.value,
          }),
        }
      );
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
        setInputs(() =>
          Array.from({ length: dbInfo.length }, () => ({ value: "" }))
        );
          setCanUpdate(false);
          setSuccess(false);
        }, 1000);
      }
    } catch (error) {
    }
  };
  const [success, setSuccess] = useState(false);
  const [inputs, setInputs] = useState(
    Array.from({ length: dbInfo.length }, () => ({ value: "" }))
  );
  const [canUpdate, setCanUpdate] = useState(false);
  useEffect(() => {
    const found = inputs.find(({ value }) => value === "");
    if (!found) setCanUpdate(true);
  }, [inputs]);

  return (
    <div className="">
      <form className="flex flex-col gap-[5px]" onSubmit={updateDataBase}>
        {dbInfo.map((eachInput, index) => (
          <div
            className="flex flex-row gap-[1rem] text-[1rem] items-center text-white"
            key={eachInput.id}
          >
            <label
              htmlFor={eachInput.id}
              className="w-[8rem] h-auto text-Purple font-bold text-[0.8rem] font-['Trebuchet MS']"
              dir="rtl"
            >
              {eachInput.label}
            </label>

            <input
              className={`bg-mediumPurple  focus:border-black border-black 
                  rounded-[5px]  px-[0.3rem] text-[0.9rem] `}
              id={eachInput.id}
              value={inputs[index].value}
              type={eachInput.type}
              name={eachInput.name}
              size={eachInput.size}
              title={eachInput.title}
              onChange={(e) => {
                setInputs(() => {
                  const newInputs = [...inputs];
                  newInputs[index].value = e.target.value;
                  return newInputs;
                });
              }}
            />
            {eachInput.name === "password" && (
              <div className="text-[0.8rem]">(4 characters or longer)</div>
            )}
          </div>
        ))}
        {success && <div className="ml-[9rem] text-green-500">Success!</div>}
        <input
          className={`text-mediumPurple text-[.7rem] font-bold ml-[9rem] border-[1px] w-fit 
                rounded-[5px] px-[0.7rem] py-[0.3rem] bg-[#fafafa] mt-[5px] ${
                  canUpdate ? "opacity-100 cursor-pointer " : "opacity-40"
                } text-[.8rem]`}
          value="Update"
          type="submit"
          onChange={(e) => {}}
        />
      </form>
    </div>
  );
};
const UpdateDataBase = ({ heading }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
        {heading}
      </h1>
      <div className="flex flex-col gap-[2rem]">
        <UpdateDataBaseForm />
      </div>
    </div>
  );
};

export default UpdateDataBase;
