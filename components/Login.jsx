"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signIn} from "next-auth/react";
import Image from "next/image";
import googleIcon from "@public/assets/icons/googleIcon.png";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fail, setFail] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: `${process.env.NEXT_PUBLIC_URL}`,
      });
    } catch (error) {
    }
  };
  return (
    <section>
      <div>
        <div className="flex flex-row w-[85%] h-auto  items-center pt-[1rem] gap-[0.5rem] rounded-[5px]">
          <fieldset className="flex flex-row border-[1px] border-black  relative px-[1rem] pt-[1.5rem] rounded-[5px] h-[10rem] w-[60%]">
            <legend className='absolute top-[-15px] bg-white left-[10px] text-[1.2rem] font-["Arial"]'>
              Login Please
            </legend>
            <div className="flex flex-col text-[.9rem] gap-[0.2rem]">
              <div className="flex flex-row items-center gap-[1rem]">
                <label
                  htmlFor="email"
                  className="font-bold  w-[4rem] "
                  dir="rtl"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  size="40"
                  className="border-gray-300 border-[1px] rounded-[5px] h-[1.4rem] w-[20rem] pl-1"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-row items-center gap-[1rem]">
                <label
                  htmlFor="password"
                  className="font-bold w-[4rem] "
                  dir="rtl"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  size="15"
                  className="border-gray-300 border-[1px] rounded-[5px] h-[1.4rem] pl-1"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              {fail && (
                <div className="text-red-700">
                  Please check your email or password
                </div>
              )}
              <input
                type="submit"
                id="loginBtn"
                value="Connect"
                className="ml-[5rem] border-[1px] border-black w-fit bg-gray-100 active:bg-gray-300  px-[0.2rem] cursor-pointer mt-3"
                onClick={handleLogin}
              />
              <Link
                href="/pwChange"
                className="text-Purple font-bold underline hover:text-red-700"
              >
                <div className="ml-[5rem]">Forgot Password?</div>
              </Link>
            </div>
          </fieldset>
          <fieldset className="flex flex-col border-[1px] border-black relative px-[1rem] pt-[1.5rem] rounded-[5px] text-[.9rem] h-[12rem] items-start gap-[2rem]">
            <div>
              If you don&apos;t have an account for lacacoshop please click
              &quot;Create&quot; to request one or use Google sign in
            </div>
            <div className="flex flex-row items-center gap-2">
              <Link
                href="/signup"
                className=" border-[1px] border-black w-fit bg-gray-100 active:bg-gray-300  px-[0.2rem] p-1 rounded-[5px]"
              >
                Create
              </Link>
              <span>or</span>
              <div
                className="border-[1px] border-black flex flex-row items-center p-1 gap-1  bg-gray-100 active:bg-gray-300 cursor-pointer rounded-[5px]"
                onClick={() => {
                  signIn("google", {
                    callbackUrl: `${process.env.NEXT_PUBLIC_URL}/`,
                  });
                }}
              >
                <Image src={googleIcon} className="w-[1.5rem]" alt="" />
                <span>Sign In</span>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </section>
  );
};
const Login = () => {

  return <LoginForm/>;
};

export default Login;
