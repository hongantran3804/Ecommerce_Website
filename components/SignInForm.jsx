"use client";
import React, { useEffect, useState } from "react";

const SignInForm = () => {
  const [inputs, setInputs] = useState([]);
  useEffect(() => {
    setInputs([
      { label: "Email", value: "", id: "email", type: "email" },
      { label: "Password", value: "", id: "newPwd", type: "password" },
    ]);
  }, []);

  const [fail, setFail] = useState(false);
  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/checkUser?email=${inputs[0].value}&password=${inputs[1].value}`, {
      });
      if (response.ok) {
        window.location.href = "/account/profile";
      } else {
        setFail(true);
      }
      if (response.ok) {
        window.location.href = "/account/profile"
      }
    } catch (error) {}
  };
  return (
    <div>
      <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
        Sign In
      </h1>
      <form
        className="border-[1px] border-gray-300 rounded-[10px] flex flex-col items-start p-5 gap-2"
        onSubmit={saveChanges}
      >
        {inputs &&
          inputs?.map((input, index) => (
            <div key={input?.id} className="flex flex-col w-fit">
              <label htmlFor={input?.id}>{input?.label}</label>
              <input
                id={input?.id}
                type={input?.type}
                size="40"
                value={input?.value}
                className="border-[1px] border-black pl-2 text-[.9rem]"
                onChange={(e) => {
                  setInputs(() => {
                    const newInputValue = [...inputs];
                    newInputValue[index].value = e.target.value;
                    return newInputValue;
                  });
                }}
              />
            </div>
          ))}
        {fail && <div className="text-red-700">Please check your email or password</div>}
        <input
          type="submit"
          value="Sign In"
          className="border-[1px] rounded-[5px] py-1 px-2 bg-LightPurple text-white cursor-pointer active:bg-Purple hover:bg-mediumPurple"
        />
      </form>
    </div>
  );
};

export default SignInForm;
