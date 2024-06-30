"use client"
import React, { useState, useEffect } from "react";

const ReqInfoForm = ({ list, UPC, prodDesc }) => {
  const [inputs, setInputs] = useState(
    Array.from({ length: list.length }, () => ({ value: "" }))
  );
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (UPC || prodDesc) {
      setInputs(() => {
        const newInputs = [...inputs];
        newInputs[newInputs.length - 1].value = prodDesc;
        newInputs[newInputs.length - 2].value = UPC;
        return newInputs;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UPC, prodDesc]);
  const [canSend, setCanSend] = useState(false);
  useEffect(() => {
     const phonePattern =
      /^(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;
    const digitsOnly = inputs[2].value.replace(/\D/g, "");
    if (inputs[0].value !== "" && inputs[1].value.includes("@") && inputs[1].value.includes(".com") && phonePattern.test(inputs[2].value) && digitsOnly.length >= 10) {
      setCanSend(true);
    }
  }, [inputs, message, UPC, prodDesc])
  const handleUserQuestion = async (e) => {
    e.preventDefault();
    if (!canSend) return
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/sendQuestion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: inputs[0].value,
            email: inputs[1].value,
            phoneNumber: inputs[2].value,
            UPC: UPC,
            prodDesc: prodDesc,
            message: message,
          }),
        }
      );
      if (response.ok) {
        setSuccess(true);
      }
    } catch (error) {
    } 
    setInputs(() => Array.from({ length: list.length }, () => ({ value: "" })));
    setMessage("");
    setCanSend(false);
  }
  return (
    <div className="">
      <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading mt-[10px]'>
        Request Information
      </h1>
      <form className="flex flex-col gap-[5px] text-white" onSubmit={handleUserQuestion}>
        {list.map(
          (eachInput, index) =>
            (
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
            )
        )}
        <div className="flex flex-row gap-[1rem] text-[1rem] items-start text-white mt-[5px]">
          <label
            htmlFor="msg"
            className="w-[8rem] h-auto text-Purple font-bold text-[0.8rem] font-['Trebuchet MS']"
            dir="rtl"
          >
            Message
          </label>

          <textarea
            className={`bg-mediumPurple  focus:border-black border-black 
                  rounded-[5px]  px-[0.3rem] text-[0.9rem] `}
            id="msg"
            value={message}
            name="msg"
            cols="100"
            rows="8"
            title="Required"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </div>
        {success && <div className="text-green-500">Success</div>}
        <input
          className={`text-mediumPurple text-[.7rem] font-bold ml-[9rem] border-[1px] w-fit 
                rounded-[5px] px-[0.7rem] py-[0.3rem] bg-[#fafafa] mt-[5px] ${
                  canSend ? "opacity-100 cursor-pointer " : "opacity-40"
                } text-[.8rem]`}
          value="Send Question"
          type="submit"
        />
      </form>
    </div>
  );
};

export default ReqInfoForm;
