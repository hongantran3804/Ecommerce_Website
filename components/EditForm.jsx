"use client";
import {  useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
const PasswordForm = ({session}) => {
  const [inputPwds, setInputPwds] = useState([]);
  useEffect(() => {
    setInputPwds(
    [
        { label: "Current password", value: "", id: "currPwd" },
        { label: "New password", value: "", id: "newPwd" },
        { label: "Reenter new password", value: "", id: "newPwd2" },
      ]
    );
  }, [])
  
  const [fail, setFail] = useState(false);
  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPwd: inputPwds[0].value,
          newPwd: inputPwds[1].value,
          newPwd2: inputPwds[2].value,
          userId: session?.user?.id,
          fieldChange: "password",
        }),
      });
      if (response.ok) {
        window.location.href = "/account/profile";
      } else {
        setFail(true)
      }
    } catch (error) {}
  };
  return (
    <form
      className="border-[1px] border-gray-300 rounded-[10px] flex flex-col items-start p-5 gap-2"
      onSubmit={saveChanges}
    >
        {inputPwds && inputPwds?.map((input, index) => (
          <div key={input?.id} className="flex flex-col w-fit">
            <label htmlFor={input?.id}>{input?.label}</label>
            <input
              id={input?.id}
              type="password"
              size="20"
              value={input?.value}
              className="border-[1px] border-black pl-2 text-[.9rem]"
              onChange={(e) => {
                setInputPwds(() => {
                  const newInputValue = [...inputPwds];
                  newInputValue[index].value = e.target.value;
                  return newInputValue;
                });
              }}
            />
          </div>
        ))}
      {fail && <div className="text-red-700">Something went wrong</div>}
      <input
        type="submit"
        value="Save changes"
        className="border-[1px] rounded-[5px] py-1 px-2 bg-LightPurple text-white cursor-pointer active:bg-Purple hover:bg-mediumPurple"
      />
    </form>
  );
};
const GeneralForm = ({ inputValue, setInputValue, session }) => {
  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newValue: inputValue.oldValue,
          userId: session?.user?.id,
          fieldChange: inputValue.name,
        }),
      });
      if (response.ok) {
        window.location.href = "/account/profile";
      }
    } catch (error) {}
  };
  return (
    <form
      className="border-[1px] border-gray-300 rounded-[10px] flex flex-col items-start p-5 gap-2"
      onSubmit={saveChanges}
    >
      <label htmlFor={inputValue?.id}>New {inputValue?.name}</label>
      <input
        id={inputValue?.id}
        type={inputValue?.type}
        size={inputValue?.size}
        value={inputValue?.oldValue}
        className="border-[1px] border-black pl-2 text-[.9rem]"
        onChange={(e) => {
          setInputValue(() => {
            const newInputValue = { ...inputValue };
            newInputValue.oldValue = e.target.value;
            return newInputValue;
          });
        }}
      />
      <input
        type="submit"
        value="Save changes"
        className="border-[1px] rounded-[5px] py-1 px-2 bg-LightPurple text-white cursor-pointer active:bg-Purple hover:bg-mediumPurple"
      />
    </form>
  );
};
const EditForm = () => {
  const { data: session } = useSession();
  const [inputValue, setInputValue] = useState(null);
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setInputValue(() =>
      JSON.parse(decodeURIComponent(searchParams.get("data")))
    );
  }, [session?.user]);

  return (
    <div>
      <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
        Change {inputValue?.label}
      </h1>
      {inputValue?.label !== "Password" ? (
        <GeneralForm inputValue={inputValue} setInputValue={setInputValue} session={session} />
      ) : (
        <PasswordForm session={session}/>
      )}
    </div>
  );
};

export default EditForm;
