/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-deprecated */
"use client";
import Main from "./Main";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import ReactDOM from "react-dom";
import Image from "next/image";
import { dbInfo } from "@utils/utils";
import { useSession } from "next-auth/react";
const UpdateDataBaseForm = () => {
  const updateDataBase = async (e) => {
    e.preventDefault();
    const [brand, prodDesc, upc, unitPrice, unitPerCase, numInStock] = inputs
    try {
      const response = await fetch("http://localhost:3000/api/admin/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brand: brand.value,
          prodDesc: prodDesc.value,
          upc: upc.value,
          unitPrice: unitPrice.value,
          unitPerCase: unitPerCase.value,
          numInStock: numInStock.value,
        })
      });
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          // setInputs(() =>
          //   Array.from({ length: dbInfo.length }, () => ({ value: "" }))
          // );
          // setCanUpdate(false);
          // setSuccess(false);
          location.reload();
        }, 1000);
      }
    } catch (error) {
      alert("Something went wrong")
    }
  }
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
    <div>
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
  useEffect(() => {
    const mainview = document.getElementById("mainview");
    // eslint-disable-next-line react-hooks/exhaustive-deps, react/no-deprecated
    ReactDOM.render(
        <div>
          <div className="flex flex-col gap-[2rem]">
            <UpdateDataBaseForm />
          </div>
        </div>
      ,
      mainview
    );
    const mainViewHeading = document.getElementById("mainViewHeading");
    ReactDOM.render(
        <div>
          <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
            {heading}
          </h1>
        </div>,
      mainViewHeading
    );
  }, []);
  return <Main />;
};

export default UpdateDataBase;
