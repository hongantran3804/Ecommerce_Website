"use client";
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import trashCan from "@public/assets/icons/trashCan.png"
import Image from "next/image";
const SearchBar = () => {
  const [inputs, setInputs] = useState([{ query: "" }]);
  const addQueries = (e) => {
    e.preventDefault();
    setInputs(() => {
      return [...inputs, { query: "" }];
    });
  };
  const removeQueries = (e, index) => {
    e.preventDefault();
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };
  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "Tab") {
          addQueries(e);
        }
      }}
    >
      <header className="mt-[1rem]">
        <span className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading leading-0  text-end'>
          Search for Products
          <span className='ml-[5px] font-["Trebuchet MS"] text-[0.9rem] leading-0 italic text-black font-normal'>
            Press TAB to add more products to your search
          </span>
        </span>
      </header>
      {inputs.map((input, index) => {
        return (
          <div key={index} className={`flex flex-row items-start  ${index === 0 ? "gap-[1rem]" : "mt-[0.5rem] gap-[2.5rem]"}`}>
            <div
              className="flex flex-col items-center gap-[1rem]"
              id="inputContainer"
            >
              <input
                className="bg-mediumPurple text-white focus:border-black border-black 
                  rounded-[5px] focus:text-white px-[0.3rem] text-[0.9rem]"
                type="text"
                size="30"
                value={input.query}
                onChange={(e) => {
                  if (e.key === "Tab") addInput(e);
                  else {
                    setInputs(() => {
                      const newInputs = [...inputs];
                      newInputs[index].query = e.target.value;
                      return newInputs;
                    });
                  }
                }}
              />
            </div>
            {index === 0 ? (
              <div
                className={`text-mediumPurple text-[.9rem] font-bold border-[1px] w-fit rounded-[5px] px-[0.7rem] py-[0.3rem] bg-[#fafafa] 
  `}
              >
                Search
              </div>
            ) : (
              // eslint-disable-next-line jsx-a11y/alt-text
              <div className="flex justify-center border-2 cursor-pointer" onClick={(e, index) => {removeQueries(e,index)}}><Image src={trashCan} className="w-[1.5rem]"/></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
const SearchProduct = () => {
  useEffect(() => {
    const mainview = document.getElementById("mainview");
    // eslint-disable-next-line react-hooks/exhaustive-deps, react/no-deprecated
    ReactDOM.render(
      <React.StrictMode>
        <SearchBar />
      </React.StrictMode>,
      mainview
    );
  }, []);
  return <Main />;
};

export default SearchProduct;
