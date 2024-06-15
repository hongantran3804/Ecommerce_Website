"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import { signIn } from "next-auth/react";
const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
      email, 
      password,
      redirect: true,
      callbackUrl: "/"
    })
    } catch (error) {
      alert("Something went wrong with the server")
    }
    
  };
  return (
    <section>
      <div>
        <div className="flex flex-row w-[85%] h-auto  items-center pt-[1rem] gap-[0.5rem]">
          <fieldset
            className="flex flex-row border-[1px] border-black  relative px-[1rem] pt-[1.5rem] rounded-[5px] h-[10rem] w-[60%]"
          >
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

              <div className="flex flex-row items-center gap-[0.4rem] ml-[5rem]">
                <input type="checkbox" />
                <div className="italic">Stay Connected</div>
              </div>
              <input
                type="submit"
                id="loginBtn"
                value="Connect"
                className="ml-[5rem] border-[1px] border-black w-fit bg-gray-300 px-[0.2rem] cursor-pointer"
                onClick={handleLogin}
              />
              <div className="ml-[5rem]">
                <Link
                  href="/pwChange"
                  className="text-Purple font-bold underline hover:text-red-700"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </fieldset>
          <fieldset className="flex flex-col border-[1px] border-black relative px-[1rem] pt-[1.5rem] rounded-[5px] text-[.9rem] h-[12rem] items-start gap-[2rem]">
            <div>
              If you don&apos;t have an account for lacacoshop please click
              &quot;Create&quot; to request one
            </div>
            <Link
              href="/signup"
              className=" border-[1px] border-black w-fit bg-gray-300 px-[0.2rem]"
            >
              Create
            </Link>
          </fieldset>
        </div>
      </div>
    </section>
  );
};
const Login = () => {
   useEffect(() => {
     const mainview = document.getElementById("mainview");
     // eslint-disable-next-line react-hooks/exhaustive-deps, react/no-deprecated
     ReactDOM.render(
         <LoginForm />,
       mainview
     );
   }, []);

   return <Main />;
};

export default Login;
