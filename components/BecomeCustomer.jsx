"use client";
import React, { useEffect, useState,useRef } from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import { becomeCustomerInfo } from "@utils/utils";
import ReCAPTCHA from "react-google-recaptcha";
const SignUpForm = () => {
  const env = require("@env/env");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [compName, setCompName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [fail, setFail] = useState(true);
  const recaptchaRef = useRef(null);
  useEffect(() => {
    const phonePattern =
      /^(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    const isNotValid =
      name === "" ||
      email === "" ||
      compName === "" ||
      phoneNumber === "" ||
      passwordAgain === "" ||
      password === "" ||
      captchaValue === "" ||
      password.length < 4 ||
      password.length > 15 ||
      passwordAgain !== password ||
      !email.includes("@") ||
      !phonePattern.test(phoneNumber) ||
      digitsOnly.length < 10;
    if (isNotValid) {
      setFail(true);
    } else setFail(false);
  }, [
    name,
    email,
    compName,
    phoneNumber,
    password,
    passwordAgain,
    captchaValue,
  ]);
  const handleRecaptchaChange = (value) => {
    setCaptchaValue(() => value);
    recaptchaRef.current.execute();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/newUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          compName,
          phoneNumber,
          password,
          captcha: captchaValue,
        }),
      });
      const noti = await response.json();
      alert("Success");
    } catch (error) {
      alert("Something went wrong. Please try again later.");
    } finally {
      setName("");
      setEmail("");
      setCompName("");
      setPhoneNumber("");
      setPassword("");
      setPasswordAgain("");
      setCaptchaValue("");
      recaptchaRef.current.reset();
      setFail(true);
    }
  };
  const SetCollections = [
    setEmail,
    setName,
    setCompName,
    setPhoneNumber,
    setPassword,
    setPasswordAgain,
  ];
  const valueCollections = [
    email,
    name,
    compName,
    phoneNumber,
    password,
    passwordAgain,
  ];
  return (
    <div className="flex flex-row items-center w-full h-full py-[8vh]">
      <form
        class="relative flex flex-col z-0 items-start"
        id="signupForm"
        onSubmit={handleSubmit}
      >
        <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading'>
          Become a Customer
        </h1>
        <div className="flex flex-col gap-[0.5rem] items-start">
          {becomeCustomerInfo.map((eachInput, index) => (
            <div
              className="flex flex-row gap-[1rem] text-[1rem] items-center"
              key={eachInput.id}
            >
              <label
                htmlFor={eachInput.id}
                className="w-[7rem] h-auto text-Purple font-bold text-[0.8rem] font-['Trebuchet MS']"
                dir="rtl"
              >
                {eachInput.label}
              </label>

              <input
                className="bg-mediumPurple text-white focus:border-black border-black 
                  rounded-[5px] focus:text-white px-[0.3rem] text-[0.9rem]"
                id={eachInput.id}
                value={valueCollections[index]}
                type={eachInput.type}
                name={eachInput.name}
                size={eachInput.size}
                title={eachInput.title}
                onChange={(e) => {
                  const value = e.target.value;
                  valueCollections[index] = value;
                  SetCollections[index](() => value);
                }}
              />
              {eachInput.name === "password" && (
                <div className="text-[0.8rem]">(4 characters or longer)</div>
              )}
            </div>
          ))}
          <div className="flex flex-row gap-[1vh] items-start">
            <label htmlFor="captcha" className="w-[7rem]"></label>
            <div id="captcha">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={env["NEXT_PUBLIC_RECAPTCHA_KEY"]}
                onChange={(value) => {
                  handleRecaptchaChange(value);
                }}
              />
            </div>
          </div>
          <div className="flex flex-row gap-[1vh] items-start">
            <label htmlFor="submitBtn" className="w-[7rem]"></label>
            <button
              type="submit"
              id="submitBtn"
              disabled={fail}
              className={`border-[1px] ${
                fail
                  ? "border-gray-300 text-gray-300"
                  : "border-black text-black"
              }  font-bold text-[0.8rem] bg-[#fafafa] px-[0.8rem] py-[0.4rem] rounded-[5px]`}
            >
              Submit
            </button>
          </div>
          <div></div>
        </div>
      </form>
    </div>
  );
};

const BecomeCustomer = () => {
  

  useEffect(() => {
    const mainview = document.getElementById("mainview");
    // eslint-disable-next-line react-hooks/exhaustive-deps, react/no-deprecated
    ReactDOM.render(
      <React.StrictMode>
        <SignUpForm />
      </React.StrictMode>,
      mainview
    );
  }, []);

  return <Main />;
};

export default BecomeCustomer;
