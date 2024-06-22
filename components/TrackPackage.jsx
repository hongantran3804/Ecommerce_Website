"use client"
import React, { useEffect, useReducer, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Main from "./Main";

import Map from "./Map";
const TrackPackageBoard = () => {
  return (<div></div>);
};
const TrackPackage = () => {
  useEffect(() => {
    const mainview = document.getElementById("mainview");
    // eslint-disable-next-line react-hooks/exhaustive-deps, react/no-deprecated
    ReactDOM.render(
        <Map address="1600 Amphitheatre Parkway, Mountain View, CA" />,
      mainview
    );
    const mainViewHeading = document.getElementById("mainViewHeading");
    ReactDOM.render(
      <div>
        <h1 className='font-bold text-[1.5rem] font-["Trebuchet MS"] drop-shadow-becomeCustomerHeading my-[10px]'>
          Tracking Your Order
        </h1>
      </div>,
      mainViewHeading
    );
  }, []);

  return <Main />;
};

export default TrackPackage;
