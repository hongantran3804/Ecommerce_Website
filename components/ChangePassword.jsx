"use client";
import React, { useEffect, useState } from "react";
import previousPage from "@public/assets/icons/previousPage.png";
import Image from "next/image";
import Link from "next/link";
const UpdatePassword = ({ token }) => {
  const [validToken, setValidToken] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const updatePaspassword = async (e) => {
    if (password.length < 4 || password.length > 15 || password !== password2) {
      return;
    }
    e.preventDefault();
    try {
      const response = await fetch(`/api/resetPassword`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });
      if (response.ok) {
        document.location.href = "/login";
      } else {
        document.location.href = "/pwChange";
      }
    } catch (error) {}
  };
  useEffect(() => {
    const checkToken = async () => {
      const response = await fetch(`/api/resetPassword/${token}`, {
        method: "POST",
      });
      if (response.ok) {
        setValidToken(true);
      }
    };
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    validToken && (
      <div className="flex flex-col  gap-[5px]">
        <div className="flex flex-row gap-[1rem] text-[1rem] items-center">
          <label
            htmlFor="password"
            className="w-[7rem] h-auto text-Purple font-bold text-[0.8rem] font-['Trebuchet MS']"
            dir="rtl"
          >
            Password
          </label>
          <input
            className="bg-mediumPurple text-white focus:border-black border-black 
                  rounded-[5px] focus:text-white px-[0.3rem] text-[0.9rem]"
            id="password"
            type="password"
            size="15"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row gap-[1rem] text-[1rem] items-center">
          <label
            htmlFor="password"
            className="w-[7rem] h-auto text-Purple font-bold text-[0.8rem] font-['Trebuchet MS']"
            dir="rtl"
          >
            Password (again)
          </label>
          <input
            className="bg-mediumPurple text-white focus:border-black border-black 
                  rounded-[5px] focus:text-white px-[0.3rem] text-[0.9rem]"
            id="password"
            type="password"
            size="15"
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
          />
        </div>
        <div
          className={`text-mediumPurple text-[.9rem] font-bold ml-[8rem] border-[1px] w-fit rounded-[5px] px-[0.7rem] py-[0.3rem] mt-[5px] bg-[#fafafa] ${
            password.length < 4 ||
            password.length > 15 ||
            password !== password2
              ? "opacity-30"
              : "cursor-pointer opacity-100"
          }`}
          onClick={updatePaspassword}
        >
          Update
        </div>
      </div>
    )
  );
};
const SendRequest = () => {
  const [email, setEmail] = useState("");
  const requestNewPassword = async (e) => {
    if (!email.includes("@") || !email.includes(".com")) return;
    e.preventDefault();
    try {
      const response = await fetch(`/api/resetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        alert("Something went wrong")
      }
      setEmail("");
    } catch (error) {
      alert("Something went wrong");
    }
  };
  return (
    <div className="flex flex-col gap-[5px]">
      <div className="flex flex-row gap-[1rem] text-[1rem] items-center">
        <label
          htmlFor="email"
          className="w-[7rem] h-auto text-Purple font-bold text-[0.8rem] font-['Trebuchet MS']"
          dir="rtl"
        >
          Email Address
        </label>
        <input
          className="bg-mediumPurple text-white focus:border-black border-black 
                  rounded-[5px] focus:text-white px-[0.3rem] text-[0.9rem]"
          id="email"
          type="email"
          size="60"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div
        className={`text-mediumPurple text-[.9rem] font-bold ml-[8rem] border-[1px] w-fit 
                rounded-[5px] px-[0.7rem] py-[0.3rem] bg-[#fafafa] ${
                  !email.includes("@") || !email.includes(".com")
                    ? "opacity-30"
                    : "cursor-pointer opacity-100"
                }`}
        onClick={requestNewPassword}
      >
        Send Request
      </div>
    </div>
  );
};

const ChangePassword = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token"));
  });

  return (
    <section>
      <div className="w-full flex flex-col items-center">
        <div>
          <div className="flex flex-row items-center gap-2">
            <div
              className="border-2 w-fit rounded-full bg-gray-300 p-2 cursor-pointer"
              onClick={() => {
                window.history.back();
              }}
            >
              <Image src={previousPage} width={20} height={20} />
            </div>
            <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading'>
              Change Password
            </h1>
          </div>

          {token ? <UpdatePassword token={token} /> : <SendRequest />}
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
